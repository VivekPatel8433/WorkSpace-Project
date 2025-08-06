// // Headers & Footers 

// document.addEventListener("DOMContentLoaded" , () =>  {
//     fetch('../file/headers.html')
//     .then(res => res.text())
//     .then(data => {
//         document.getElementById("loginPageHeader").innerHTML = data;
//     });

//      fetch('../file/footers.html')
//      .then(res => res.text())
//      .then(data => {
//         document.getElementById("loginPageFooter").innerHTML = data;
//     });
// })

// document.addEventListener("DOMContentLoaded" , () =>  {
//     fetch('../file/headers.html')
//     .then(res => res.text())
//     .then(data => {
//         document.getElementById("loginPageHeader").innerHTML = data;
//     });

//      fetch('../file/footers.html')
//      .then(res => res.text())
//      .then(data => {
//         document.getElementById("loginPageFooter").innerHTML = data;
//     });
// })

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  
  // Get role from radio buttons
  const roleRadios = document.getElementsByName("role");
  let selectedRole = null;
  for (const radio of roleRadios) {
    if (radio.checked) {
      selectedRole = radio.id;  // Assuming id="owner" or "co-worker"
      break;
    }
  }

  if (!email || !password || !selectedRole) {
    alert("Please enter email, password, and select a role.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Check if role matches the selected role
      if (data.role === selectedRole) {
        if (data.role === "owner") {
          window.location.href = "/owner-dashboard.html";
        } else if (data.role === "co-worker") {
          window.location.href = "/coworker.html";
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
