import React from "react";
import { useDashboard } from "../DashboardContext";

export default function Widget({ widget, categoryId }) {
  const { removeWidget } = useDashboard();

  return (
    <div className="widget">
      <h3>{widget.name}</h3>
      <p>{widget.text}</p>
      <button onClick={() => removeWidget(categoryId, widget.id)}>❌</button>
    </div>
  );
}
