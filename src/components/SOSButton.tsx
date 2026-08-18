"use client";

interface SOSButtonProps {
  onPress: () => void;
  isOnline: boolean;
}

export function SOSButton({ onPress, isOnline }: SOSButtonProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Pulse rings */}
      <div className="relative flex items-center justify-center">
        <span className="absolute w-32 h-32 rounded-full bg-[#E63946] opacity-20 animate-ping" aria-hidden="true" />
        <span className="absolute w-24 h-24 rounded-full bg-[#E63946] opacity-30 animate-ping [animation-delay:0.3s]" aria-hidden="true" />
        <button
          onClick={onPress}
          aria-label="Send SOS emergency signal"
          className="relative z-10 w-20 h-20 rounded-full bg-[#E63946] text-white font-black text-2xl shadow-2xl shadow-red-400 hover:bg-red-700 active:scale-95 transition-transform duration-100 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          SOS
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Tap to send SOS to emergency contacts &amp; services
      </p>
      {!isOnline && (
        <p className="text-xs text-[#F4A261] text-center font-medium">
          ⚠️ Offline — SOS will be queued for Bluetooth relay
        </p>
      )}
    </div>
  );
}
