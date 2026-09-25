import React, { useState } from "react";
import SearchPage from "./components/SearchPage.jsx";
import ListSpotForm from "./components/ListSpotForm.jsx";

export default function App() {
  const [tab, setTab] = useState("search");

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">P</span>
          <span className="brand-name">SpotLink</span>
        </div>
        <nav className="tabs">
          <button
            className={tab === "search" ? "tab active" : "tab"}
            onClick={() => setTab("search")}
          >
            Find parking
          </button>
          <button
            className={tab === "list" ? "tab active" : "tab"}
            onClick={() => setTab("list")}
          >
            List your space
          </button>
        </nav>
      </header>

      <main className="app-main">
        {tab === "search" ? <SearchPage /> : <ListSpotForm onListed={() => setTab("search")} />}
      </main>
    </div>
  );
}
