"use client";

import { formatTimestamp, formatDistanceKm } from "@/utils/format";

type AlertLevel = "Critical" | "High" | "Medium" | "Low";

interface Alert {
  id: number;
  source: string;
  type: string;
  magnitude?: number | null;
  timestamp: string;
  level: AlertLevel;
  distance_km: number;
  region?: string;
}

interface AlertCardProps {
  alert: Alert;
  onViewMap: () => void;
}

const levelConfig: Record<AlertLevel, { bg: string; text: string; border: string; badge: string }> = {
  Critical: { bg: "bg-red-50", text: "text-red-900", border: "border-red-300", badge: "bg-[#E63946] text-white" },
  High: { bg: "bg-orange-50", text: "text-orange-900", border: "border-orange-300", badge: "bg-[#F4A261] text-white" },
  Medium: { bg: "bg-yellow-50", text: "text-yellow-900", border: "border-yellow-300", badge: "bg-yellow-400 text-yellow-900" },
  Low: { bg: "bg-blue-50", text: "text-blue-900", border: "border-blue-300", badge: "bg-[#457B9D] text-white" },
};

const typeIcon: Record<string, string> = {
  Earthquake: "🌍",
  "Flood Warning": "🌊",
  "Cyclone Alert": "🌀",
  Fire: "🔥",
};

export function AlertCard({ alert, onViewMap }: AlertCardProps) {
  const cfg = levelConfig[alert.level];
  const icon = typeIcon[alert.type] ?? "⚠️";

  return (
    <div
      className={`${cfg.bg} border ${cfg.border} rounded-xl p-4 shadow-sm`}
      role="article"
      aria-label={`${alert.level} ${alert.type} alert`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">{icon}</span>
          <div>
            <h3 className={`font-bold text-base leading-tight ${cfg.text}`}>
              {alert.type}
            </h3>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              {alert.source} · {formatTimestamp(alert.timestamp)}
            </p>
          </div>
        </div>
        <span className={`${cfg.badge} text-xs font-bold px-2 py-0.5 rounded-full shrink-0`}>
          {alert.level}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div>
          {alert.magnitude != null && (
            <p className={`text-sm font-semibold ${cfg.text}`}>
              Magnitude {alert.magnitude}
            </p>
          )}
          {alert.region && (
            <p className="text-sm text-gray-600">{alert.region}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            📍 {formatDistanceKm(alert.distance_km)} from you
          </p>
        </div>
        <button
          onClick={onViewMap}
          aria-label={`View ${alert.type} on map`}
          className="bg-[#1D1D1D] text-white text-xs font-semibold px-3 py-2 rounded-lg min-h-[36px] hover:bg-gray-800 active:scale-95 transition-all shrink-0"
        >
          View Map
        </button>
      </div>
    </div>
  );
}
