import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StartScreen from './pages/startscreen/StartScreen';
import { ContextProvider } from './context/Context';
import { HashRouter, Routes, Route } from 'react-router-dom';
import GameScreen from './pages/gamescreen/main/GameScreen';
import { UIContextProvider } from './context/UIContext';

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UIContextProvider>
      <ContextProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/game" element={<GameScreen />} />
          </Routes>
        </HashRouter>
      </ContextProvider>
    </UIContextProvider>
  </React.StrictMode>
);
