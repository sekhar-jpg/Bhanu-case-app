// RemedyFinder.js
import React, { useState } from 'react';

function RemedyFinder() {
  const [caseDescription, setCaseDescription] = useState('');
  const [remedies, setRemedies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      // Call the backend API to get remedies based on description
      const response = await fetch('http://localhost:5000/api/get-remedy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: caseDescription }),
      });

      const data = await response.json();
      setRemedies(data.remedies);
    } catch (error) {
      console.error("Error fetching remedies:", error);
      setRemedies(["Error fetching remedies. Please try again."]);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Find the Right Homeopathic Remedy</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={caseDescription}
          onChange={(e) => setCaseDescription(e.target.value)}
          placeholder="Describe the symptoms..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      <div>
        <h3>Suggested Remedies:</h3>
        <ul>
          {remedies.map((remedy, index) => (
            <li key={index}>{remedy}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RemedyFinder;
