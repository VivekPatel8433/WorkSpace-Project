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

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProperty),
      });

      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);

      form.reset();
      delete form.dataset.editingId;
      form.querySelector("button[type='submit']").textContent = "Add Property";
      fetchProperties();
    } catch (err) {
      console.error("Property save error:", err);
      alert("Error saving property");
    }
  });

  // Workspace form submit (add or update)
  document.getElementById("workspace-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    const newWS = {
      propertyId: form.propertySelect.value, // removed '+', should be string
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
      : "https://workspace-project.onrender.com/api/workspaces";

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newWS),
      });

      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);

      form.reset();
      delete form.dataset.editingId;
      form.querySelector("button[type='submit']").textContent = "Add Workspace";
      fetchWorkspaces();
    } catch (err) {
      console.error("Workspace save error:", err);
      alert("Error saving workspace");
    }
  });
});

// Fetch properties
async function fetchProperties() {
  try {
    const res = await fetch("https://workspace-project.onrender.com/api/properties");
    if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

    const data = await res.json();
    const list = document.getElementById("property-list");
    const select = document.getElementById("propertySelect");

    list.innerHTML = "<h3>Your Properties:</h3>";
    select.innerHTML = '<option value="">Select a Property</option>';

    data.forEach((prop) => {
      const div = document.createElement("div");
      div.innerHTML = `
        ${prop.address} (${prop.neighborhood})
        <button onclick="editProperty('${prop._id}')">Edit</button>
        <button onclick="deleteProperty('${prop._id}')">Delist</button>
      `;
      list.appendChild(div);

      const opt = document.createElement("option");
      opt.value = prop._id;
      opt.textContent = prop.address;
      select.appendChild(opt);
    });
  } catch (err) {
    console.error("Fetch properties error:", err);
  }
}

// Fetch workspaces
async function fetchWorkspaces() {
  try {
    const res = await fetch("https://workspace-project.onrender.com/api/workspaces");
    if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);

    const data = await res.json();
    const list = document.getElementById("workspace-list");
    list.innerHTML = "<h3>Your Workspaces:</h3>";

    data.forEach((ws) => {
      const div = document.createElement("div");
      div.innerHTML = `
        ${ws.workspaceName} ($${ws.price}) - ${ws.type}, capacity ${ws.capacity}
        <button onclick="editWorkspace('${ws._id}')">Edit</button>
        <button onclick="deleteWorkspace('${ws._id}')">Delist</button>
      `;
      list.appendChild(div);
    });
  } catch (err) {
    console.error("Fetch workspaces error:", err);
  }
}

// Edit property
async function editProperty(id) {
  try {
    const res = await fetch(`https://workspace-project.onrender.com/api/properties/${id}`);
    if (!res.ok) throw new Error("Failed to fetch property");

    const prop = await res.json();
    const form = document.getElementById("property-form");
    form.address.value = prop.address;
    form.neighborhood.value = prop.neighborhood;
    form.sqft.value = prop.sqft;
    form.parking.checked = prop.parking;
    form.publicTransport.checked = prop.publicTransport;

    form.dataset.editingId = id;
    form.querySelector("button[type='submit']").textContent = "Update Property";
  } catch (err) {
    console.error("Edit property error:", err);
    alert("Failed to fetch property");
  }
}

// Edit workspace
async function editWorkspace(id) {
  try {
    const res = await fetch(`https://workspace-project.onrender.com/api/workspaces/${id}`);
    if (!res.ok) throw new Error("Failed to fetch workspace");

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
  } catch (err) {
    console.error("Edit workspace error:", err);
    alert("Failed to fetch workspace");
  }
}

// Delete property
async function deleteProperty(id) {
  if (!confirm("Are you sure you want to delist this property?")) return;

  try {
    const res = await fetch(`https://workspace-project.onrender.com/api/properties/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delist property");
    fetchProperties();
  } catch (err) {
    console.error(err);
    alert("Failed to delist property");
  }
}

// Delete workspace
async function deleteWorkspace(id) {
  if (!confirm("Are you sure you want to delist this workspace?")) return;

  try {
    const res = await fetch(`https://workspace-project.onrender.com/api/workspaces/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delist workspace");
    fetchWorkspaces();
  } catch (err) {
    console.error(err);
    alert("Failed to delist workspace");
  }
}
