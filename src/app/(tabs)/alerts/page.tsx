"use client";

import { useState } from "react";
import { AlertCard } from "@/components/AlertCard";
import { MapPreview } from "@/components/MapPreview";
import { Toast } from "@/components/Toast";
import alertsData from "@/data/mockAlerts.json";
import sheltersData from "@/data/mockShelters.json";
import { formatTime } from "@/utils/format";

export default function AlertsPage() {
  const [mapVisible, setMapVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const now = formatTime();

  const showToast = (msg: string) => {
    setToast(msg);
  };

  return (
    <main className="flex flex-col min-h-full">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="bg-[#1D1D1D] text-white px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Alert Bulletin</h1>
          <p className="text-xs text-gray-400 font-mono mt-0.5">Updated {now}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-[#E63946] text-white text-xs font-bold px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
          LIVE
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">
        {/* Alert count */}
        <p className="text-sm text-gray-500 font-medium">
          {alertsData.alerts.length} active alerts in your region
        </p>

        {/* Alert cards */}
        <section aria-label="Active alerts" className="space-y-3">
          {alertsData.alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={{
                ...alert,
                magnitude: alert.magnitude ?? undefined,
                region: alert.region ?? undefined,
                level: alert.level as "Critical" | "High" | "Medium" | "Low",
              }}
              onViewMap={() => {
                setMapVisible(true);
                showToast(`Showing ${alert.type} on map`);
              }}
            />
          ))}
        </section>

        {/* Map preview toggle */}
        <section aria-label="Risk zone map">
          <button
            onClick={() => setMapVisible((v) => !v)}
            aria-expanded={mapVisible}
            aria-controls="risk-map"
            className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            <span>🗺️ Risk Zone Map</span>
            <span className="text-gray-400">{mapVisible ? "▲ Collapse" : "▼ Expand"}</span>
          </button>

          <div id="risk-map" className={`mt-2 transition-all ${mapVisible ? "block" : "hidden"}`}>
            <MapPreview
              shelters={sheltersData.shelters}
              userLat={alertsData.user_location.lat}
              userLon={alertsData.user_location.lon}
              isVisible={mapVisible}
            />
          </div>
        </section>

        {/* Info banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
          <p className="text-xs text-orange-800 font-medium">
            ⚠️ Stay informed. Follow official NDMA guidelines. Keep emergency contacts ready.
          </p>
        </div>
      </div>
    </main>
  );
}
