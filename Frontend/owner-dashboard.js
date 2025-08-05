document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.sidebar button');
  const dashboardContent = document.querySelector('.dashboard-content');

  // Content for each section
  const contentMap = {
    "Overview": `
      <h2>Overview</h2>
      <section class="overview-stats">
        <h3>Overview Stats</h3>
        <div class="stat-grid">
          <div class="stat-card"><p>Total Properties: <strong>3</strong></p></div>
          <div class="stat-card"><p>Active Workspaces: <strong>2</strong></p></div>
          <div class="stat-card"><p>Pending Request: <strong>1</strong></p></div>
          <div class="stat-card"><p>Average Rating: <strong>4.7 ⭐</strong></p></div>
        </div>
      </section>
    `,
    "Properties": `
      <h2>Properties</h2>
      <p>Here you can manage your listed workspaces.</p>
      <div class="content-blocks">
        <div class="block"></div>
        <div class="block"></div>
      </div>
    `,
    "Booking Request": `
      <h2>Booking Requests</h2>
      <p>All incoming booking requests will be displayed here.</p>
    `,
    "Reviews & Rating": `
      <h2>Reviews & Rating</h2>
      <p>Read feedback from your customers and manage reviews.</p>
    `,
    "Account Settings": `
      <h2>Account Settings</h2>
      <p>Manage your personal account information and preferences here.</p>
    `
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content
      const sectionTitle = btn.textContent.trim();
      dashboardContent.innerHTML = contentMap[sectionTitle] || `<h2>${sectionTitle}</h2><p>Content not available.</p>`;
    });
  });
});
