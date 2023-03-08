import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
