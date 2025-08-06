document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get form values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const role = document.querySelector('input[name="role"]:checked')?.id;
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();

  // Basic validation
  if (!email || !password || !role) {
    alert("Please fill out all required fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role, firstName, lastName, phoneNumber }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful! You can now log in.");
      window.location.href = "login.html"; // Redirect to login page
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    alert("Server error. Please try again later.");
  }
});

