"use client";
import { useState, useEffect } from "react";

export type BLEStatus = "Searching" | "Connected" | "Offline";

export interface BLEPeer {
  id: string;
  name: string;
  distance: string;
  signal: "Good" | "Fair" | "Weak";
}

const MOCK_PEERS: BLEPeer[] = [
  { id: "phone_001", name: "Unknown Device", distance: "~30m", signal: "Good" },
  { id: "phone_002", name: "Unknown Device", distance: "~50m", signal: "Weak" },
  { id: "phone_003", name: "Unknown Device", distance: "~85m", signal: "Fair" },
];

export function useBLEPeers() {
  const [status, setStatus] = useState<BLEStatus>("Searching");
  const [peers, setPeers] = useState<BLEPeer[]>([]);
  const [beaconActive, setBeaconActive] = useState(false);

  useEffect(() => {
    // Simulate BLE discovery after 2 seconds
    const timer = setTimeout(() => {
      setStatus("Connected");
      setPeers(MOCK_PEERS.slice(0, 2));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleBeacon = () => setBeaconActive((prev) => !prev);

  return { status, peers, beaconActive, toggleBeacon };
}
