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
      <p class="text-gray-700 mb-1"><strong>Name:</strong> ${ws.workspaceName}</p>
      <p class="text-gray-700 mb-1"><strong>Type:</strong> ${ws.type}</p>
      <p class="text-gray-700 mb-1"><strong>Capacity:</strong> ${ws.capacity}</p>
      <p<p class="text-gray-700 mb-1"><strong>Availability:</strong> ${new Date(ws.availabilityTerm).toISOString().split('T')[0]}</p>
      <p class="text-gray-700 mb-1"><strong>Lease Term:</strong> ${ws.leaseTerm}</p>
      <p class="text-gray-700 mb-1"><strong>Lease Term:</strong> ${ws.price}</p>
    `;

    <button className="book-btn bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        data-id="${ws._id}">
        Book Workspace
    </button>
    container.appendChild(card);

    document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", handleBooking);
  });
  });
}
