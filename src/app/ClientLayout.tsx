"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Tab } from "@/hooks/useTab";
import AlertsPage from "./(tabs)/alerts/page";
import SOSPage from "./(tabs)/sos/page";
import OfflinePage from "./(tabs)/offline/page";
import RecoveryPage from "./(tabs)/recovery/page";

export function ClientLayout({ children: _ }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState<Tab>("alerts");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("resqgrid_tab");
      if (saved && ["alerts", "sos", "offline", "recovery"].includes(saved)) {
        setCurrentTab(saved as Tab);
      }
    } catch {
      // ignore
    }
  }, []);

  const switchTab = (tab: Tab) => {
    setCurrentTab(tab);
    try {
      localStorage.setItem("resqgrid_tab", tab);
    } catch {
      // ignore
    }
  };

  const renderTab = () => {
    switch (currentTab) {
      case "alerts": return <AlertsPage />;
      case "sos": return <SOSPage />;
      case "offline": return <OfflinePage />;
      case "recovery": return <RecoveryPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto relative bg-[#F5F5F5] shadow-2xl">
      {/* Phone frame effect */}
      <div className="flex-1 overflow-hidden">
        {renderTab()}
      </div>
      <Navigation currentTab={currentTab} onSwitch={switchTab} />
    </div>
  );
}
