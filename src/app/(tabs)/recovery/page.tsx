"use client";

import { useState } from "react";
import { MissingPersonCard } from "@/components/MissingPersonCard";
import { Toast } from "@/components/Toast";
import missingData from "@/data/mockMissing.json";
import resourcesData from "@/data/mockResources.json";

export default function RecoveryPage() {
  const [isSafe, setIsSafe] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const filteredMissing = missingData.missing.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.last_seen_location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReportSighting = (person: { name: string }) => {
    setToast(`✅ Sighting of ${person.name} reported to authorities`);
  };

  const handleToggleSafe = () => {
    const next = !isSafe;
    setIsSafe(next);
    setToast(
      next
        ? "✅ You're marked as Safe. Your contacts have been notified."
        : "Status updated — marked as unknown."
    );
  };

  return (
    <main className="flex flex-col min-h-full">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="bg-[#1D1D1D] text-white px-4 py-4">
        <h1 className="text-xl font-bold">Recovery &amp; Assistance</h1>
        <p className="text-xs text-gray-400 mt-0.5">Post-disaster coordination</p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 pb-20">

        {/* I'm Safe toggle */}
        <section
          className={`rounded-xl p-5 border-2 transition-colors duration-300 ${
            isSafe
              ? "bg-green-50 border-[#06A77D]"
              : "bg-gray-50 border-gray-200"
          }`}
          aria-label="Safety status"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-base font-bold ${isSafe ? "text-[#06A77D]" : "text-gray-800"}`}>
                {isSafe ? "✅ You're marked as Safe" : "Mark Yourself as Safe"}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {isSafe
                  ? "Your emergency contacts have been notified."
                  : "Let your family know you are okay."}
              </p>
            </div>
            <button
              onClick={handleToggleSafe}
              role="switch"
              aria-checked={isSafe}
              aria-label="Toggle safe status"
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06A77D] shrink-0 ${
                isSafe ? "bg-[#06A77D]" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block w-6 h-6 transform bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isSafe ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* Missing person search */}
        <section aria-label="Missing persons">
          <h2 className="text-sm font-bold text-gray-700 mb-2">Missing Person Reports</h2>
          <div className="relative mb-3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" aria-hidden="true">
              🔍
            </span>
            <input
              type="search"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search missing persons"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#457B9D] focus:border-transparent"
            />
          </div>

          <div className="space-y-3">
            {filteredMissing.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">No results found.</p>
            ) : (
              filteredMissing.map((person) => (
                <MissingPersonCard
                  key={person.id}
                  person={person}
                  onReportSighting={handleReportSighting}
                />
              ))
            )}
          </div>
        </section>

        {/* Recovery resources */}
        <section aria-label="Recovery resources">
          <h2 className="text-sm font-bold text-gray-700 mb-2">Recovery Resources</h2>
          <div className="space-y-2">
            {resourcesData.resources.map((res) => (
              <div
                key={res.id}
                className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm flex items-center gap-3"
              >
                <span className="text-xl shrink-0" aria-hidden="true">
                  {res.type === "NGO" ? "🤝" : "🏛️"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900">{res.name}</p>
                  <p className="text-xs text-gray-500">{res.description}</p>
                </div>
                <a
                  href={`tel:${res.phone}`}
                  aria-label={`Call ${res.name} at ${res.phone}`}
                  className="bg-[#06A77D] text-white text-xs font-semibold px-3 py-2 rounded-lg min-h-[36px] min-w-[44px] flex items-center hover:bg-green-700 active:scale-95 transition-all shrink-0"
                >
                  📞 {res.phone}
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
