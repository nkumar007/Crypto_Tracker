import React from "react";
import ReactDOM from "react-dom/client";
import CryptoContext from "./CryptoContext.jsx";
import "react-alice-carousel/lib/alice-carousel.css";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CryptoContext>
      <App />
    </CryptoContext>
  </React.StrictMode>
);
