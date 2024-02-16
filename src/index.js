import React from 'react';
//import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
//import App from './App.js';
//import AppRouter from './AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { ProSidebarProvider } from "react-pro-sidebar";
import AppRouter from './AppRouter.js';

//ReactDOM.render(<App />, document.getElementById('root'));

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <div>
      <ProSidebarProvider>
        <AppRouter />
      </ProSidebarProvider>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();