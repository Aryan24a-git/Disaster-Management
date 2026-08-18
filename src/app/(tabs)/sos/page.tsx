"use client";

import { useState } from "react";
import { SOSButton } from "@/components/SOSButton";
import { ContactCard } from "@/components/ContactCard";
import { StatusBadge } from "@/components/StatusBadge";
import { MapPreview } from "@/components/MapPreview";
import { Toast } from "@/components/Toast";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useLocation } from "@/hooks/useLocation";
import { formatCoords } from "@/utils/format";
import contactsData from "@/data/mockContacts.json";
import sheltersData from "@/data/mockShelters.json";

export default function SOSPage() {
  const { isOnline, toggleOnline } = useOnlineStatus();
  const location = useLocation();
  const [toast, setToast] = useState<string | null>(null);
  const [shelterMapVisible, setShelterMapVisible] = useState(false);

  const showToast = (msg: string) => setToast(msg);

  const handleSOS = () => {
    showToast(
      isOnline
        ? "🆘 SOS sent! Emergency services notified."
        : "🔵 SOS queued — will be relayed via Bluetooth."
    );
  };

  const handleDial = (contact: { name: string; phone_full: string }) => {
    showToast(`📞 Would dial: ${contact.phone_full} (${contact.name})`);
  };

  const handleShare = () => {
    showToast(`📍 Location shared: ${formatCoords(location.lat, location.lon)}`);
  };

  return (
    <main className="flex flex-col min-h-full">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="bg-[#1D1D1D] text-white px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Emergency SOS</h1>
        <div className="flex items-center gap-2">
          <StatusBadge status={isOnline ? "ONLINE" : "OFFLINE"} />
          <button
            onClick={toggleOnline}
            aria-label="Toggle online status for demo"
            className="text-xs text-gray-400 underline"
          >
            demo
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-20">

        {/* SOS Button */}
        <section aria-label="SOS trigger" className="flex justify-center py-2">
          <SOSButton onPress={handleSOS} isOnline={isOnline} />
        </section>

        {/* Action buttons */}
        <section aria-label="Emergency actions" className="grid grid-cols-3 gap-2">
          <button
            onClick={() => showToast("📞 Dialing 112...")}
            className="flex flex-col items-center gap-1 bg-[#E63946] text-white font-semibold text-xs py-3 rounded-xl min-h-[56px] hover:bg-red-700 active:scale-95 transition-all"
            aria-label="Dial emergency number 112"
          >
            <span className="text-lg">📞</span>
            Dial 112
          </button>
          <button
            onClick={handleSOS}
            className="flex flex-col items-center gap-1 bg-[#F4A261] text-white font-semibold text-xs py-3 rounded-xl min-h-[56px] hover:bg-orange-500 active:scale-95 transition-all"
            aria-label="Send SOS message"
          >
            <span className="text-lg">🆘</span>
            Send SOS
          </button>
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 bg-[#457B9D] text-white font-semibold text-xs py-3 rounded-xl min-h-[56px] hover:bg-blue-700 active:scale-95 transition-all"
            aria-label="Share your location"
          >
            <span className="text-lg">📍</span>
            Share Loc.
          </button>
        </section>

        {/* Emergency contacts */}
        <section aria-label="Emergency contacts">
          <h2 className="text-sm font-bold text-gray-700 mb-2">Quick Contacts</h2>
          <div className="space-y-2">
            {contactsData.contacts.slice(0, 3).map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onDial={handleDial}
              />
            ))}
          </div>
        </section>

        {/* Nearby shelters */}
        <section aria-label="Nearby shelters">
          <button
            onClick={() => setShelterMapVisible((v) => !v)}
            aria-expanded={shelterMapVisible}
            className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all mb-2"
          >
            <span>🏫 Nearby Shelters</span>
            <span className="text-gray-400">{shelterMapVisible ? "▲" : "▼"}</span>
          </button>
          {shelterMapVisible && (
            <MapPreview
              shelters={sheltersData.shelters}
              userLat={location.lat}
              userLon={location.lon}
              isVisible
            />
          )}
        </section>

        {/* GPS coordinates */}
        <div className="bg-gray-900 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400 font-mono mb-1">📡 GPS Location (mock)</p>
          <p className="text-sm text-white font-mono font-bold">
            {formatCoords(location.lat, location.lon)}
          </p>
          <p className="text-xs text-gray-500 font-mono">
            ±{location.accuracy_m}m accuracy
          </p>
        </div>
      </div>
    </main>
  );
}
