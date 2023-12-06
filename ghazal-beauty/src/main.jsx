import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CheckboxProvider } from "./context/checkboxContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CheckboxProvider>
      <App />
    </CheckboxProvider>
  </React.StrictMode>
);
