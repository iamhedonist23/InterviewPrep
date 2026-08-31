"use client";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

// -----------------------------------------------------------------------
// Shared field controls
// -----------------------------------------------------------------------
export function TextField({
  label,
  value,
  onChange,
  placeholder,
  maxLength = 200,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block text-sm font-semibold text-ink/70">
      {label}
      <input
        className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm"
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  maxLength = 2000,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  rows?: number;
}) {
  return (
    <label className="block text-sm font-semibold text-ink/70">
      {label}
      <textarea
        className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm"
        value={value}
        rows={rows}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string; // "YYYY-MM-DD" or ""
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-semibold text-ink/70">
      {label}
      <input
        type="date"
        className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-semibold text-ink/70">
      {label}
      <select
        className="mt-2 w-full rounded-xl border border-ink/15 px-4 py-3 text-sm capitalize"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option} className="capitalize">
            {option.toLowerCase().replace("_", " ")}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-ink/70">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4" />
      {label}
    </label>
  );
}

// Editable list of short bullet strings (used for "achievements" arrays).
export function BulletListField({
  label,
  values,
  onChange,
  maxItems = 15,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  maxItems?: number;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink/70">{label}</p>
      <div className="mt-2 space-y-2">
        {values.map((bullet, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="w-full rounded-xl border border-ink/15 px-4 py-2 text-sm"
              value={bullet}
              maxLength={500}
              onChange={(event) => {
                const next = [...values];
                next[index] = event.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(values.filter((_, i) => i !== index))}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/40 hover:bg-mint hover:text-ink"
              aria-label="Remove bullet"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
      {values.length < maxItems && (
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-coral"
        >
          <Plus size={14} /> Add bullet point
        </button>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------
// Section shell: a titled card containing a list of repeatable entries,
// each individually removable/reorderable, plus an "Add" button.
// -----------------------------------------------------------------------
export function RepeatableSection<T>({
  title,
  description,
  items,
  onChange,
  makeBlank,
  renderItem,
  itemLabel,
  maxItems,
}: {
  title: string;
  description?: string;
  items: T[];
  onChange: (items: T[]) => void;
  makeBlank: () => T;
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  itemLabel: (item: T, index: number) => string;
  maxItems: number;
}) {
  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold">{title}</h2>
          {description && <p className="mt-1 text-sm text-ink/50">{description}</p>}
        </div>
        {items.length < maxItems && (
          <button
            type="button"
            onClick={() => onChange([...items, makeBlank()])}
            className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-4 py-2 text-sm font-bold hover:border-coral hover:text-coral"
          >
            <Plus size={15} /> Add
          </button>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {items.length === 0 && <p className="rounded-xl border border-dashed border-ink/15 p-6 text-center text-sm text-ink/50">Nothing added yet.</p>}
        {items.map((item, index) => (
          <div key={index} className="rounded-2xl border border-ink/10 bg-white/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-ink/70">{itemLabel(item, index) || `Entry ${index + 1}`}</p>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => move(index, -1)} disabled={index === 0} className="grid h-8 w-8 place-items-center rounded-full text-ink/40 hover:bg-mint hover:text-ink disabled:opacity-30" aria-label="Move up">
                  <ChevronUp size={15} />
                </button>
                <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} className="grid h-8 w-8 place-items-center rounded-full text-ink/40 hover:bg-mint hover:text-ink disabled:opacity-30" aria-label="Move down">
                  <ChevronDown size={15} />
                </button>
                <button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))} className="grid h-8 w-8 place-items-center rounded-full text-ink/40 hover:bg-mint hover:text-coral" aria-label="Remove entry">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {renderItem(item, (patch) => {
                const next = [...items];
                next[index] = { ...next[index], ...patch };
                onChange(next);
              }, index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
