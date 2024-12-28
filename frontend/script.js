// Function to show specific section
function showSection(sectionId) {
  // Hide all sections
  ['addDonor', 'searchDonor', 'allDonors', 'updateDonor', 'deleteDonor'].forEach(section => {
      document.getElementById(section).style.display = 'none';
  });
  
  // Show selected section
  document.getElementById(sectionId).style.display = 'block';
}

// Add Donor Form Submission
document.getElementById('addDonorForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const donorData = Object.fromEntries(formData.entries());

  try {
      const response = await fetch('/api/donors', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              ...donorData,
              user_id: null, // You can modify this if you implement user authentication
              eligibility_status: true,
          }),
      });

      const result = await response.json();
      if (response.ok) {
          alert(`Donor added successfully. Donor ID: ${result.donor_id}`);
          e.target.reset();
      } else {
          throw new Error(result.message);
      }
  } catch (error) {
      alert(`Error: ${error.message}`);
  }
});

// Search Donors Form Submission
document.getElementById('searchDonorForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const blood_type = encodeURIComponent(formData.get('blood_type'));
  const address = encodeURIComponent(formData.get('address'));

  try {
      const response = await fetch(`/api/donors/search?blood_type=${blood_type}&address=${address}`);
      const donors = await response.json();

      const resultsDiv = document.getElementById('searchResults');
      resultsDiv.innerHTML = ''; // Clear previous results

      if (donors.length === 0) {
          resultsDiv.innerHTML = '<p>No donors found.</p>';
          return;
      }

      // Create table for results
      const table = document.createElement('table');
      table.innerHTML = `
          <thead>
              <tr>
                  <th>Donor ID</th>
                  <th>Name</th>
                  <th>Blood Type</th>
                  <th>Address</th>
                  <th>Contact Number</th>
              </tr>
          </thead>
          <tbody></tbody>
      `;

      const tbody = table.querySelector('tbody');
      donors.forEach(donor => {
          const row = tbody.insertRow();
          row.insertCell(0).textContent = donor.donor_id;
          row.insertCell(1).textContent = donor.full_name;
          row.insertCell(2).textContent = donor.blood_type;
          row.insertCell(3).textContent = donor.address;
          row.insertCell(4).textContent = donor.contact_number;
      });

      resultsDiv.appendChild(table);
  } catch (error) {
      alert(`Error: ${error.message}`);
  }
});

// Fetch All Donors
async function fetchAllDonors() {
  try {
      const response = await fetch('/api/donors');
      const donors = await response.json();
      console.log(donors);

      const tableBody = document.getElementById('allDonorsTableBody');
      tableBody.innerHTML = ''; // Clear previous data

      donors.forEach(donor => {
          const row = tableBody.insertRow();
          row.insertCell(0).textContent = donor.donor_id;
          row.insertCell(1).textContent = donor.full_name;
          row.insertCell(2).textContent = donor.blood_type;
          row.insertCell(3).textContent = donor.address;
          row.insertCell(4).textContent = donor.contact_number;
      });
  } catch (error) {
      alert(`Error: ${error.message}`);
  }
}

// Update Donor Form Submission
document.getElementById('updateDonorForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const donorData = Object.fromEntries(formData.entries());
  const donorId = donorData.donor_id;

  try {
      const response = await fetch(`/api/donors/${donorId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              ...donorData,
              user_id: null, // You can modify this if you implement user authentication
              eligibility_status: true,
          }),
      });

      const result = await response.json();
      if (response.ok) {
          alert('Donor updated successfully');
          e.target.reset();
      } else {
          throw new Error(result.message);
      }
  } catch (error) {
      alert(`Error: ${error.message}`);
  }
});

// Delete Donor Form Submission
document.getElementById('deleteDonorForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const donorId = formData.get('donor_id');
  const bloodType = formData.get('blood_type');

  try {
      const response = await fetch(`/api/donors/${donorId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ blood_type: bloodType }),
      });

      const result = await response.json();
      if (response.ok) {
          alert('Donor deleted successfully');
          e.target.reset();
      } else {
          throw new Error(result.message);
      }
  } catch (error) {
      alert(`Error: ${error.message}`);
  }
});

// Fetch all donors when the page loads
window.onload = fetchAllDonors;