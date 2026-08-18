"use client";

type Status = "ONLINE" | "OFFLINE" | "Searching" | "Connected" | "Broadcasting";

const statusConfig: Record<Status, { dot: string; bg: string; text: string }> = {
  ONLINE: { dot: "bg-[#06A77D]", bg: "bg-green-50", text: "text-green-800" },
  OFFLINE: { dot: "bg-[#E63946]", bg: "bg-red-50", text: "text-red-800" },
  Searching: { dot: "bg-yellow-400 animate-pulse", bg: "bg-yellow-50", text: "text-yellow-800" },
  Connected: { dot: "bg-[#06A77D]", bg: "bg-green-50", text: "text-green-800" },
  Broadcasting: { dot: "bg-[#457B9D] animate-pulse", bg: "bg-blue-50", text: "text-blue-800" },
};

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  return (
    <span
      role="status"
      aria-label={`Status: ${label ?? status}`}
      className={`inline-flex items-center gap-1.5 ${cfg.bg} ${cfg.text} text-xs font-bold px-3 py-1.5 rounded-full`}
    >
      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} aria-hidden="true" />
      {label ?? status}
    </span>
  );
}
