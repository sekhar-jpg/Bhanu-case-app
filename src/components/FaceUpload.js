import React, { useState } from "react";
import axios from "axios";

const FaceUpload = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  
  // Handle image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://<your-render-app-url>.onrender.com/analyze-face", // Replace with your live Render URL
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Handle the response (you can use the AI result later)
      setResult(response.data);
      console.log("AI Result:", response.data.aiResult);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    }
  };

  return (
    <div>
      <h2>Upload Face Image for Analysis</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>

      {result && (
        <div>
          <h3>Analysis Result:</h3>
          <p><strong>Facial Type:</strong> {result.aiResult.facialType}</p>
          <p><strong>Constitution:</strong> {result.aiResult.constitution}</p>
          <p><strong>Suggested Remedies:</strong> {result.aiResult.remedies.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default FaceUpload;
