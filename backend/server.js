const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "data", "spots.json");

app.use(cors());
app.use(express.json());

// ---- Helpers to read/write the JSON "database" ----
function readSpots() {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeSpots(spots) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(spots, null, 2));
}

// ---- Routes ----

// GET /api/spots  -> list all spots (drivers searching)
app.get("/api/spots", (req, res) => {
  const spots = readSpots();
  res.json(spots);
});

// GET /api/spots/:id -> single spot detail
app.get("/api/spots/:id", (req, res) => {
  const spots = readSpots();
  const spot = spots.find((s) => s.id === req.params.id);
  if (!spot) return res.status(404).json({ error: "Spot not found" });
  res.json(spot);
});

// POST /api/spots -> homeowner lists a new spot
app.post("/api/spots", (req, res) => {
  const { ownerName, title, address, lat, lng, pricePerHour, type } = req.body;

  if (!ownerName || !title || !address || lat === undefined || lng === undefined || !pricePerHour) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const spots = readSpots();
  const newSpot = {
    id: Date.now().toString(),
    ownerName,
    title,
    address,
    lat: Number(lat),
    lng: Number(lng),
    pricePerHour: Number(pricePerHour),
    type: type || "Open",
    available: true,
  };

  spots.push(newSpot);
  writeSpots(spots);
  res.status(201).json(newSpot);
});

// POST /api/spots/:id/book -> driver books a spot
app.post("/api/spots/:id/book", (req, res) => {
  const spots = readSpots();
  const spot = spots.find((s) => s.id === req.params.id);

  if (!spot) return res.status(404).json({ error: "Spot not found" });
  if (!spot.available) return res.status(409).json({ error: "Spot already booked" });

  spot.available = false;
  writeSpots(spots);
  res.json({ message: "Booking confirmed", spot });
});

app.listen(PORT, () => {
  console.log(`SpotLink backend running on http://localhost:${PORT}`);
});
