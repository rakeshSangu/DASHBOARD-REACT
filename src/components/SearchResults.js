import React from "react";
import { useDashboard } from "../DashboardContext";

export default function SearchResults({ query }) {
  const { categories } = useDashboard();
  const q = query.toLowerCase();

  const results = categories.flatMap(cat =>
    cat.widgets
      .filter(
        w =>
          w.name.toLowerCase().includes(q) ||
          w.text.toLowerCase().includes(q) ||
          cat.name.toLowerCase().includes(q)
      )
      .map(w => ({ ...w, categoryName: cat.name }))
  );

  return (
    <div className="results">
      <h2>Search Results</h2>
      {results.length === 0 && <p>No matches found</p>}
      {results.map(r => (
        <div key={r.id} className="widget">
          <strong>{r.name}</strong> <em>({r.categoryName})</em>
          <p>{r.text}</p>
        </div>
      ))}
    </div>
  );
}
