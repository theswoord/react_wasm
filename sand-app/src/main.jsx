import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // 1. Import BrowserRouter

import App from './App.jsx'
import HomePage from './HomePage.jsx';

import FirstPage from './FirstPage.jsx';
import SecondPage from './SecondPage.jsx';
import './index.css'



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/First",
    element: <FirstPage/>,
  },
  {
    path: "/Second",
    element: <SecondPage/>
  },
]);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />
);