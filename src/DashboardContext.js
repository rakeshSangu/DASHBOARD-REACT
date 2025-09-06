import React, { createContext, useContext, useState, useEffect } from "react";
import data from "./sampleData.json"; // your large JSON

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [categories, setCategories] = useState([]);

  // Load state from localStorage (if exists), otherwise from sampleData.json
  useEffect(() => {
    const saved = localStorage.getItem("dashboard_state");
    if (saved) {
      setCategories(JSON.parse(saved).categories);
    } else {
      setCategories(data.categories); // load large JSON by default
    }
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("dashboard_state", JSON.stringify({ categories }));
    }
  }, [categories]);

  // Easy functions for actions
  const addWidget = (categoryId, widget) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, widget] }
          : cat
      )
    );
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) }
          : cat
      )
    );
  };

  const toggleCategory = (categoryId) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, visible: !cat.visible } : cat
      )
    );
  };

  return (
    <DashboardContext.Provider value={{ categories, addWidget, removeWidget, toggleCategory }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
