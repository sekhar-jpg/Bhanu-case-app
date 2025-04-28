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
function deleteCase(caseId) {
  if (confirm('Are you sure you want to delete this case?')) {
    fetch(`/cases/${caseId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      searchFollowUps(); // Refresh table after deletion
    })
    .catch(error => console.error('Error deleting case:', error));
  }
}

function editCase(caseId) {
  // Fetch case details and prefill the form
  fetch(`/cases/${caseId}`)
    .then(response => response.json())
    .then(caseData => {
      document.getElementById('name').value = caseData.name;
      document.getElementById('age').value = caseData.age;
      document.getElementById('gender').value = caseData.gender;
      document.getElementById('maritalStatus').value = caseData.maritalStatus;
      document.getElementById('occupation').value = caseData.occupation;
      document.getElementById('address').value = caseData.address;
      document.getElementById('phone').value = caseData.phone;
      document.getElementById('dateOfVisit').value = new Date(caseData.dateOfVisit).toISOString().split('T')[0];
      document.getElementById('chiefComplaints').value = caseData.chiefComplaints;
      document.getElementById('followUpDate').value = new Date(caseData.followUpDate).toISOString().split('T')[0];

      // Add hidden input for editing existing case
      let hiddenIdField = document.getElementById('caseId');
      if (!hiddenIdField) {
        hiddenIdField = document.createElement('input');
        hiddenIdField.type = 'hidden';
        hiddenIdField.id = 'caseId';
        hiddenIdField.name = 'caseId';
        document.getElementById('submitCaseForm').appendChild(hiddenIdField);
      }
      hiddenIdField.value = caseId;
    })
    .catch(error => console.error('Error fetching case for edit:', error));
}
