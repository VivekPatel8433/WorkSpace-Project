document.addEventListener("DOMContentLoaded", () => {
  fetchProperties();
  fetchWorkspaces();

  // Add property
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

    const res = await fetch("http://localhost:3001/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    });

    if (res.ok) {
      form.reset();
      fetchProperties();
    } else {
      alert("Error adding property");
    }
  });

  // Add workspace
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
    leaseTerm: form.leaseTerm.value
  };

  const res = await fetch("http://localhost:3001/api/workspaces", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newWS),
  });

  if (res.ok) {
    form.reset();
    fetchWorkspaces();
  } else {
    alert("Error adding workspace");
  }
});
});

async function fetchProperties() {
  const res = await fetch("http://localhost:3001/api/properties");
  const data = await res.json();

  const list = document.getElementById("property-list");
  const select = document.getElementById("propertySelect");

  list.innerHTML = "<h3>Your Properties:</h3>";
  select.innerHTML = '<option value="">Select a Property</option>';

  data.forEach((prop) => {
    // Show properties in list
    const div = document.createElement("div");
    div.textContent = `${prop.address} (${prop.neighborhood})`;
    list.appendChild(div);

    // Add options to dropdown
    const opt = document.createElement("option");
    opt.value = prop.id;
    opt.textContent = prop.address;
    select.appendChild(opt);
  });
}

async function fetchWorkspaces() {
  const res = await fetch("http://localhost:3001/api/workspaces");
  const data = await res.json();

  const list = document.getElementById("workspace-list");
  list.innerHTML = "<h3>Your Workspaces:</h3>";

  data.forEach((ws) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <strong>${ws.workspaceName}</strong> ($${ws.price})<br>
      Type: ${ws.type}, Capacity: ${ws.capacity}<br>
      Smoking Allowed: ${ws.smokingAllowed ? "Yes" : "No"}<br>
      Availability Date: ${ws.availabilityDate || "N/A"}<br>
      Lease Term: ${ws.leaseTerm || "N/A"}
      <hr>
    `;

    list.appendChild(div);
  });
}

