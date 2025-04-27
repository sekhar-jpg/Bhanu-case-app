document.getElementById("submitCaseForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Collect form data
  const formData = new FormData(this);

  // Submit the case data to the backend
  fetch('/submit-case', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Case submitted successfully') {
      // After submission, display case data
      displayCaseDetails(data.case);
    }
  })
  .catch(error => console.error('Error:', error));
});

function displayCaseDetails(caseData) {
  // Get the case details div
  const caseDetailsDiv = document.getElementById("case-details");

  // Populate the case details
  caseDetailsDiv.innerHTML = `
    <h2>Case Details</h2>
    <ul>
      <li><strong>Name:</strong> ${caseData.name}</li>
      <li><strong>Age:</strong> ${caseData.age}</li>
      <li><strong>Gender:</strong> ${caseData.gender}</li>
      <li><strong>Marital Status:</strong> ${caseData.maritalStatus}</li>
      <li><strong>Occupation:</strong> ${caseData.occupation}</li>
      <li><strong>Address:</strong> ${caseData.address}</li>
      <li><strong>Phone:</strong> ${caseData.phone}</li>
      <li><strong>Date of Visit:</strong> ${caseData.dateOfVisit}</li>
      <li><strong>Chief Complaints:</strong> ${caseData.chiefComplaints}</li>
      <li><strong>Follow-Up Date:</strong> ${caseData.followUpDate}</li>
    </ul>
  `;
}
