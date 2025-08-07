document.addEventListener("DOMContentLoaded", () => {
  fetchProperties();
  fetchWorkspaces();
});

// Add property
document.getElementById("property-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    address: form.address.value,
    neighborhood: form.neighborhood.value,
    sqft: parseInt(form.sqft.value),
    parking: form.parking.checked,
    publicTransport: form.publicTransport.checked,
  };

  const res = await fetch("http://localhost:3001/api/properties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    alert("Property added!");
    form.reset();
    fetchProperties();
  } else {
    alert("Failed to add property.");
  }
});

// Add workspace
document.getElementById("workspace-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    capacity: parseInt(form.capacity.value),
    propertyId: form.propertyId.value,
  };

  const res = await fetch("http://localhost:3001/api/workspaces", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    alert("Workspace added!");
    form.reset();
    fetchWorkspaces();
  } else {
    alert("Failed to add workspace.");
  }
});

async function fetchProperties() {
  const res = await fetch("http://localhost:3001/api/properties");
  const properties = await res.json();

  const list = document.getElementById("property-list");
  const select = document.getElementById("propertySelect");
  select.innerHTML = "<option value=''>Select Property</option>";

  if (properties.length === 0) {
    list.innerHTML = "<p>No properties found.</p>";
    document.getElementById("workspace-form-section").style.display = "none";
  } else {
    list.innerHTML = properties.map(p => `<p>${p.address} (${p.neighborhood})</p>`).join("");
    properties.forEach(p => {
      const option = document.createElement("option");
      option.value = p.id;
      option.textContent = p.address;
      select.appendChild(option);
    });
    document.getElementById("workspace-form-section").style.display = "block";
  }
}

async function fetchWorkspaces() {
  const res = await fetch("http://localhost:3001/api/workspaces");
  const workspaces = await res.json();

  const list = document.getElementById("workspace-list");
  list.innerHTML = "<h3>Your Workspaces:</h3>" + (
    workspaces.length
      ? workspaces.map(w => `<p>${w.name} - Capacity: ${w.capacity}</p>`).join("")
      : "<p>No workspaces yet.</p>"
  );
}
