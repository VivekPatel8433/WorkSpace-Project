function handleLoginSuccess(user, token) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  localStorage.setItem("jwtToken", token); // store JWT for authenticated requests
  alert("Login successful! Welcome");
}

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Get role from radio buttons
  const roleRadios = document.getElementsByName("role");
  let selectedRole = null;
  for (const radio of roleRadios) {
    if (radio.checked) {
      selectedRole = radio.id;
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
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.role === selectedRole) {
        // Save user info in localStorage
         handleLoginSuccess(
          { email: data.email, firstName: data.firstName, role: data.role },
          data.token
        );

        if (data.role === "owner") {
          window.location.href = "https://vivekpatel8433.github.io/WorkSpace-Project/owner-dashboard.html";
        } else if (data.role === "co-worker") {
          window.location.href =
            "https://vivekpatel8433.github.io/WorkSpace-Project/coworker-dashboard.html";
        }
      } else {
        alert("Role does not match the registered role for this user.");
      }
    } else {
      alert(data.message || "Invalid credentials");
    }
  } catch (err) {
    alert("Server error. Please try again later.");
  }
});
