// Handle successful login
function handleLoginSuccess(user, token) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  localStorage.setItem("jwtToken", token); // store JWT for authenticated requests
  alert("Login successful! Welcome, " + user.firstName);
}

// Login form submit
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Get role from radio buttons
  const roleRadios = document.getElementsByName("role");
  let selectedRole = null;
  for (const radio of roleRadios) {
    if (radio.checked) {
      selectedRole = radio.id; // radio id = "owner" or "co-worker"
      break;
    }
  }

  if (!email || !password || !selectedRole) {
    alert("Please enter email, password, and select a role.");
    return;
  }

  try {
    const response = await fetch("https://workspace-project.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role: selectedRole }), // ✅ send role
    });

    const data = await response.json();

    if (response.ok) {
      // Save user info and token
      handleLoginSuccess(
        { email: data.email, firstName: data.firstName, role: data.role },
        data.token
      );

      // Redirect based on role
      if (data.role === "owner") {
        window.location.href = "https://vivekpatel8433.github.io/WorkSpace-Project/owner-dashboard.html";
      } else if (data.role === "co-worker") {
        window.location.href = "https://vivekpatel8433.github.io/WorkSpace-Project/coworker-dashboard.html";
      }
    } else {
      alert(data.message || "Invalid credentials or role mismatch");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Server error. Please try again later.");
  }
});
