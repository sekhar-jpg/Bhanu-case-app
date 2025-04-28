document.getElementById("submitCaseForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Collect form data
  const formData = new FormData(this);

  // Convert form data to a plain object for JSON submission
  const caseData = {};
  formData.forEach((value, key) => {
    caseData[key] = value;
  });

  // Send case data as JSON to the backend
  fetch('/submit-case', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Ensure data is sent as JSON
    },
    body: JSON.stringify(caseData),
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

  // Format dates
  const visitDate = new Date(caseData.dateOfVisit).toLocaleDateString();
  const followUpDate = new Date(caseData.followUpDate).toLocaleDateString();

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
      <li><strong>Date of Visit:</strong> ${visitDate}</li>
      <li><strong>Chief Complaints:</strong> ${caseData.chiefComplaints}</li>
      <li><strong>Follow-Up Date:</strong> ${followUpDate}</li>
    </ul>
  `;
}
function searchFollowUps() {
  const searchTerm = document.getElementById('search').value;

  fetch(`/follow-ups?search=${searchTerm}`)
    .then(response => response.json())
    .then(followUps => {
      displayFollowUps(followUps);
    })
    .catch(error => console.error('Error fetching follow-ups:', error));
}

function displayFollowUps(followUps) {
  const table = document.getElementById('followUpTable');
  table.innerHTML = '';

  followUps.forEach(caseData => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${caseData.name}</td>
      <td>${caseData.phone}</td>
      <td>${new Date(caseData.followUpDate).toLocaleDateString()}</td>
    `;
    table.appendChild(row);
  });
}
function displayFollowUps(followUps) {
  const tableBody = document.getElementById('followUpTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  followUps.forEach(caseData => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${caseData.name}</td>
      <td>${caseData.phone}</td>
      <td>${new Date(caseData.followUpDate).toLocaleDateString()}</td>
      <td>
        <button onclick="editCase('${caseData._id}')">Edit</button>
        <button onclick="deleteCase('${caseData._id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}
