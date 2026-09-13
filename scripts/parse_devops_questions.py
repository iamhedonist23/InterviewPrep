from pathlib import Path
import json
import re
import unicodedata

source = Path(r"d:\Movie\DevOps_Docker_Kubernetes_Interview_Questions_Answers_Properly_Arranged.txt")
output = Path(r"d:\Interview Website\prisma\devops-docker-kubernetes-current-questions.ts")

UNICODE_REPLACEMENTS = {
    "├": "|",
    "└": "|",
    "┬": "-",
    "┼": "+",
    "─": "-",
    "│": "|",
    "•": "*",
    "“": '"',
    "”": '"',
    "‘": "'",
    "’": "'",
    "–": "-",
    "—": "-",
}


def sanitize_text(value: str) -> str:
    cleaned = value
    for old, new in UNICODE_REPLACEMENTS.items():
        cleaned = cleaned.replace(old, new)

    cleaned = unicodedata.normalize("NFKD", cleaned)
    cleaned = cleaned.encode("ascii", "ignore").decode("ascii")
    return cleaned


text = source.read_text(encoding="utf-8")

# Split blocks by the large separator used in the source text
blocks = re.split(r"\n={2,}\n", text)

records = []

for block in blocks:
    block = block.strip()
    if not block:
        continue

    # Ignore non-question blocks
    if not re.search(r"\[REPORTED(?: TOPIC)?\]", block):
        continue

    # Question title
    title_match = re.search(r"\[REPORTED(?: TOPIC)?\]\s*(?:Q\d+(?:\s*&\s*Q\d+)?\s*:\s*)?(.+)", block, re.S)
    if not title_match:
        continue

    title = title_match.group(1).strip()
    title = re.sub(r"\s*\n.*", "", title)
    title = title.strip('"').strip()

    company_match = re.search(r"Company:\s*(.+?)\s*\|\s*Role:\s*(.+)", block, re.S)
    company = company_match.group(1).strip() if company_match else "N/A"
    role = company_match.group(2).strip() if company_match else "N/A"

    # Extract sections
    def extract_between(section_name: str, stop_names=None):
        if stop_names is None:
            stop_names = ["Interview Tip:", "What Interviewer Is Testing:", "Key Points:", "Follow-up Questions:", "Common Mistakes:"]
        pattern = rf"{re.escape(section_name)}\s*(.*?)(?={ '|'.join(re.escape(s) for s in stop_names) }|$)"
        m = re.search(pattern, block, re.S)
        return m.group(1).strip() if m else ""

    answer = extract_between("Answer:")
    interviewer_tip = extract_between("Interview Tip:", ["What Interviewer Is Testing:", "Key Points:", "Follow-up Questions:", "Common Mistakes:"])
    interviewer_testing = extract_between("What Interviewer Is Testing:", ["Key Points:", "Follow-up Questions:", "Common Mistakes:"])

    # key points / follow-up / mistakes lists
    def parse_list_section(name: str):
        section = extract_between(name)
        lines = []
        for line in section.splitlines():
            stripped = line.strip()
            if stripped.startswith("-"):
                lines.append(stripped[1:].strip())
        return lines

    key_points = parse_list_section("Key Points:")
    follow_up_questions = parse_list_section("Follow-up Questions:")
    common_mistakes = parse_list_section("Common Mistakes:")

    # Cleanup odd formatting in answer
    answer = answer.replace("\r", "")
    answer = re.sub(r"\n{3,}", "\n\n", answer)
    answer = answer.strip()

    # Build metadata
    category = "DevOps, Docker & Kubernetes"
    subcategory = "Current Interview Questions"
    short_description = title
    explanation = interviewer_testing or interviewer_tip or answer[:300]

    # Tags: add common topics found in the text
    tags = ["DevOps", "Docker", "Kubernetes", "Terraform", "Linux"]
    for token in re.findall(r"[A-Za-z][A-Za-z0-9+/\-]*", title):
        normalized = token.lower()
        if normalized in {"ci", "cd", "github", "actions", "terraform", "docker", "kubernetes", "helm", "ingress", "azure", "aws", "gcp", "git", "linux", "devops"}:
            mapped = token.title()
            if mapped not in tags:
                tags.append(mapped)

    # Slug generation
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")

    records.append(
        {
            "question": sanitize_text(title),
            "slug": sanitize_text(slug),
            "category": sanitize_text(category),
            "subcategory": sanitize_text(subcategory),
            "shortDescription": sanitize_text(short_description),
            "explanation": sanitize_text(explanation),
            "sampleAnswer": sanitize_text(answer),
            "keyPoints": [sanitize_text(item) for item in key_points],
            "commonMistakes": [sanitize_text(item) for item in common_mistakes],
            "followUpQuestions": [sanitize_text(item) for item in follow_up_questions],
            "tags": [sanitize_text(item) for item in tags],
            "experienceLevel": "MID_LEVEL",
            "difficulty": "MEDIUM",
            "interviewType": "TECHNICAL",
        }
    )

# Generate TS file
output.parent.mkdir(parents=True, exist_ok=True)

type_def = """
export type DevopsQuestionRecord = {
  question: string;
  slug: string;
  category: string;
  subcategory: string;
  shortDescription: string;
  explanation: string;
  sampleAnswer: string;
  keyPoints: string[];
  commonMistakes: string[];
  followUpQuestions: string[];
  tags: string[];
  experienceLevel: string;
  difficulty: string;
  interviewType: string;
};
""".strip()

json_array = json.dumps(records, ensure_ascii=False, indent=2)
content = f"{type_def}\n\nexport const currentDevopsQuestions: DevopsQuestionRecord[] = {json_array};\n"
output.write_text(content, encoding="utf-8")

print(f"Generated {len(records)} records in {output}")
