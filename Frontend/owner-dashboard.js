document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.sidebar button');
  const dashboardContent = document.querySelector('.dashboard-content');

  // Content for each section
  const contentMap = {
    "Properties": `
      <h2>Properties</h2>
      <p>Here you can manage your listed workspaces.</p>
      <div class="content-blocks">
        <div class="block"></div>
        <div class="block"></div>
      </div>
    `,
    "Booking Request": `
      <h2>Booking Requests</h2>
      <p>All incoming booking requests will be displayed here.</p>
    `,
    "Reviews & Rating": `
      <h2>Reviews & Rating</h2>
      <p>Read feedback from your customers and manage reviews.</p>
    `,
    "Account Settings": `
      <h2>Account Settings</h2>
      <p>Manage your personal account information and preferences here.</p>
    `
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content
      const sectionTitle = btn.textContent.trim();
      dashboardContent.innerHTML = contentMap[sectionTitle] || `<h2>${sectionTitle}</h2><p>Content not available.</p>`;
    });
  });
});

const propertyForm = document.getElementById('propertyForm');
    const workspaceForm = document.getElementById('workspaceForm');
    const propertySelect = document.getElementById('propertySelect');
    const propertiesContainer = document.getElementById('propertiesContainer');

    // Data stores
    let properties = [];

    // Render property dropdown for workspace form
    function updatePropertySelect() {
      propertySelect.innerHTML = '<option value="">Select a Property</option>';
      properties.forEach((prop, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = `${prop.address} (${prop.neighborhood})`;
        propertySelect.appendChild(option);
      });
      workspaceForm.style.display = properties.length ? 'block' : 'none';
    }

    // Render properties
    function renderProperties() {
      propertiesContainer.innerHTML = '<h2>Your Properties & Workspaces</h2>';
      properties.forEach((prop, pIdx) => {
        const propDiv = document.createElement('div');
        propDiv.className = 'property';

        // Property details
        propDiv.innerHTML = `
          <strong>Address:</strong> ${prop.address} <br/>
          <strong>Neighborhood:</strong> ${prop.neighborhood} <br/>
          <strong>Square Feet:</strong> ${prop.squareFeet} <br/>
          <strong>Parking Garage:</strong> ${prop.parkingGarage ? 'Yes' : 'No'} <br/>
          <strong>Public Transit:</strong> ${prop.publicTransit ? 'Yes' : 'No'} <br/>
          <button class="btn-inline" onclick="editProperty(${pIdx})">Edit</button>
          <button class="btn-inline" onclick="deleteProperty(${pIdx})">Delete</button>
          <h4>Workspaces:</h4>
        `;

        // Workspaces list
        const wsList = document.createElement('div');
        prop.workspaces.forEach((ws, wIdx) => {
          const wsDiv = document.createElement('div');
          wsDiv.className = 'workspace';
          wsDiv.innerHTML = `
            Type: ${ws.type} | Seating: ${ws.seating} | Smoking: ${ws.smokingAllowed ? 'Yes' : 'No'} | Avail: ${ws.availabilityDate} | Lease: ${ws.leaseTerm} | Price: $${ws.price.toFixed(2)}
            <button class="btn-inline" onclick="editWorkspace(${pIdx}, ${wIdx})">Edit</button>
            <button class="btn-inline" onclick="deleteWorkspace(${pIdx}, ${wIdx})">Delete</button>
          `;
          wsList.appendChild(wsDiv);
        });

        propDiv.appendChild(wsList);
        propertiesContainer.appendChild(propDiv);
      });
    }

    // Add new property
    propertyForm.addEventListener('submit', e => {
      e.preventDefault();
      const form = e.target;
      const newProp = {
        address: form.address.value,
        neighborhood: form.neighborhood.value,
        squareFeet: Number(form.squareFeet.value),
        parkingGarage: form.parkingGarage.checked,
        publicTransit: form.publicTransit.checked,
        workspaces: []
      };
      properties.push(newProp);
      form.reset();
      updatePropertySelect();
      renderProperties();
    });

    // Add new workspace
    workspaceForm.addEventListener('submit', e => {
      e.preventDefault();
      const form = e.target;
      const propIndex = propertySelect.value;
      if (propIndex === '') {
        alert('Please select a property.');
        return;
      }
      const workspace = {
        type: form.type.value,
        seating: Number(form.seating.value),
        smokingAllowed: form.smokingAllowed.checked,
        availabilityDate: form.availabilityDate.value,
        leaseTerm: form.leaseTerm.value,
        price: Number(form.price.value)
      };
      properties[propIndex].workspaces.push(workspace);
      form.reset();
      renderProperties();
    });

    // Delete property
    window.deleteProperty = function(index) {
      if (confirm('Delete this property?')) {
        properties.splice(index, 1);
        updatePropertySelect();
        renderProperties();
      }
    }

    // Delete workspace
    window.deleteWorkspace = function(propIndex, wsIndex) {
      if (confirm('Delete this workspace?')) {
        properties[propIndex].workspaces.splice(wsIndex, 1);
        renderProperties();
      }
    }

   window.editProperty = function(index) {
  const prop = properties[index];
  const newAddress = prompt("Edit Address:", prop.address);
  if (newAddress === null) return; // Cancelled
  const newNeighborhood = prompt("Edit Neighborhood:", prop.neighborhood);
  if (newNeighborhood === null) return;
  const newSquareFeet = prompt("Edit Square Feet:", prop.squareFeet);
  if (newSquareFeet === null) return;
  const newParking = confirm("Has Parking Garage? OK = Yes, Cancel = No");
  const newTransit = confirm("Reachable by Public Transit? OK = Yes, Cancel = No");

  // Update values
  prop.address = newAddress.trim() || prop.address;
  prop.neighborhood = newNeighborhood.trim() || prop.neighborhood;
  prop.squareFeet = Number(newSquareFeet) || prop.squareFeet;
  prop.parkingGarage = newParking;
  prop.publicTransit = newTransit;

  updatePropertySelect();
  renderProperties();
};

window.editWorkspace = function(propIndex, wsIndex) {
  const ws = properties[propIndex].workspaces[wsIndex];
  const newType = prompt("Edit Workspace Type:", ws.type);
  if (newType === null) return;
  const newSeating = prompt("Edit Seating Capacity:", ws.seating);
  if (newSeating === null) return;
  const newSmoking = confirm("Is Smoking Allowed? OK = Yes, Cancel = No");
  const newDate = prompt("Edit Availability Date (YYYY-MM-DD):", ws.availabilityDate);
  if (newDate === null) return;
  const newLease = prompt("Edit Lease Term (Day/Week/Month):", ws.leaseTerm);
  if (newLease === null) return;
  const newPrice = prompt("Edit Price:", ws.price);
  if (newPrice === null) return;

  // Update values
  ws.type = newType.trim() || ws.type;
  ws.seating = Number(newSeating) || ws.seating;
  ws.smokingAllowed = newSmoking;
  ws.availabilityDate = newDate.trim() || ws.availabilityDate;
  ws.leaseTerm = newLease.trim() || ws.leaseTerm;
  ws.price = Number(newPrice) || ws.price;

  renderProperties();
};


    updatePropertySelect();
    renderProperties();
  
