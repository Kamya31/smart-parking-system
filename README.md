# SmartPark — Smart Parking Management System

## Structure
```
smartpark/
├── index.html            # Page shell — loads Tailwind, fonts, styles, and the app script
├── css/
│   └── style.css         # Theme tokens, animations, base styles
├── js/
│   ├── tailwind-config.js  # Tailwind theme extension (brand colors, font)
│   └── app.js             # Everything else: icons, data model, simulation
│                           #  engine, UI rendering, and event handling
└── README.md
```

No build step and no npm install — it's plain HTML/CSS/JS. Tailwind is loaded
from its CDN play-build, and Plus Jakarta Sans from Google Fonts; both need
an internet connection the first time. Everything else (the entire app logic
and UI) runs locally with no other dependencies, and data persists in the
browser via localStorage.

## Run it
Open `index.html` in any modern browser (Chrome, Edge, Safari, Firefox).
Because it uses `fetch`-free relative script/style paths, you can also just
double-click the file — no local server required.

## Demo tips
- Sign in as the demo driver or as Administrator from the login screen.
- The demo driver's slot (A4) expires in ~9 minutes of real time, so you can
  watch Active → Expiring Soon → Grace Period → Overstayed → Penalty happen
  live. Speed this up from Admin → System Settings → Simulation controls
  (1×/5×/15×/60× demo clock).
- Slot B3 already has a reservation conflict queued up, so the
  overstay → compensation flow fires shortly after you sign in.
- Try the offline toggle in the header to see Offline Safety Mode, and
  Emergency Parking → Trigger override as Administrator.
- Reset demo data any time from the Profile or Settings page.
