import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <AuthContextProvider>
      <BrowserRouter basename='/ecom'>
        <App />
      </BrowserRouter>
    </AuthContextProvider> 

);


