"use client";

import { useEffect } from "react";
import { usePlannerStore } from "@/stores/planner-store";

export default function StoreHydration() {
  useEffect(() => {
    const finish = () => {
      usePlannerStore.getState().setHydrated(true);
    };

    if (usePlannerStore.persist.hasHydrated()) {
      finish();
      return;
    }

    const unsubscribe = usePlannerStore.persist.onFinishHydration(finish);
    void usePlannerStore.persist.rehydrate();
    return unsubscribe;
  }, []);

  return null;
}
