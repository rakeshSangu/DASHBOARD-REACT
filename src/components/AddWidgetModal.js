import React, { useState } from "react";
import { useDashboard } from "../DashboardContext";

function makeId() {
  return "w_" + Math.random().toString(36).slice(2, 9);
}

export default function AddWidgetModal({ categoryId, onClose }) {
  const { addWidget } = useDashboard();
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  function handleAdd() {
    if (!name.trim()) return alert("Widget name required!");
    addWidget(categoryId, { id: makeId(), name, text });
    onClose();
  }

  return (
    <div className="modal">
      <h3>Add Widget</h3>
      <input
        placeholder="Widget name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <textarea
        placeholder="Widget text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
