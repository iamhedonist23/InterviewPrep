#!/usr/bin/env python3
"""
Replace detailedAnswer values in a TypeScript file.

SOURCE_FILE = file from which question + detailedAnswer are taken.
TARGET_FILE = file in which matching detailedAnswer values are replaced.
OUTPUT_FILE = new target file.

Put all files in the same folder as this script, change the 3 names below,
then run:

    python replace_detailed_answers.py
"""

SOURCE_FILE = "QA_QandA.ts"
TARGET_FILE = "QA.ts"
OUTPUT_FILE = "QA_updated.ts"

from pathlib import Path
import re
import sys


def read_string(text, start):
    """Read a JS/TS quoted string and return (decoded_text, end_position)."""
    quote = text[start]
    if quote not in ('"', "'", '`'):
        raise ValueError(f"Expected string at position {start}")

    i = start + 1
    out = []

    while i < len(text):
        c = text[i]

        if c == "\\":
            if i + 1 >= len(text):
                raise ValueError("Unterminated escape")

            n = text[i + 1]

            simple = {
                "n": "\n",
                "r": "\r",
                "t": "\t",
                "b": "\b",
                "f": "\f",
                "v": "\v",
                "0": "\0",
                "\\": "\\",
                '"': '"',
                "'": "'",
                "`": "`",
            }

            if n in simple:
                out.append(simple[n])
                i += 2
                continue

            if n == "u" and i + 5 < len(text):
                value = text[i + 2:i + 6]
                try:
                    out.append(chr(int(value, 16)))
                    i += 6
                    continue
                except ValueError:
                    pass

            if n == "x" and i + 3 < len(text):
                value = text[i + 2:i + 4]
                try:
                    out.append(chr(int(value, 16)))
                    i += 4
                    continue
                except ValueError:
                    pass

            # Preserve unknown escaped characters without the escape slash.
            out.append(n)
            i += 2
            continue

        if c == quote:
            return "".join(out), i + 1

        out.append(c)
        i += 1

    raise ValueError("Unterminated string literal")


def encode_string(value, quote):
    """Encode text using the same quote type used by the target property."""
    out = []

    for c in value:
        if c == "\\":
            out.append("\\\\")
        elif c == "\n":
            out.append("\\n")
        elif c == "\r":
            out.append("\\r")
        elif c == "\t":
            out.append("\\t")
        elif c == quote:
            out.append("\\" + quote)
        else:
            out.append(c)

    result = quote + "".join(out) + quote

    if quote == "`":
        result = result.replace("${", "\\${")

    return result


def normalize_question(value):
    """Exact question matching, ignoring case and whitespace differences."""
    value = value.replace("\u00a0", " ")
    value = re.sub(r"\s+", " ", value)
    return value.strip().casefold()


def skip_string_or_comment(text, i):
    """Return the position after a string/comment, otherwise None."""
    if text[i] in ('"', "'", '`'):
        _, end = read_string(text, i)
        return end

    if text.startswith("//", i):
        end = text.find("\n", i + 2)
        return len(text) if end == -1 else end + 1

    if text.startswith("/*", i):
        end = text.find("*/", i + 2)
        return len(text) if end == -1 else end + 2

    return None


PROPERTY_RE = re.compile(
    r'(?<![\w$])(?:"(?P<quoted_name>question|detailedAnswer)"|'
    r'(?P<plain_name>question|detailedAnswer))\s*:\s*',
    re.MULTILINE,
)


def find_properties(text, object_start, object_end):
    """
    Find direct properties named question and detailedAnswer.

    Handles both:
        question: "..."
    and:
        "question": "..."
    """
    props = {}
    i = object_start + 1
    depth = 1

    while i < object_end - 1:
        c = text[i]

        if c == "{":
            depth += 1
            i += 1
            continue

        if c == "}":
            depth -= 1
            i += 1
            continue

        # IMPORTANT: check the property before treating a quoted property
        # name such as "question" as a normal string.
        if depth == 1:
            match = PROPERTY_RE.match(text, i)

            if match:
                name = (
                    match.group("quoted_name")
                    or match.group("plain_name")
                )

                value_start = match.end()

                while (
                    value_start < object_end
                    and text[value_start].isspace()
                ):
                    value_start += 1

                if (
                    value_start < object_end
                    and text[value_start] in ('"', "'", '`')
                ):
                    value, value_end = read_string(
                        text,
                        value_start,
                    )

                    props[name] = (
                        value,
                        value_start,
                        value_end,
                    )

                    i = value_end
                    continue

        # Only skip strings/comments after checking for a property.
        skipped = skip_string_or_comment(text, i)
        if skipped is not None:
            i = skipped
            continue

        i += 1

    return props


def find_objects(text):
    """Find every object containing question + detailedAnswer."""
    stack = []
    objects = []
    i = 0

    while i < len(text):
        skipped = skip_string_or_comment(text, i)

        if skipped is not None:
            i = skipped
            continue

        c = text[i]

        if c == "{":
            stack.append(i)

        elif c == "}" and stack:
            object_start = stack.pop()
            object_end = i + 1

            props = find_properties(
                text,
                object_start,
                object_end,
            )

            if (
                "question" in props
                and "detailedAnswer" in props
            ):
                objects.append(props)

        i += 1

    return objects


def load_source(source_path):
    text = source_path.read_text(encoding="utf-8")
    objects = find_objects(text)

    answers = {}

    for props in objects:
        question = props["question"][0]
        detailed_answer = props["detailedAnswer"][0]

        key = normalize_question(question)

        if key in answers:
            raise ValueError(
                "Duplicate question in source file:\n"
                + question
            )

        answers[key] = detailed_answer

    return answers, len(objects)


def process(source_path, target_path, output_path):
    source_answers, source_count = load_source(source_path)

    target_text = target_path.read_text(encoding="utf-8")
    target_objects = find_objects(target_text)

    replacements = []
    matched = []
    unmatched = []

    for props in target_objects:
        question = props["question"][0]
        key = normalize_question(question)

        if key not in source_answers:
            unmatched.append(question)
            continue

        _, answer_start, answer_end = props["detailedAnswer"]

        old_answer = target_text[
            answer_start:answer_end
        ]

        quote = old_answer[0]

        new_answer = encode_string(
            source_answers[key],
            quote,
        )

        replacements.append(
            (
                answer_start,
                answer_end,
                new_answer,
            )
        )

        matched.append(question)

    # Replace from the bottom of the file upwards so positions remain valid.
    updated_text = target_text

    for start, end, replacement in reversed(replacements):
        updated_text = (
            updated_text[:start]
            + replacement
            + updated_text[end:]
        )

    output_path.write_text(
        updated_text,
        encoding="utf-8",
    )

    return {
        "source_count": source_count,
        "target_count": len(target_objects),
        "matched": matched,
        "unmatched": unmatched,
        "output": output_path,
    }


def main():
    folder = Path(__file__).resolve().parent

    source_path = folder / SOURCE_FILE
    target_path = folder / TARGET_FILE
    output_path = folder / OUTPUT_FILE

    print("=" * 70)
    print("DETAILED ANSWER REPLACER")
    print("=" * 70)
    print(f"Source : {source_path}")
    print(f"Target : {target_path}")
    print(f"Output : {output_path}")
    print()

    if not source_path.exists():
        print("ERROR: Source file not found:")
        print(source_path)
        sys.exit(1)

    if not target_path.exists():
        print("ERROR: Target file not found:")
        print(target_path)
        sys.exit(1)

    if output_path.resolve() in {
        source_path.resolve(),
        target_path.resolve(),
    }:
        print("ERROR: OUTPUT_FILE must be different from source and target.")
        sys.exit(1)

    try:
        result = process(
            source_path,
            target_path,
            output_path,
        )
    except Exception as exc:
        print()
        print("ERROR:")
        print(exc)
        sys.exit(1)

    print("=" * 70)
    print("RESULT")
    print("=" * 70)
    print(f"Source objects : {result['source_count']}")
    print(f"Target objects : {result['target_count']}")
    print(f"Matched        : {len(result['matched'])}")
    print(f"Unmatched      : {len(result['unmatched'])}")
    print()
    print(f"Created: {result['output']}")

    if result["matched"]:
        print()
        print("Matched questions:")
        for question in result["matched"]:
            print(f"  ✓ {question}")

    if result["unmatched"]:
        print()
        print("Unmatched target questions:")
        for number, question in enumerate(
            result["unmatched"],
            1,
        ):
            print(f"  {number}. {question}")

    print()
    print("Done.")


if __name__ == "__main__":
    main()
