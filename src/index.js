import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import {AutoToTop} from './components/AutoToTop'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <BrowserRouter>
      <AutoToTop>
        <Provider store={store}>
          <App/>
        </Provider>
      </AutoToTop>
    </BrowserRouter>
  
);