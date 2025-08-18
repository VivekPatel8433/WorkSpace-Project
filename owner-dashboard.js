document.addEventListener("DOMContentLoaded", () => {
  fetchProperties();
  fetchWorkspaces();

  // Property form submit (add or update)
  document.getElementById("property-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const token = localStorage.getItem("jwtToken"); 
    if (!token) return alert("You must login first");

    const newProperty = {
      address: form.address.value,
      neighborhood: form.neighborhood.value,
      sqft: form.sqft.value ? Number(form.sqft.value) : 0,
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
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newProperty),
      });

      console.log("Response status:", res.status);
      const data = await res.json().catch(() => null);
       console.log("Response body:", data);

      if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server error: ${res.status} - ${errorText}`);
}


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
    const token = localStorage.getItem("jwtToken"); 
    if (!token) return alert("You must login first");

    const newWS = {
      propertyId: form.propertySelect.value,
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
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
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

// Fetch functions and edit/delete functions
const tokenKey = "jwtToken";
async function fetchProperties() {
  try {
    const token = localStorage.getItem("jwtToken");
    const res = await fetch("https://workspace-project.onrender.com/api/properties", {
      headers: { "Authorization": `Bearer ${token}` },
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
  try {
    const token = localStorage.getItem("jwtToken");
    const res = await fetch("https://workspace-project.onrender.com/api/workspaces", {
      headers: { "Authorization": `Bearer ${token}` },
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
