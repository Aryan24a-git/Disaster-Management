"use client";

interface MissingPerson {
  id: number;
  name: string;
  age: number;
  last_seen: string;
  last_seen_location: string;
  time_missing: string;
  description: string;
  avatar_initials: string;
  avatar_color: string;
}

interface MissingPersonCardProps {
  person: MissingPerson;
  onReportSighting: (person: MissingPerson) => void;
}

export function MissingPersonCard({ person, onReportSighting }: MissingPersonCardProps) {
  return (
    <div
      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
      role="article"
      aria-label={`Missing person: ${person.name}`}
    >
      <div className="flex gap-3">
        {/* Avatar */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ backgroundColor: person.avatar_color }}
          aria-hidden="true"
        >
          {person.avatar_initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-sm text-gray-900">{person.name}</h3>
              <p className="text-xs text-gray-500">Age {person.age}</p>
            </div>
            <span className="text-xs text-[#E63946] font-semibold shrink-0">
              {person.time_missing}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            📍 Last seen {person.last_seen} at {person.last_seen_location}
          </p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {person.description}
          </p>
        </div>
      </div>

      <button
        onClick={() => onReportSighting(person)}
        aria-label={`Report sighting of ${person.name}`}
        className="mt-3 w-full bg-[#457B9D] text-white text-sm font-semibold py-2 rounded-lg min-h-[44px] hover:bg-blue-700 active:scale-[0.98] transition-all"
      >
        Report Sighting
      </button>
    </div>
  );
}
