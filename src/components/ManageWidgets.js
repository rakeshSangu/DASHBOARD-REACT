import React from "react";
import { useDashboard } from "../DashboardContext";

export default function ManageWidgets() {
  const { categories, removeWidget } = useDashboard();

  return (
    <div className="manage">
      <h2>Manage Widgets</h2>
      {categories.map(cat => (
        <div key={cat.id} className="manage-category">
          <h3>{cat.name}</h3>
          {cat.widgets.length === 0 && <p>No widgets</p>}
          {cat.widgets.map(w => (
            <label key={w.id} className="manage-widget">
              <input
                type="checkbox"
                checked={true}
                onChange={() => removeWidget(cat.id, w.id)}
              />
              {w.name}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
