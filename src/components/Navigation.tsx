"use client";

import { Tab } from "@/hooks/useTab";

interface NavigationProps {
  currentTab: Tab;
  onSwitch: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: string; sublabel: string }[] = [
  { id: "alerts", label: "Alerts", sublabel: "Before", icon: "🔔" },
  { id: "sos", label: "SOS", sublabel: "During", icon: "🆘" },
  { id: "offline", label: "Offline", sublabel: "Network", icon: "📶" },
  { id: "recovery", label: "Recovery", sublabel: "After", icon: "🤝" },
];

export function Navigation({ currentTab, onSwitch }: NavigationProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Main navigation"
    >
      <div className="flex h-14">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSwitch(tab.id)}
              aria-label={`${tab.label} tab — ${tab.sublabel}`}
              aria-pressed={isActive}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[44px] transition-colors duration-150 ${
                isActive
                  ? "bg-[#1D1D1D] text-white"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span className="text-[10px] font-semibold leading-none tracking-wide">
                {tab.label}
              </span>
              <span className="text-[9px] leading-none opacity-60">
                {tab.sublabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
