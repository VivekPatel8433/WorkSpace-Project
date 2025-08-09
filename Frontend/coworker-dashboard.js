document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".sidebar button");
  const mainContent = document.querySelector(".main-content");

  // Ensure mainContent exists
  if (!mainContent || buttons.length === 0) return;

  // Content map for each sidebar section
  const contentMap = {
    "Search Spaces": `
    <a href="searchproperties.html" class="btn">Go to Full Search Page</a>
    `,
    "Saved Spaces": `
      <h2>Saved Spaces</h2>
      <p>Your saved coworking spaces will appear here.</p>
      <div class="content-blocks">
        <div class="block"></div>
        <div class="block"></div>
      </div>
    `,
    Bookings: `
      <h2>Bookings</h2>
      <p>Manage your booking requests and history.</p>
      <div id="bookingsContainer"></div>
      <div class="booking-card">
        <h3>Booked Space</h3>
        <p>Date: 01/08/2025</p>
        <div class="actions">
          <button>Cancel</button>
          <button>Reschedule</button>
        </div>
      </div>
    `,
    "Reviews & Rating": `
      <h2>Reviews & Rating</h2>
      <div class="review">
        <p>★★★★☆</p>
        <p>"Great space and fast internet!"</p>
      </div>
    `,
    "Account Settings": `
      <h2>Account Settings</h2>
      <p>Manage your personal account information and preferences here.</p>
    `,
  };

  // Button click handler
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove 'active' class from all
      buttons.forEach((b) => b.classList.remove("active"));
      // Add 'active' to clicked
      button.classList.add("active");

      // Load content by button text
      const section = button.textContent.trim();
      if (section === "Bookings") {
        loadBookings();
      } else {
        mainContent.innerHTML =
          contentMap[section] ||
          `<h2>${section}</h2><p>No content available.</p>`;
      }
    });
  });
});

function loadBookings() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    alert("Please login first");
    return;
  }

  fetch("https://workspace-project.onrender.com/api/bookings")
    .then((res) => res.json())
    .then((bookings) => {
      // Filter bookings by logged-in user's email
      const userBookings = bookings.filter(
        (b) => b.userEmail === loggedInUser.email
      );

      const mainContent = document.querySelector(".main-content");
      if (!mainContent) return;

      if (userBookings.length === 0) {
        mainContent.innerHTML = "<h2>Bookings</h2><p>No bookings found.</p>";
        return;
      }

      let html = "<h2>Bookings</h2>";
      userBookings.forEach((booking) => {
        html += `
          <div class="booking-card">
            <h3>Workspace ID: ${booking.workspaceId}</h3>
            <p>Date: ${new Date(booking.date).toLocaleString()}</p>
            <p>User Email: ${booking.userEmail}</p>
            <div class="actions">
              <button>Cancel</button>
              <button>Reschedule</button>
            </div>
          </div>
        `;
      });

      mainContent.innerHTML = html;
    })
    .catch((error) => {
      console.error("Failed to load bookings:", error);
      alert("Failed to load bookings.");
    });
}
