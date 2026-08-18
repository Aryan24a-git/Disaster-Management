"use client";
import { useState, useEffect } from "react";

export type Tab = "alerts" | "sos" | "offline" | "recovery";

const STORAGE_KEY = "resqgrid_tab";

export function useTab() {
  const [currentTab, setCurrentTab] = useState<Tab>("alerts");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ["alerts", "sos", "offline", "recovery"].includes(saved)) {
        setCurrentTab(saved as Tab);
      }
    } catch {
      // localStorage unavailable (SSR or restricted)
    }
  }, []);

  const switchTab = (tab: Tab) => {
    setCurrentTab(tab);
    try {
      localStorage.setItem(STORAGE_KEY, tab);
    } catch {
      // ignore
    }
  };

  return { currentTab, switchTab };
}
