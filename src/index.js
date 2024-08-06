import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/app/App';
import './index.css'


import { ThemeProvider } from "@material-tailwind/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

<script
  type="text/javascript"
  src="../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"></script>

