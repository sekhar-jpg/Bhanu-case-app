import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RemedyFinderComponent from './App'; // మీ ప్రస్తుత App కాంపోనెంట్ పేరు మార్చబడింది
import FaceUpload from './components/FaceUpload'; // FaceUpload కాంపోనెంట్ యొక్క సరైన పాత్

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RemedyFinderComponent />} /> {/* హోమ్‌పేజ్ కోసం రూట్ */}
        <Route path="/analyze-face" element={<FaceUpload />} /> {/* కెమెరా ఫీచర్ కోసం రూట్ */}
      </Routes>
    </Router>
  );
}

// మీ ప్రస్తుత App కాంపోనెంట్ (RemedyFinder) ఇక్కడ ఉంటుంది
function RemedyFinderComponent() {
  const [caseDescription, setCaseDescription] = useState('');
  const [remedies, setRemedies] = useState([]);
  const [loading, setLoading] = useState(false);

  // ఫారం సబ్మిషన్‌ను హ్యాండిల్ చేస్తుంది
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // డిస్క్రిప్షన్ ఆధారంగా నివారణలను పొందడానికి బ్యాకెండ్ API ని కాల్ చేస్తుంది
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

export default App;
