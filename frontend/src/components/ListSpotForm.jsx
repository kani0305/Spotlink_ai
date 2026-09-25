import React, { useState } from "react";
import { addSpot } from "../api.js";

const initialForm = {
  ownerName: "",
  title: "",
  address: "",
  lat: "",
  lng: "",
  pricePerHour: "",
  type: "Open",
};

export default function ListSpotForm({ onListed }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await addSpot(form);
      setForm(initialForm);
      onListed();
    } catch (err) {
      setError("Could not list your spot. Check all fields and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-panel">
      <h2>List your parking space</h2>
      <p className="form-hint">
        Tip: right-click a location on Google Maps to copy its exact latitude/longitude.
      </p>
      <form onSubmit={handleSubmit} className="spot-form">
        <label>
          Your name
          <input name="ownerName" value={form.ownerName} onChange={handleChange} required />
        </label>
        <label>
          Listing title
          <input
            name="title"
            placeholder="e.g. Covered driveway near bus stand"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address
          <input name="address" value={form.address} onChange={handleChange} required />
        </label>
        <div className="form-row">
          <label>
            Latitude
            <input name="lat" type="number" step="any" value={form.lat} onChange={handleChange} required />
          </label>
          <label>
            Longitude
            <input name="lng" type="number" step="any" value={form.lng} onChange={handleChange} required />
          </label>
        </div>
        <div className="form-row">
          <label>
            Price per hour (₹)
            <input
              name="pricePerHour"
              type="number"
              value={form.pricePerHour}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Type
            <select name="type" value={form.type} onChange={handleChange}>
              <option>Open</option>
              <option>Covered</option>
              <option>Gated</option>
            </select>
          </label>
        </div>
        {error && <p className="status-text error">{error}</p>}
        <button className="submit-btn" type="submit" disabled={submitting}>
          {submitting ? "Listing…" : "List my spot"}
        </button>
      </form>
    </div>
  );
}
