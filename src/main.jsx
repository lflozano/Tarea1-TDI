import React from 'react'
import { createRoot } from "react-dom/client";
import { RestaurantApp } from './RestaurantApp'
import './styles.css'

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RestaurantApp />
  </React.StrictMode>
);