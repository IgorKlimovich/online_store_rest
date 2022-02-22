import React, {createContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import app from "./App";

export const Context = createContext(null)
const cors = require('cors')

// app.use(cors())
ReactDOM.render(
  <React.StrictMode>
      <Context.Provider value={{
          user:new UserStore(),
          product:new ProductStore()
      }}>
          <App  />
      </Context.Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
