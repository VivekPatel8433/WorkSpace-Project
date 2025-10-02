document.addEventListener("DOMContentLoaded", async () => {
  const resultsContainer = document.getElementById("results");

  try {
    // Fetch all properties (public)
    const res = await fetch("https://workspace-project.onrender.com/api/workspaces/all"); // public route
    if (!res.ok) throw new Error("Failed to fetch workspaces");

    const workspaces = await res.json();
    renderWorkspaces(workspaces);
  } catch (err) {
    console.error(err);
    resultsContainer.innerHTML = "<p class='text-red-500'>Error loading properties.</p>";
  }
});

// Function to render workspace cards
function renderWorkspaces(properties) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!properties.length) {
    container.innerHTML = "<p class='text-gray-500'>No properties found.</p>";
    return;
  }

  properties.forEach(property => {
    const propertyCard = document.createElement("div");
    propertyCard.className = "bg-white rounded-lg shadow-md p-4 mb-6";

    // Property details
    let html = `
      <h3 class="text-xl font-bold mb-2"><strong>Property</strong></h3>
      <p class="text-gray-700 mb-1"><strong>Address:</strong> ${property.address}</p>
      <p class="text-gray-700 mb-1"><strong>Neighbourhood:</strong> ${property.neighborhood}</p>
      <p class="text-gray-700 mb-1"><strong>Sqft:</strong> ${property.sqft}</p>
      <p class="text-gray-700 mb-1"><strong>Parking:</strong> ${property.parking ? "Yes" : "No"}</p>
      <p class="text-gray-700 mb-1"><strong>Public Transport:</strong> ${property.publicTransport}</p>
      <br>
      <h3 class="text-xl font-bold mb-2"><strong>Workspaces</strong></h3>
    `;

    // Loop through workspaces of this property
    property.workspaces.forEach(ws => {
      html += `
        <div class="border-t border-gray-200 mt-2 pt-2">
          <p class="text-gray-700 mb-1"><strong>Name:</strong> ${ws.name}</p>
          <p class="text-gray-700 mb-1"><strong>Type:</strong> ${ws.type}</p>
          <p class="text-gray-700 mb-1"><strong>Capacity:</strong> ${ws.capacity}</p>
          <p class="text-gray-700 mb-1"><strong>Availability-Term:</strong> ${ws.availabilityTerm}</p>
          <p class="text-gray-700 mb-1"><strong>Lease-Term:</strong> ${ws.leaseTerm}</p>
        </div>
      `;
    });

    propertyCard.innerHTML = html;
    container.appendChild(propertyCard);
  });
}
