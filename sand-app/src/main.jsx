import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './HomePage.jsx';
import FirstPage from './FirstPage.jsx';
import Sand from './WasmGame.jsx';
import CuB3d from './cub3d.jsx'

import SecondPage from './SecondPage.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/navsand",
    element: <HomePage />,
  },
  {
    path: "/navcub", 
    element: <HomePage />,
  },
  {
    path: "/navcontact",
    element: <HomePage />,
  },
  {
    path: "/navwebserv",
    element: <HomePage />,
  },
  {
    path: "/First",
    element: <Sand />,
  },
  {
    path: "/Second",
    element: <CuB3d />
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);