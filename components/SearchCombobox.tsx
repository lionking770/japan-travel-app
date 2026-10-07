"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { matchesSearch } from "@/lib/prefectures";

export type ComboboxOption = {
  id: string;
  title: string;
  subtitle?: string;
  keywords?: string[];
};

type SearchComboboxProps = {
  value: string | null;
  options: ComboboxOption[];
  placeholder: string;
  disabled?: boolean;
  emptyText?: string;
  onSelect: (id: string) => void;
};

export default function SearchCombobox({
  value,
  options,
  placeholder,
  disabled = false,
  emptyText = "일치하는 항목이 없습니다",
  onSelect,
}: SearchComboboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = options.find((option) => option.id === value) ?? null;

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open, value]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const filtered = useMemo(() => {
    return options.filter((option) =>
      matchesSearch(
        [option.title, option.subtitle ?? "", ...(option.keywords ?? [])],
        query,
      ),
    );
  }, [options, query]);

  const displayValue = open ? query : (selected?.title ?? "");

  return (
    <div ref={rootRef} className="relative">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      <input
        value={displayValue}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          if (!disabled) setOpen(true);
        }}
        autoComplete="off"
        className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm outline-none focus:border-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
      />
      {open && !disabled && (
        <ul className="absolute z-20 mt-2 max-h-56 w-full overflow-y-auto rounded-2xl border border-zinc-200 bg-white py-1 shadow-lg">
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-sm text-zinc-400">{emptyText}</li>
          ) : (
            filtered.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(option.id);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-zinc-50 ${
                    option.id === value ? "bg-zinc-50" : ""
                  }`}
                >
                  <span className="block text-sm text-zinc-900">{option.title}</span>
                  {option.subtitle ? (
                    <span className="mt-0.5 block text-xs text-zinc-400">{option.subtitle}</span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
