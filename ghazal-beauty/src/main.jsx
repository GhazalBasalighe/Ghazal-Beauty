import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CheckboxProvider } from "./context/checkboxContext.jsx";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <CheckboxProvider>
        <App />
      </CheckboxProvider>
    </Provider>
  </React.StrictMode>
);
