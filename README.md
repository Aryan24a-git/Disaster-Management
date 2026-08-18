# ResQGrid

**Disaster Management Platform — Frontend Prototype**

A mobile-first web app for before/during/after disaster scenarios. Built as a hackathon prototype with mock data and no backend required.

---

## Features

| Tab | Phase | Key Features |
|-----|-------|-------------|
| 🔔 **Alerts** | Before | Live alert cards (Earthquake, Flood, Cyclone), severity levels, expandable risk zone map |
| 🆘 **SOS** | During | Large pulsing SOS button, emergency contacts, nearby shelters, GPS coordinates, Dial 112 |
| 📶 **Offline** | Network Down | Bluetooth status, beacon toggle, message queue, peer discovery, connectivity log |
| 🤝 **Recovery** | After | "I'm Safe" toggle, missing person search & reports, NGO/govt recovery resources |

---

## Setup & Run

### Prerequisites
- Node.js 18 or newer

### Install

```bash
cd resqgrid
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**For best experience:** Use Chrome DevTools → Toggle device toolbar → iPhone 12 Pro (390×844)

### Build for production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
# Follow prompts — no environment variables needed
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Redirect to alerts
│   ├── ClientLayout.tsx    # Tab state manager + Navigation
│   ├── globals.css         # Tailwind + custom animations
│   └── (tabs)/
│       ├── alerts/page.tsx     # Alert Bulletin
│       ├── sos/page.tsx        # Emergency SOS
│       ├── offline/page.tsx    # Offline Mode
│       └── recovery/page.tsx   # Recovery & Assistance
├── components/
│   ├── Navigation.tsx      # Bottom 4-tab bar
│   ├── AlertCard.tsx       # Severity-coded alert card
│   ├── SOSButton.tsx       # Pulsing SOS button
│   ├── ContactCard.tsx     # Emergency contact with quick-dial
│   ├── StatusBadge.tsx     # Online/Offline/Searching badge
│   ├── MapPreview.tsx      # Simple POI map (no external library)
│   ├── MissingPersonCard.tsx  # Missing person entry
│   └── Toast.tsx           # Auto-dismiss notification
├── hooks/
│   ├── useTab.ts           # Tab state + localStorage
│   ├── useLocation.ts      # Mock GPS location
│   ├── useOnlineStatus.ts  # Online/offline toggle
│   └── useBLEPeers.ts      # Simulated Bluetooth peers
├── data/
│   ├── mockAlerts.json     # 3 USGS/IMD-format alerts
│   ├── mockContacts.json   # Emergency contacts
│   ├── mockShelters.json   # Nearby shelter POIs
│   ├── mockMissing.json    # Missing person reports
│   └── mockResources.json  # NGO/government resources
└── utils/
    ├── format.ts           # formatTime, formatDistance, formatCoords
    └── mock.ts             # Random mock data generators
```

---

## Design System

```
Emergency Red:  #E63946  — SOS button, critical alerts
Safe Green:     #06A77D  — I'm Safe toggle, confirmed status
Neutral Dark:   #1D1D1D  — Background, header, active tab
Neutral Light:  #F5F5F5  — Page background, cards
Accent Blue:    #457B9D  — Secondary actions, links
Warning Orange: #F4A261  — Caution alerts, queued status
```

Font: Inter (Google Fonts) | Base unit: 8px | Min touch target: 44px

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **React 19**
- No backend, no database — all mock data in `src/data/`

---

## Demo Walkthrough (3 min)

1. **Alerts tab** → Show earthquake + flood alert cards, expand map
2. **SOS tab** → Show pulsing SOS button, dial contacts, toggle online/offline
3. **Offline tab** → Toggle beacon, watch peer discovery, check message queue
4. **Recovery tab** → Toggle "I'm Safe", search missing persons, use resources

---

## Prototype Scope

This is a **frontend-only prototype**. No real APIs, GPS, or Bluetooth.

Post-MVP roadmap:
- Connect IMD/USGS real-time alert APIs
- Supabase backend for SOS reports and missing persons
- Web Bluetooth API for real BLE peer discovery
- FCM push notifications
- ML alert deduplication

---

**Built by Team Noir | Hackathon Submission | August 2026**
