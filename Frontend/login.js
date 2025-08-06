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

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  try {
   const response = await fetch("http//localhost:3001/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});


    const data = await response.json();

    if (response.ok) {
      // Redirect based on user role
      if (data.role === "owner") {
        window.location.href = "/owner-dashboard.html";
      } else if (data.role === "co-worker") {
        window.location.href = "/coworker.html";
      } else {
        alert("Unknown role");
      }
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    alert("Server error. Please try again later.");
  }
});
