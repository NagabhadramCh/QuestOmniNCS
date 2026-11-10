import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

// No StrictMode: it mounts twice in development, and the texted link's token works only once.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
