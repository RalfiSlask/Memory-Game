import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import StartScreen from "./pages/startscreen/StartScreen";
import { ContextProvider } from "./context/Context";
import GameScreen from "./pages/gamescreen/main/GameScreen";
import { UIContextProvider } from "./context/UIContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <UIContextProvider>
      <ContextProvider>
        <BrowserRouter basename="/Memory-Game/">
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/game" element={<GameScreen />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </UIContextProvider>
  </React.StrictMode>
);
