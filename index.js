// Import React and ReactDOM (from react-dom/client for React 18)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your app's styles
import App from './App'; // Main App component

// Find the root element in your HTML where the React app will be rendered
const rootElement = document.getElementById('root');

// Create a root container using React 18's new API
const root = ReactDOM.createRoot(rootElement);

// Render the app into the root element using the new method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
