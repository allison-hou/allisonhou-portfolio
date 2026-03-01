import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import IntroSplash from "./IntroSplash";

const basename = import.meta.env.PROD ? "/allisonhou-portfolio" : "/";

function Boot() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <IntroSplash name="ALLISON HOU" onDone={() => setShowIntro(false)} />
      )}
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Boot />
  </React.StrictMode>
);