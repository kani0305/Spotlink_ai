# SpotLink — Smart Parking Marketplace

A full-stack app connecting drivers looking for parking with homeowners who
have space to rent out. Search available spots, view them on a Google Map,
and book instantly. Homeowners can list their own space in a few clicks.

## Tech stack
- **Frontend:** React (Vite) + Leaflet / OpenStreetMap (no API key or billing required)
- **Backend:** Node.js + Express (REST API)
- **Data storage:** JSON file (`backend/data/spots.json`) — simple and
  dependency-free for a fresher project; swap for a real database
  (MongoDB/PostgreSQL) later if you want to extend it.

## Project structure
```
spotlink-fullstack/
├── backend/
│   ├── server.js          # Express API
│   ├── data/spots.json    # "database"
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── api.js          # calls to the backend
    │   └── components/
    │       ├── SearchPage.jsx
    │       ├── ListSpotForm.jsx
    │       └── MapView.jsx
    └── package.json
```

## 1. Install dependencies

Open two terminals (one for backend, one for frontend).

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

## 2. Map setup — nothing needed

This project uses **Leaflet with OpenStreetMap tiles**, which requires no
API key, no billing account, and no sign-up. It just works once
`npm install` has run in the `frontend` folder.

## 3. Run both servers

**Terminal 1 — backend:**
```bash
cd backend
npm start
```
You should see: `SpotLink backend running on http://localhost:5000`

**Terminal 2 — frontend:**
```bash
cd frontend
npm run dev
```
Open the URL it prints (usually `http://localhost:3000`).

## 4. What you should see
- A list of 3 seeded parking spots on the left, and a Google Map with pins
  (green = available, red = booked) on the right.
- Clicking **"Book this spot"** marks it unavailable (writes to the JSON file
  via the backend) and turns its pin red.
- Switching to **"List your space"** lets you add a new spot with your own
  lat/lng, price, and type — it appears instantly in the search list and map.

## How it works (for interview explanation)
1. **Frontend (React)** calls the backend using `fetch()` in `api.js` —
   `GET /api/spots` to list, `POST /api/spots` to add a new one,
   `POST /api/spots/:id/book` to book one.
2. **Backend (Express)** reads/writes `data/spots.json` as a simple
   file-based database — no separate DB server needed for a fresher project.
3. **Leaflet** renders a pin for every spot's lat/lng using the
   `react-leaflet` library over free OpenStreetMap map tiles, and clicking
   a pin or a list card highlights the other (shared `selectedId` state
   in `App.jsx`).

## Pushing this to GitHub
```bash
git init
git add .
git commit -m "Rebuild SpotLink as full-stack React + Node.js + Google Maps app"
git branch -M main
git remote add origin https://github.com/kani0305/Spotlink_ai.git
git push -u origin main --force
```
⚠️ `--force` will overwrite the old Streamlit version in this repo. If you'd
rather keep both, create a **new** GitHub repo instead and skip `--force`.
