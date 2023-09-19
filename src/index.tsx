import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StartScreen from './pages/startscreen/StartScreen';
import { ContextProvider } from './context/Context';
import { HashRouter, Routes, Route } from 'react-router-dom';

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<StartScreen />} />
        </Routes>
      </HashRouter>
    </ContextProvider>
  </React.StrictMode>
);
