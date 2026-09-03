"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Option = { value: string; label: string };
type Props = {
  label: string;
  name?: string;
  options: Option[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export function MultiSelectDropdown({
  label,
  name,
  options,
  value,
  defaultValue = [],
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = value ?? internalValue;
  const selectedLabels = options
    .filter((option) => selected.includes(option.value))
    .map((option) => option.label);
  const selectedSummary =
    selectedLabels.length > 2
      ? `${selectedLabels.slice(0, 2).join(", ")} + ${selectedLabels.length - 2} more`
      : selectedLabels.join(", ");

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  function toggle(optionValue: string) {
    const nextValue = selected.includes(optionValue)
      ? selected.filter((item) => item !== optionValue)
      : [...selected, optionValue];
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  }

  return (
    <div className="relative text-sm" ref={containerRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className="mt-2 flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-ink/15 bg-paper px-3 text-left font-normal hover:border-coral"
      >
        <span className="min-w-0 truncate">
          {selectedSummary || `Any ${label.toLowerCase()}`}
        </span>
        <ChevronDown size={17} className="shrink-0 text-ink/50" />
      </button>
      {name &&
        selected.map((item) => (
          <input type="hidden" name={name} value={item} key={item} />
        ))}
      {open && (
        <div
          role="listbox"
          aria-label={label}
          aria-multiselectable="true"
          className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-ink/15 bg-white p-2 shadow-lg"
        >
          {options.map((option) => {
            const checked = selected.includes(option.value);
            return (
              <button
                type="button"
                role="option"
                aria-selected={checked}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-mint/60"
                key={option.value}
                onClick={() => toggle(option.value)}
              >
                {option.label}
                {checked && <Check size={16} className="text-coral" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
