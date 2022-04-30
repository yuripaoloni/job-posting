import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import Providers from "./Providers";

// import "bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "./scss/bootstrap-italia-custom.scss";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
