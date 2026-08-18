"use client";

interface Contact {
  id: number;
  name: string;
  phone: string;
  phone_full: string;
}

interface ContactCardProps {
  contact: Contact;
  onDial: (contact: Contact) => void;
}

export function ContactCard({ contact, onDial }: ContactCardProps) {
  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full bg-[#457B9D] text-white flex items-center justify-center font-bold text-sm shrink-0"
        aria-hidden="true"
      >
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-900 truncate">
          {contact.name}
        </p>
        <p className="text-xs text-gray-500 font-mono">{contact.phone}</p>
      </div>

      {/* Dial button */}
      <button
        onClick={() => onDial(contact)}
        aria-label={`Dial ${contact.name}`}
        className="bg-[#06A77D] text-white text-xs font-semibold px-3 py-2 rounded-lg min-h-[36px] min-w-[44px] hover:bg-green-700 active:scale-95 transition-all shrink-0"
      >
        📞 Dial
      </button>
    </div>
  );
}
