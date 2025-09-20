import { useState } from "react";
import { useDashboard } from "../DashboardContext";

export default function Widget({ widget, categoryId }) {
  const { removeWidget, saveEditedWidget } = useDashboard();
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(widget.text);

  const onClickEditSave = () => {
    if(!isEditing){
      setIsEditing(true)
    }else{
      if(text !== widget.text && text){
        saveEditedWidget(categoryId, widget.id, text)
      }
      setIsEditing(false)
        setText(widget.text)
    }
  }

  return (
    <div className="widget">
      <h3>{widget.name}</h3>
      {isEditing ? <input value={text} onChange={(e) => setText(e.target.value)} /> : <p>{widget.text}</p>}
      <button className={isEditing ? "save-btn" : "edit-btn"} onClick={onClickEditSave}>{isEditing ? "save" : "edit"}</button>
      <button onClick={() => removeWidget(categoryId, widget.id)}>❌</button>
    </div>
  );
}
