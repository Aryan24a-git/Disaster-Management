"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { Toast } from "@/components/Toast";
import { useBLEPeers } from "@/hooks/useBLEPeers";

const CONNECTIVITY_LOG = [
  { time: "2:15 PM", event: "Switched to Offline Mode" },
  { time: "2:10 PM", event: "Network connection lost" },
  { time: "1:58 PM", event: "BLE scan started" },
  { time: "1:55 PM", event: "SOS message queued" },
  { time: "1:45 PM", event: "Last sync with server" },
];

const QUEUED_MESSAGES = [
  { type: "SOS", destination: "Emergency Contacts", status: "Pending" },
  { type: "Location", destination: "Relay Network", status: "Pending" },
];

const signalColor: Record<string, string> = {
  Good: "text-green-600",
  Fair: "text-yellow-600",
  Weak: "text-red-500",
};

export default function OfflinePage() {
  const { status, peers, beaconActive, toggleBeacon } = useBLEPeers();
  const [toast, setToast] = useState<string | null>(null);

  // Map BLEStatus to StatusBadge-compatible status
  const badgeStatus = (beaconActive
    ? "Broadcasting"
    : status === "Offline"
    ? "OFFLINE"
    : status) as "Searching" | "Connected" | "OFFLINE" | "Broadcasting";

  return (
    <main className="flex flex-col min-h-full">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="bg-[#1D1D1D] text-white px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Offline Mode</h1>
        <StatusBadge status={badgeStatus} label={`BLE: ${status}`} />
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-20">

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <p className="text-xs text-blue-800 font-medium">
            📶 When network is down, nearby phones relay your SOS automatically.
          </p>
        </div>

        {/* BLE Status */}
        <section className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm" aria-label="Bluetooth status">
          <h2 className="text-sm font-bold text-gray-700 mb-3">Bluetooth Status</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">📶</span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{status}</p>
                <p className="text-xs text-gray-500">
                  {peers.length > 0
                    ? `${peers.length} device${peers.length > 1 ? "s" : ""} found`
                    : "Scanning..."}
                </p>
              </div>
            </div>
            <StatusBadge
              status={badgeStatus}
              label={beaconActive ? "Broadcasting" : status}
            />
          </div>
        </section>

        {/* Beacon toggle */}
        <section className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm" aria-label="Beacon control">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-800">Broadcast My Location</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {beaconActive ? "Your location is being broadcast to nearby devices" : "Enable to allow nearby devices to relay your SOS"}
              </p>
            </div>
            <button
              onClick={() => {
                toggleBeacon();
                setToast(beaconActive ? "Beacon off — location broadcast stopped" : "📡 Broadcasting location...");
              }}
              role="switch"
              aria-checked={beaconActive}
              aria-label="Toggle location broadcast beacon"
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#457B9D] shrink-0 ${beaconActive ? "bg-[#457B9D]" : "bg-gray-300"}`}
            >
              <span
                className={`inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ${beaconActive ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>
        </section>

        {/* Message queue */}
        <section className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm" aria-label="Message queue">
          <h2 className="text-sm font-bold text-gray-700 mb-3">
            Message Queue
            <span className="ml-2 bg-[#F4A261] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {QUEUED_MESSAGES.length}
            </span>
          </h2>
          <div className="space-y-2">
            {QUEUED_MESSAGES.map((msg, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true">{msg.type === "SOS" ? "🆘" : "📍"}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{msg.type}</p>
                    <p className="text-xs text-gray-500">→ {msg.destination}</p>
                  </div>
                </div>
                <span className="text-xs text-[#F4A261] font-semibold">{msg.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Peer discovery */}
        <section className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm" aria-label="Nearby devices">
          <h2 className="text-sm font-bold text-gray-700 mb-3">Nearby Devices Detected</h2>
          {peers.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">Scanning for nearby devices...</p>
          ) : (
            <div className="space-y-3">
              {peers.map((peer) => (
                <div key={peer.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm" aria-hidden="true">
                    📱
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-800">{peer.name}</p>
                    <p className="text-xs text-gray-500">{peer.distance}</p>
                  </div>
                  <span className={`text-xs font-bold ${signalColor[peer.signal] ?? "text-gray-500"}`}>
                    {peer.signal}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Connectivity log */}
        <section className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm" aria-label="Connectivity log">
          <h2 className="text-sm font-bold text-gray-700 mb-3">Connectivity Log</h2>
          <div className="space-y-2">
            {CONNECTIVITY_LOG.map((entry, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-400 shrink-0 w-16">{entry.time}</span>
                <span className="text-xs text-gray-700">{entry.event}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
