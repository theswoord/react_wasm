import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function HomePage() {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Click a button to navigate:</p>
      <Link to="/First">
        <button>Go to First Page</button>
      </Link>
      <Link to="/Second" style={{ marginLeft: '10px' }}>
        <button>Go to Second Page</button>
      </Link>
    </div>
  );
}

export default HomePage;