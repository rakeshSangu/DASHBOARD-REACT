import React, { useState } from "react";
import { DashboardProvider, useDashboard } from "./DashboardContext";
import Category from "./components/Category";
import SearchResults from "./components/SearchResults";
import ManageWidgets from "./components/ManageWidgets";
import "./styles.css";


function Dashboard() {
  const { categories } = useDashboard();
  const [query, setQuery] = useState("");
  const [manageMode, setManageMode] = useState(false);

  return (
    <div className="app">
      <header>
        <h1>Dynamic Dashboard</h1>
        <input
          placeholder="Search widgets..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={() => setManageMode(!manageMode)}>
          {manageMode ? "Back to Dashboard" : "Manage Widgets"}
        </button>
      </header>

      {manageMode ? (
        <ManageWidgets />
      ) : query ? (
        <SearchResults query={query} />
      ) : (
        categories.map(cat => <Category key={cat.id} category={cat} />)
      )}
    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}
