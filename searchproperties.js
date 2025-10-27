document.addEventListener("DOMContentLoaded", async () => {
  const resultsContainer = document.getElementById("results");

  try {
    const res = await fetch("https://workspace-project.onrender.com/api/workspaces/all"); // public route
    if (!res.ok) throw new Error("Failed to fetch workspaces");

    const workspaces = await res.json();
    renderWorkspaces(workspaces);
  } catch (err) {
    console.error(err);
    resultsContainer.innerHTML = "<p class='text-red-500'>Error loading workspaces.</p>";
  }
});

function renderWorkspaces(workspaces) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!workspaces.length) {
    container.innerHTML = "<p class='text-gray-500'>No workspaces found.</p>";
    return;
  }

  workspaces.forEach(ws => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md p-4 mb-6";

    // ✅ Safe date formatting
    let formattedDate = "Not specified";
    if (ws.availabilityTerm) {
      const dateObj = new Date(ws.availabilityTerm);
      if (!isNaN(dateObj)) {
        formattedDate = dateObj.toISOString().split("T")[0];
      }
    }

    card.innerHTML = `
      <p class="text-gray-700 mb-1"><strong>Name:</strong> ${ws.workspaceName}</p>
      <p class="text-gray-700 mb-1"><strong>Type:</strong> ${ws.type}</p>
      <p class="text-gray-700 mb-1"><strong>Capacity:</strong> ${ws.capacity}</p>
      <p class="text-gray-700 mb-1"><strong>Availability:</strong> ${formattedDate}</p>
      <p class="text-gray-700 mb-1"><strong>Lease Term:</strong> ${ws.leaseTerm}</p>
      <p class="text-gray-700 mb-4"><strong>Price:</strong> ${ws.price}</p>

      <button 
        class="book-btn bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
        data-id="${ws._id}">
        Book Workspace
      </button>
    `;

    container.appendChild(card);
  });

  // ✅ Add event listeners only once after all cards are rendered
  document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", handleBooking);
  });
}

// Booking logic
async function handleBooking(e) {
  const workspaceId = e.target.getAttribute("data-id");

  try {
    const res = await fetch(`https://workspace-project.onrender.com/api/workspaces/book/${workspaceId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coworker: "testUser" }) // replace with actual user later
    });

    if (!res.ok) throw new Error("Failed to book workspace");

    alert("Workspace booked successfully!");
  } catch (err) {
    console.error(err);
    alert("Error booking workspace.");
  }
}
