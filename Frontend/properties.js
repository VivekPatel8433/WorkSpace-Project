async function fetchProperties() {
  try {
    const res = await fetch("http://localhost:3001/api/properties");
    if (!res.ok) throw new Error("Failed to fetch properties");
    const properties = await res.json();

    const listDiv = document.getElementById("property-list");
    const propertySelect = document.getElementById("propertySelect");
    listDiv.innerHTML = "<h3>Your Properties:</h3>";
    propertySelect.innerHTML = '<option value="">Select a Property</option>';

    if (properties.length === 0) {
      listDiv.innerHTML += "<p>No properties found.</p>";
      document.getElementById("workspaceForm").style.display = "none";
      return;
    }

    // Populate property list and dropdown
    properties.forEach((p, i) => {
      // Show in list
      const div = document.createElement("div");
      div.innerHTML = `
        <p><strong>${i + 1}. ${p.address}</strong></p>
        <p>Neighborhood: ${p.neighborhood}</p>
        <p>Size: ${p.sqft} sqft</p>
        <p>Parking: ${p.parking ? "Yes" : "No"}</p>
        <p>Public Transport: ${p.publicTransport ? "Yes" : "No"}</p>
        <hr />
      `;
      listDiv.appendChild(div);

      // Add to dropdown, using property id or index as value
      const option = document.createElement("option");
      option.value = p.id || i; // fallback if no id
      option.textContent = `${p.address} (${p.neighborhood})`;
      propertySelect.appendChild(option);
    });

    // Show workspace form because properties exist
    document.getElementById("workspaceForm").style.display = "block";

  } catch (error) {
    console.error("Error fetching properties:", error);
    alert("Could not load properties.");
  }
}

document.getElementById("property-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const newProperty = {
    address: form.address.value,
    neighborhood: form.neighborhood.value,
    sqft: parseInt(form.sqft.value),
    parking: form.parking.checked,
    publicTransport: form.publicTransport.checked,
  };

  try {
    const res = await fetch("http://localhost:3001/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    });

    if (res.ok) {
      alert("Property added!");
      form.reset();
      fetchProperties(); // Refresh list and dropdown
    } else {
      alert("Failed to add property.");
    }
  } catch (error) {
    alert("Error adding property.");
    console.error(error);
  }
});

// Call fetchProperties on page load to initialize
document.addEventListener("DOMContentLoaded", fetchProperties);
