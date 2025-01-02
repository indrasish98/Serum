import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { router } from "./router/AppRouter.jsx";
import './index.css'
import App from './App.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
    <RouterProvider router={router} />
)
