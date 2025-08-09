document.addEventListener("DOMContentLoaded", () => {
  fetchProperties();
  fetchWorkspaces();

  // Property form submit (add or update)
  document.getElementById("property-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    const newProperty = {
      address: form.address.value,
      neighborhood: form.neighborhood.value,
      sqft: +form.sqft.value,
      parking: form.parking.checked,
      publicTransport: form.publicTransport.checked,
    };

    const isEditing = form.dataset.editingId;
    const url = isEditing
      ? `https://workspace-project.onrender.com/api/properties/${form.dataset.editingId}`
      : "https://workspace-project.onrender.com/api/properties";

    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    });

    if (res.ok) {
      form.reset();
      delete form.dataset.editingId;
      form.querySelector("button[type='submit']").textContent = "Add Property";
      fetchProperties();
    } else {
      alert("Error saving property");
    }
  });

  // Workspace form submit (add or update)
  document.getElementById("workspace-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    const newWS = {
      propertyId: +form.propertySelect.value,
      workspaceName: form.workspaceName.value,
      price: +form.price.value,
      type: form.type.value,
      capacity: +form.capacity.value,
      smokingAllowed: form.smokingAllowed.checked,
      availabilityDate: form.availabilityDate.value,
      leaseTerm: form.leaseTerm.value,
    };

    const isEditing = form.dataset.editingId;
    const url = isEditing
      ? `https://workspace-project.onrender.com/api/workspaces/${form.dataset.editingId}`
      : "https://workspace-project.onrender.com/workspaces";

    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWS),
    });

    if (res.ok) {
      form.reset();
      delete form.dataset.editingId;
      form.querySelector("button[type='submit']").textContent = "Add Workspace";
      fetchWorkspaces();
    } else {
      alert("Error saving workspace");
    }
  });
});

// Fetch and display properties with edit/delete buttons
async function fetchProperties() {
  const res = await fetch("https://workspace-project.onrender.com/api/properties");
  const data = await res.json();

  const list = document.getElementById("property-list");
  const select = document.getElementById("propertySelect");

  list.innerHTML = "<h3>Your Properties:</h3>";
  select.innerHTML = '<option value="">Select a Property</option>';

  data.forEach((prop) => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${prop.address} (${prop.neighborhood})
      <button onclick="editProperty(${prop.id})">Edit</button>
      <button onclick="deleteProperty(${prop.id})">Delist</button>
    `;
    list.appendChild(div);

    const opt = document.createElement("option");
    opt.value = prop.id;
    opt.textContent = prop.address;
    select.appendChild(opt);
  });
}

// Fetch and display workspaces with edit/delete buttons
async function fetchWorkspaces() {
  const res = await fetch("https://workspace-project.onrender.com/api/workspaces");
  const data = await res.json();

  const list = document.getElementById("workspace-list");
  list.innerHTML = "<h3>Your Workspaces:</h3>";

  data.forEach((ws) => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${ws.workspaceName} ($${ws.price}) - ${ws.type}, capacity ${ws.capacity}
      <button onclick="editWorkspace(${ws.id})">Edit</button>
      <button onclick="deleteWorkspace(${ws.id})">Delist</button>
    `;
    list.appendChild(div);
  });
}

// Edit Property: populate property form for editing
async function editProperty(id) {
  const res = await fetch(`https://workspace-project.onrender.com/api/properties/${id}`);
  if (!res.ok) {
    alert("Failed to fetch property");
    return;
  }
  const prop = await res.json();

  const form = document.getElementById("property-form");
  form.address.value = prop.address;
  form.neighborhood.value = prop.neighborhood;
  form.sqft.value = prop.sqft;
  form.parking.checked = prop.parking;
  form.publicTransport.checked = prop.publicTransport;

  form.dataset.editingId = id;
  form.querySelector("button[type='submit']").textContent = "Update Property";
}

// Edit Workspace: populate workspace form for editing
async function editWorkspace(id) {
  const res = await fetch(`https://workspace-project.onrender.com/api/workspaces/${id}`);
  if (!res.ok) {
    alert("Failed to fetch workspace");
    return;
  }
  const ws = await res.json();

  const form = document.getElementById("workspace-form");
  form.propertySelect.value = ws.propertyId;
  form.workspaceName.value = ws.workspaceName;
  form.price.value = ws.price;
  form.type.value = ws.type;
  form.capacity.value = ws.capacity;
  form.smokingAllowed.checked = ws.smokingAllowed;
  form.availabilityDate.value = ws.availabilityDate;
  form.leaseTerm.value = ws.leaseTerm;

  form.dataset.editingId = id;
  form.querySelector("button[type='submit']").textContent = "Update Workspace";
}

// Delete property with confirmation
async function deleteProperty(id) {
  if (!confirm("Are you sure you want to delist this property?")) return;

  const res = await fetch(`https://workspace-project.onrender.com/api/properties/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    fetchProperties();
  } else {
    alert("Failed to delist property");
  }
}

// Delete workspace with confirmation
async function deleteWorkspace(id) {
  if (!confirm("Are you sure you want to delist this workspace?")) return;

  const res = await fetch(`https://workspace-project.onrender.com/api/workspaces/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    fetchWorkspaces();
  } else {
    alert("Failed to delist workspace");
  }
}
