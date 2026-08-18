"use client";

interface Shelter {
  id: number;
  name: string;
  distance_m: number;
  capacity: number;
  type: string;
}

interface MapPreviewProps {
  shelters: Shelter[];
  userLat: number;
  userLon: number;
  isVisible: boolean;
}

const shelterIcon: Record<string, string> = {
  School: "🏫",
  Community: "🏢",
  Hospital: "🏥",
  Government: "🏛️",
};

export function MapPreview({ shelters, isVisible }: MapPreviewProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
      {/* Map placeholder with mock grid */}
      <div
        className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100"
        aria-label="Map preview showing nearby shelters"
        role="img"
      >
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full border-t border-gray-400"
              style={{ top: `${(i + 1) * 16.67}%` }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full border-l border-gray-400"
              style={{ left: `${(i + 1) * 16.67}%` }}
            />
          ))}
        </div>

        {/* Roads mock */}
        <div className="absolute left-0 right-0 top-1/2 h-1.5 bg-white opacity-50 transform -translate-y-1/2" />
        <div className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-white opacity-50 transform -translate-x-1/2" />

        {/* User location */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          aria-label="Your location"
        >
          <div className="w-4 h-4 rounded-full bg-[#457B9D] border-2 border-white shadow-lg" />
          <div className="absolute -inset-3 rounded-full bg-[#457B9D] opacity-20 animate-ping" />
        </div>

        {/* Shelter POIs */}
        {shelters.slice(0, 3).map((shelter, i) => {
          const positions = [
            { top: "30%", left: "65%" },
            { top: "65%", left: "35%" },
            { top: "20%", left: "25%" },
          ];
          const pos = positions[i] ?? { top: "40%", left: "60%" };
          return (
            <div
              key={shelter.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={pos}
              aria-label={`${shelter.name}, ${shelter.distance_m}m away`}
            >
              <div className="text-lg">{shelterIcon[shelter.type] ?? "📍"}</div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-white rounded-lg px-2 py-1 text-xs text-gray-600 shadow">
          📍 You &nbsp;|&nbsp; 🏫 Shelter
        </div>
      </div>

      {/* Shelter list below map */}
      <div className="p-3 space-y-2">
        {shelters.map((shelter) => (
          <div
            key={shelter.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span aria-hidden="true">{shelterIcon[shelter.type] ?? "📍"}</span>
              <div>
                <p className="text-xs font-semibold text-gray-800">{shelter.name}</p>
                <p className="text-xs text-gray-500">Capacity: {shelter.capacity}</p>
              </div>
            </div>
            <span className="text-xs font-mono text-[#457B9D] font-semibold">
              {shelter.distance_m < 1000
                ? `${shelter.distance_m}m`
                : `${(shelter.distance_m / 1000).toFixed(1)}km`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
