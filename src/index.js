import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase, { auth, database } from './fire-config';

export const Context = createContext({});

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{ auth, database, firebase }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
