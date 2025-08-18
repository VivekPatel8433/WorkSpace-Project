document.addEventListener("DOMContentLoaded", () => {
  fetchProperties();
  fetchWorkspaces();

  const propertyForm = document.getElementById("property-form");
  const workspaceForm = document.getElementById("workspace-form");

  // ---------------- Property Form ----------------
  propertyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) return alert("You must login first");

    const newProperty = {
      address: propertyForm.address.value,
      neighborhood: propertyForm.neighborhood.value,
      sqft: Number(propertyForm.sqft.value) || 0,
      parking: propertyForm.parking.checked,
      publicTransport: propertyForm.publicTransport.checked,
    };

    const isEditing = propertyForm.dataset.editingId;
    const url = isEditing
      ? `https://workspace-project.onrender.com/api/properties/${isEditing}`
      : "https://workspace-project.onrender.com/api/properties";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProperty),
      });

      const data = await res.json().catch(() => null);
      console.log("Property response:", res.status, data);

      if (!res.ok) throw new Error(`Server error: ${res.status} - ${JSON.stringify(data)}`);

      propertyForm.reset();
      delete propertyForm.dataset.editingId;
      propertyForm.querySelector("button[type='submit']").textContent = "Add Property";
      fetchProperties();
    } catch (err) {
      console.error("Property save error:", err);
      alert("Error saving property");
    }
  });

  // ---------------- Workspace Form ----------------
  workspaceForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    if (!token) return alert("You must login first");

    const newWS = {
      propertyId: workspaceForm.propertySelect.value,
      workspaceName: workspaceForm.workspaceName.value,
      price: Number(workspaceForm.price.value) || 0,
      type: workspaceForm.type.value,
      capacity: Number(workspaceForm.capacity.value) || 0,
      smokingAllowed: workspaceForm.smokingAllowed.checked,
      availabilityDate: workspaceForm.availabilityDate.value,
      leaseTerm: workspaceForm.leaseTerm.value,
    };

    const isEditing = workspaceForm.dataset.editingId;
    const url = isEditing
      ? `https://workspace-project.onrender.com/api/workspaces/${isEditing}`
      : "https://workspace-project.onrender.com/api/workspaces";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newWS),
      });

      const data = await res.json().catch(() => null);
      console.log("Workspace response:", res.status, data);

      if (!res.ok) throw new Error(`Server error: ${res.status} - ${JSON.stringify(data)}`);

      workspaceForm.reset();
      delete workspaceForm.dataset.editingId;
      workspaceForm.querySelector("button[type='submit']").textContent = "Add Workspace";
      fetchWorkspaces();
    } catch (err) {
      console.error("Workspace save error:", err);
      alert("Error saving workspace");
    }
  });
});

// ---------------- Fetch Functions ----------------
async function fetchProperties() {
  const token = localStorage.getItem("jwtToken");
  if (!token) return;

  try {
    const res = await fetch("https://workspace-project.onrender.com/api/properties", {
      headers: { Authorization: `Bearer ${token}` },
    });

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

async function fetchWorkspaces() {
  const token = localStorage.getItem("jwtToken");
  if (!token) return;

  try {
    const res = await fetch("https://workspace-project.onrender.com/api/workspaces", {
      headers: { Authorization: `Bearer ${token}` },
    });

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

// ---------------- Edit / Delete Functions ----------------
function editProperty(id) {
  const form = document.getElementById("property-form");
  const token = localStorage.getItem("jwtToken");
  if (!token) return;

  fetch(`https://workspace-project.onrender.com/api/properties/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(prop => {
      form.address.value = prop.address;
      form.neighborhood.value = prop.neighborhood;
      form.sqft.value = prop.sqft;
      form.parking.checked = prop.parking;
      form.publicTransport.checked = prop.publicTransport;
      form.dataset.editingId = prop._id;
      form.querySelector("button[type='submit']").textContent = "Update Property";
    })
    .catch(err => console.error("Edit property error:", err));
}

function deleteProperty(id) {
  const token = localStorage.getItem("jwtToken");
  if (!token) return;

  if (!confirm("Are you sure you want to delete this property?")) return;

  fetch(`https://workspace-project.onrender.com/api/properties/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(() => fetchProperties())
    .catch(err => console.error("Delete property error:", err));
}

function editWorkspace(id) {
  const form = document.getElementById("workspace-form");
  const token = localStorage.getItem("jwtToken");
  if (!token) return;

  fetch(`https://workspace-project.onrender.com/api/workspaces/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(ws => {
      form.propertySelect.value = ws.propertyId;
      form.workspaceName.value = ws.workspaceName;
      form.price.value = ws.price;
      form.type.value = ws.type;
      form.capacity.value = ws.capacity;
      form.smokingAllowed.checked = ws.smokingAllowed;
      form.availabilityDate.value = ws.availabilityDate.slice(0,10);
      form.leaseTerm.value = ws.leaseTerm;
      form.dataset.editingId = ws._id;
      form.querySelector("button[type='submit']").textContent = "Update Workspace";
    })
    .catch(err => console.error("Edit workspace error:", err));
}

function deleteWorkspace(id) {
  const token = localStorage.getItem("jwtToken");
  if (!token) return;

  if (!confirm("Are you sure you want to delete this workspace?")) return;

  fetch(`https://workspace-project.onrender.com/api/workspaces/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(() => fetchWorkspaces())
    .catch(err => console.error("Delete workspace error:", err));
}
