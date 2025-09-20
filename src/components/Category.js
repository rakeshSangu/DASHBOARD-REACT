import  { useState } from "react";
import { useDashboard } from "../DashboardContext";
import Widget from "./Widget";
import AddWidgetModal from "./AddWidgetModal";

export default function Category({ category }) {
  const { toggleCategory } = useDashboard();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="category">
      <h2>
        {category.name}
        <button onClick={() => toggleCategory(category.id)}>
          {category.visible ? "Hide" : "Show"}
        </button>
        <button onClick={() => setShowModal(true)}>+ Add Widget</button>
      </h2>

      {category.visible &&
        category.widgets.map(w => (
          <Widget key={w.id} widget={w} categoryId={category.id} />
        ))}

      {showModal && (
        <AddWidgetModal
          categoryId={category.id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
