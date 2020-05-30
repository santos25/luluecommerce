import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/custom.css";
import { Provider } from 'react-redux';
import store from './Redux/store';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


