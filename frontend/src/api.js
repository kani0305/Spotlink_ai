const BASE_URL = "http://localhost:5000/api";

export async function getSpots() {
  const res = await fetch(`${BASE_URL}/spots`);
  if (!res.ok) throw new Error("Failed to fetch spots");
  return res.json();
}

export async function addSpot(spot) {
  const res = await fetch(`${BASE_URL}/spots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  if (!res.ok) throw new Error("Failed to add spot");
  return res.json();
}

export async function bookSpot(id) {
  const res = await fetch(`${BASE_URL}/spots/${id}/book`, {
    method: "POST",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to book spot");
  }
  return res.json();
}
