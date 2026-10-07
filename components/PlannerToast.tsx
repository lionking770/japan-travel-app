"use client";

import { useEffect } from "react";
import { usePlannerStore } from "@/stores/planner-store";

export default function PlannerToast() {
  const toast = usePlannerStore((state) => state.toast);
  const clearToast = usePlannerStore((state) => state.clearToast);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => clearToast(), 2500);
    return () => window.clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-24 z-[90] flex justify-center px-4">
      <p className="rounded-full bg-zinc-900/90 px-4 py-2 text-sm font-medium text-white shadow-lg">
        {toast}
      </p>
    </div>
  );
}
