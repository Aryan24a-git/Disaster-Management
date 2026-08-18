"use client";
import { useState } from "react";

export interface MockLocation {
  lat: number;
  lon: number;
  accuracy_m: number;
}

const DEFAULT_LOCATION: MockLocation = {
  lat: 28.6139,
  lon: 77.209,
  accuracy_m: 50,
};

export function useLocation() {
  const [location] = useState<MockLocation>(DEFAULT_LOCATION);
  return location;
}
