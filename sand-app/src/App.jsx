import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sand from './sand'
import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import Webserver from './webserv';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
      {/* The Routes component wraps all your individual routes */}
      <Routes>
        {/* Each Route maps a URL path to a component */}
        <Route path="/" element={<HomePage />} />
        <Route path="/first-page" element={<FirstPage />} />
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/server" element={<Webserver />} />

      </Routes>
    </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="App">
      <h1>This is the main App Component! 🚀</h1>
      <Sand />
    </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
