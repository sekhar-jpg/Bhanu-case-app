import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

// RemedyFinder Component
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
      const response = await axios.post('https://bhanu-case-app.onrender.com/api/get-remedy', {
        description: caseDescription,
      });

      setRemedies(response.data.remedies);
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

// FaceUpload Component
import FaceUpload from './components/FaceUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RemedyFinder />} /> {/* Route for the home page */}
        <Route path="/analyze-face" element={<FaceUpload />} /> {/* Route for the face analysis feature */}
      </Routes>
    </Router>
  );
}

export default App;
