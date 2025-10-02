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
function renderWorkspaces(workspaces) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!workspaces.length) {
    container.innerHTML = "<p class='text-gray-500'>No properties found.</p>";
    return;
  }

  workspaces.forEach(ws => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md p-4 mb-6";

    card.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${ws.address}</h3>
      <p class="text-gray-700 mb-1"><strong>Type:</strong> ${ws.neighborhood}</p>
      <p class="text-gray-700 mb-1"><strong>Location:</strong> ${ws.sqft}</p>
      <p class="text-gray-700 mb-1"><strong>Price per day:</strong> $${ws.parking}</p>
      <p class="text-gray-700 mb-1"><strong>Capacity:</strong> ${ws.publicTransport} people</p>
      <p class="text-gray-700"><strong>Description:</strong> ${ws.description}</p>
    `;

    container.appendChild(card);
  });
}
