import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameContextProvider } from './contexts/gamesContext'

//Components
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GameContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GameContextProvider>
);

