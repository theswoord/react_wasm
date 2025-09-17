// src/Webserverr.js
import React, { useState, useEffect } from "react";

function Webserverr() {
  // State for the click data, loading, and errors
  const [clickData, setClickData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state to manage the selected amount and submission status
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. FUNCTION TO FETCH DATA ---
  // We put this in a function so we can call it on load AND after submitting.
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.nabilbouhali.xyz/results.json");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setClickData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setClickData(null);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. FETCH DATA ON INITIAL RENDER ---
  // The empty array [] means this effect runs only ONCE when the component mounts.
  useEffect(() => {
    fetchData();
  }, []);

  // --- 3. FUNCTION TO HANDLE THE SUBMISSION (PATCH REQUEST) ---
  const handleSubmit = async () => {
    setIsSubmitting(true); // Disable button
    setError(null);

    try {
      const response = await fetch("https://api.nabilbouhali.xyz/results.json", {
        method: "PATCH",
        headers: {
          "amount":selectedAmount.toString(),
        },
        // The body sends the selected amount.
        // Your server should be set up to read a JSON with an "amount" key.
        body: JSON.stringify({ amount: selectedAmount.toString() }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit. Status: ${response.status}`);
      }

      // If submission is successful, fetch the new total clicks
      fetchData();

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  // --- 4. DYNAMIC STYLING ---
  // Determine background color based on whether clicks are even or odd
  const isEven = clickData ? clickData.clicks % 2 === 0 : true;
  const bgColorClass = isEven
    ? "bg-green-100 border-green-500"
    : "bg-red-100 border-red-500";
  const textColorClass = isEven ? "text-green-700" : "text-red-700";

  // --- 5. RENDER THE COMPONENT ---

  // Show a loading message while fetching
  if (loading) {
    return <div className="text-center p-10"><h2>Loading... ⏳</h2></div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className={`w-full max-w-md p-8 text-center bg-white rounded-2xl shadow-2xl transition-all duration-500 border-4 ${bgColorClass}`}>

        <h2 className="text-3xl font-bold text-gray-700 mb-2">Total Clicks</h2>
        
        {/* Display the clicks count */}
        {clickData ? (
          <p className={`font-mono text-9xl font-extrabold my-4 transition-colors duration-500 ${textColorClass}`}>
            {clickData.clicks}
          </p>
        ) : (
          <p className="font-mono text-9xl font-extrabold my-4 text-gray-300">?</p>
        )}

        {/* Display any errors that occur */}
        {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg my-4">Error: {error} 😥</p>}

        <hr className="my-6 border-gray-300"/>

        {/* Controls for adding new clicks */}
        <div className="controls">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Amount: {selectedAmount}</h3>
          
          {/* Clickable dots to select the amount */}
          <div className="flex justify-center space-x-4 mb-6">
            {[1, 3, 5].map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                  selectedAmount === amount ? "bg-blue-600 scale-110" : "bg-gray-400"
                }`}
              >
                {amount}
              </button>
            ))}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Webserverr;