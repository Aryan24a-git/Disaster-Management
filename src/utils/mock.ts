export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomSignal(): "Good" | "Fair" | "Weak" {
  const signals: ("Good" | "Fair" | "Weak")[] = ["Good", "Fair", "Weak"];
  return signals[Math.floor(Math.random() * signals.length)];
}

export function randomBLEDistance(): string {
  const dist = randomBetween(15, 120);
  return `~${dist}m`;
}
