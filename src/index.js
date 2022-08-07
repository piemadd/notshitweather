import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// deving with PWAs is a PITA tbh
process.env.NODE_ENV === 'production' ? serviceWorkerRegistration.register() : serviceWorkerRegistration.unregister();

// might want to implement this later, but i always have GA
//reportWebVitals();
