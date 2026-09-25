import React, { useEffect, useState } from "react";
import { getSpots, bookSpot } from "../api.js";
import MapView from "./MapView.jsx";

export default function SearchPage() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  async function loadSpots() {
    try {
      setLoading(true);
      const data = await getSpots();
      setSpots(data);
      setError(null);
    } catch (err) {
      setError("Could not reach the server. Is the backend running on port 5000?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSpots();
  }, []);

  async function handleBook(id) {
    try {
      await bookSpot(id);
      await loadSpots();
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p className="status-text">Loading parking spots…</p>;
  if (error) return <p className="status-text error">{error}</p>;

  return (
    <div className="search-layout">
      <section className="spot-list">
        <h2>Parking spots near you</h2>
        {spots.length === 0 && <p className="status-text">No spots listed yet.</p>}
        {spots.map((spot) => (
          <div
            key={spot.id}
            className={`spot-card ${selectedId === spot.id ? "selected" : ""}`}
            onClick={() => setSelectedId(spot.id)}
          >
            <div className="spot-card-top">
              <h3>{spot.title}</h3>
              <span className={`badge ${spot.available ? "available" : "booked"}`}>
                {spot.available ? "Available" : "Booked"}
              </span>
            </div>
            <p className="spot-address">{spot.address}</p>
            <p className="spot-meta">
              ₹{spot.pricePerHour}/hr · {spot.type} · Hosted by {spot.ownerName}
            </p>
            <button
              className="book-btn"
              disabled={!spot.available}
              onClick={(e) => {
                e.stopPropagation();
                handleBook(spot.id);
              }}
            >
              {spot.available ? "Book this spot" : "Not available"}
            </button>
          </div>
        ))}
      </section>

      <section className="map-panel">
        <MapView spots={spots} selectedId={selectedId} onSelect={setSelectedId} />
      </section>
    </div>
  );
}
