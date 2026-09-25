import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultCenter = [11.664, 78.146]; // Salem, TN — change to your city

// Custom colored markers so available/booked spots are visually distinct
function makeIcon(color) {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

const availableIcon = makeIcon("green");
const bookedIcon = makeIcon("red");

// Recenters the map whenever the selected spot changes
function RecenterOnSelect({ selectedSpot }) {
  const map = useMap();
  React.useEffect(() => {
    if (selectedSpot) {
      map.setView([selectedSpot.lat, selectedSpot.lng], 15);
    }
  }, [selectedSpot, map]);
  return null;
}

export default function MapView({ spots, selectedId, onSelect }) {
  const selectedSpot = spots.find((s) => s.id === selectedId);

  return (
    <MapContainer center={defaultCenter} zoom={14} style={{ width: "100%", height: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterOnSelect selectedSpot={selectedSpot} />
      {spots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.lat, spot.lng]}
          icon={spot.available ? availableIcon : bookedIcon}
          eventHandlers={{ click: () => onSelect(spot.id) }}
        >
          <Popup>
            <strong>{spot.title}</strong>
            <br />
            ₹{spot.pricePerHour}/hr · {spot.available ? "Available" : "Booked"}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
