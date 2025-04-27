document.getElementById('caseForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // Prevents the default form submission

  // Create an object to hold form data
  const formData = new FormData(this);
  const caseData = {};

  // Loop through each form field and collect data
  formData.forEach((value, key) => {
    caseData[key] = value;
  });

  try {
    // Send the form data to the backend via POST request
    const response = await fetch('/submit-case', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(caseData) // Convert form data to JSON
    });

    const result = await response.json();

    // Handle the response
    if (response.status === 201) {
      alert('Case submitted successfully');
      console.log(result); // Optionally log the result for debugging
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    alert('Error submitting case');
    console.error(error);
  }
});
