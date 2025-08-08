// ------------------ Workspace Data ------------------
const mockData = [
  {
    id: 1,
    name: "Downtown Hub",
    location: "Calgary",
    address: "123 Stephen Ave SW, Calgary, AB",
    neighborhood: "Downtown Core",
    type: "coworking",
    amenities: ["wifi", "parking", "meeting room", "publicTransport"],
    lat: 51.045,
    lng: -114.057,
    image: "../img/benjamin-child-GWe0dlVD9e0-unsplash.jpg",
    description:
      "A vibrant coworking space in the heart of Calgary's downtown core. Perfect for entrepreneurs and remote teams.",
    squareFeet: 2500,
    capacity: 50,
    pricePerDay: 35,
    availableFrom: "2025-08-15",
    leaseTerms: ["daily", "weekly", "monthly"],
    smokingAllowed: false,
    owner: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (403) 555-0123",
      company: "Downtown Properties Ltd.",
    },
  },
  {
    id: 2,
    name: "Oceanview Desk",
    location: "Toronto",
    address: "456 Harbourfront Blvd, Toronto, ON",
    neighborhood: "Harbourfront",
    type: "studio",
    amenities: ["wifi", "publicTransport"],
    lat: 43.6532,
    lng: -79.3832,
    image: "../img/alesia-kazantceva-VWcPlbHglYc-unsplash.jpg",
    description:
      "Bright and breezy studio space with views of Lake Ontario. Ideal for designers and creatives.",
    squareFeet: 800,
    capacity: 8,
    pricePerDay: 45,
    availableFrom: "2025-08-20",
    leaseTerms: ["daily", "weekly"],
    smokingAllowed: false,
    owner: {
      name: "Michael Chen",
      email: "m.chen@oceanview.ca",
      phone: "+1 (416) 555-0456",
      company: "Oceanview Studios",
    },
  },
  {
    id: 3,
    name: "Suburban Studio",
    location: "Calgary",
    address: "789 Crowchild Trail NW, Calgary, AB",
    neighborhood: "Hillhurst",
    type: "studio",
    amenities: ["parking"],
    lat: 51.0501,
    lng: -114.0853,
    image: "../img/Suburban.jpg",
    description:
      "A quiet retreat in the suburbs with flexible layout options and ample natural light.",
    squareFeet: 1200,
    capacity: 15,
    pricePerDay: 25,
    availableFrom: "2025-08-10",
    leaseTerms: ["weekly", "monthly", "yearly"],
    smokingAllowed: true,
    owner: {
      name: "Jennifer Williams",
      email: "jen.williams@suburbanstudio.com",
      phone: "+1 (403) 555-0789",
      company: "Suburban Spaces Inc.",
    },
  },
  {
    id: 4,
    name: "Urban Kitchen Lab",
    location: "Toronto",
    address: "321 Queen St W, Toronto, ON",
    neighborhood: "Queen West",
    type: "dayoffice",
    amenities: ["kitchen", "wifi", "publicTransport"],
    lat: 43.6515,
    lng: -79.3876,
    image: "../img/jose-losada-DyFjxmHt3Es-unsplash.jpg",
    description:
      "A fully equipped kitchen workspace with modern appliances, designed for culinary startups and workshops.",
    squareFeet: 1500,
    capacity: 20,
    pricePerDay: 60,
    availableFrom: "2025-09-01",
    leaseTerms: ["daily", "weekly", "monthly"],
    smokingAllowed: false,
    owner: {
      name: "David Rodriguez",
      email: "david@urbankitchen.to",
      phone: "+1 (416) 555-0321",
      company: "Urban Kitchen Labs",
    },
  },
  {
    id: 5,
    name: "Midtown Meeting Spot",
    location: "Calgary",
    address: "555 17th Ave SW, Calgary, AB",
    neighborhood: "Beltline",
    type: "coworking",
    amenities: ["meeting room", "publicTransport"],
    lat: 51.0486,
    lng: -114.0708,
    image: "../img/olena-bohovyk-dIMJWLx1YbE-unsplash.jpg",
    description:
      "Professional meeting rooms perfect for client presentations, team strategy sessions, and collaboration hubs.",
    squareFeet: 3000,
    capacity: 75,
    pricePerDay: 40,
    availableFrom: "2025-08-25",
    leaseTerms: ["daily", "weekly", "monthly"],
    smokingAllowed: false,
    owner: {
      name: "Amanda Thompson",
      email: "amanda@midtownmeet.ca",
      phone: "+1 (403) 555-0654",
      company: "Midtown Meetings Co.",
    },
  },
  {
    id: 6,
    name: "Greenhouse Desk",
    location: "Toronto",
    address: "888 Bloor St W, Toronto, ON",
    neighborhood: "Annex",
    type: "studio",
    amenities: ["wifi", "kitchen", "parking", "publicTransport"],
    lat: 43.6629,
    lng: -79.3957,
    image: "../img/img2.jpg",
    description:
      "A plant-filled workspace with skylights and cozy corners, designed for wellness-minded creatives.",
    squareFeet: 1800,
    capacity: 25,
    pricePerDay: 50,
    availableFrom: "2025-08-12",
    leaseTerms: ["daily", "weekly", "monthly", "yearly"],
    smokingAllowed: false,
    owner: {
      name: "Lisa Park",
      email: "lisa@greenhousedesk.com",
      phone: "+1 (416) 555-0987",
      company: "Greenhouse Workspaces",
    },
  },
  {
    id: 7,
    name: "Remote Outpost",
    location: "Calgary",
    address: "999 Centre St N, Calgary, AB",
    neighborhood: "Eau Claire",
    type: "dayoffice",
    amenities: ["parking", "meeting room", "wifi", "smoking"],
    lat: 51.0463,
    lng: -114.0719,
    image: "../img/benjamin-child-GWe0dlVD9e0-unsplash.jpg",
    description:
      "A minimalist remote office setup with smart booking tools and professional ambiance for solo professionals.",
    squareFeet: 600,
    capacity: 5,
    pricePerDay: 30,
    availableFrom: "2025-08-08",
    leaseTerms: ["daily", "weekly"],
    smokingAllowed: true,
    owner: {
      name: "Robert Kim",
      email: "robert@remoteoutpost.ca",
      phone: "+1 (403) 555-0147",
      company: "Remote Solutions Ltd.",
    },
  },
];

// ------------------ Sanitization Functions ------------------
function sanitizeHTML(str) {
  if (typeof str !== "string") return "";
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
}

function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  return input.trim().replace(/[<>\"'&]/g, function (match) {
    switch (match) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#x27;";
      case "&":
        return "&amp;";
      default:
        return match;
    }
  });
}

function sanitizeNumber(input) {
  const num = parseInt(input);
  return isNaN(num) ? 0 : Math.max(0, num);
}

function sanitizeEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? email : "";
}

function sanitizePhone(phone) {
  // Remove all non-digit characters except +, -, (, ), and spaces
  return phone.replace(/[^\d\+\-\(\)\s]/g, "");
}

function validateDate(dateString) {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date) ? dateString : "";
}

// ------------------ Dynamic Workspace Type Buttons ------------------

let selectedType = "";

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".search_button")
    .addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        selectedType = event.target.value;

        document
          .querySelectorAll(".search_button button")
          .forEach((btn) => btn.classList.remove("bg-gray-800", "text-white"));
        event.target.classList.add("bg-gray-800", "text-white");

        filterResults();
      }
    });

  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    filterResults();
  });

  document.getElementById("filtersSearchBtn").addEventListener("click", () => {
    filterResults();
  });

  initMap();
});

// ------------------ Filtering Logic ------------------
function filterResults() {
  // Sanitize all input values
  const query = sanitizeInput(
    document.getElementById("searchInput").value.toLowerCase()
  );
  const location = sanitizeInput(document.getElementById("location").value);

  // Address/Neighborhood filter
  const addressFilter = sanitizeInput(
    document.getElementById("addressFilter").value.toLowerCase()
  );

  // Square feet filter
  const minSqFt = sanitizeNumber(document.getElementById("minSqFt").value);
  const maxSqFt =
    sanitizeNumber(document.getElementById("maxSqFt").value) || Infinity;

  // Capacity filter
  const capacityFilter = sanitizeNumber(
    document.getElementById("capacityFilter").value
  );

  // Price filter
  const minPrice = sanitizeNumber(document.getElementById("minPrice").value);
  const maxPrice =
    sanitizeNumber(document.getElementById("maxPrice").value) || Infinity;

  // Availability date filter
  const availabilityDate = validateDate(
    document.getElementById("availabilityDate").value
  );

  // Lease term filter
  const leaseTerm = sanitizeInput(document.getElementById("leaseTerm").value);

  // Amenity filters
  const wifiChecked = document.querySelector('input[name="wifi"]').checked;
  const parkingChecked = document.querySelector(
    'input[name="parking"]'
  ).checked;
  const kitchenChecked = document.querySelector(
    'input[name="kitchen"]'
  ).checked;
  const meetingChecked = document.querySelector(
    'input[name="meeting"]'
  ).checked;
  const publicTransportChecked = document.querySelector(
    'input[name="publicTransport"]'
  ).checked;
  const smokingChecked = document.querySelector(
    'input[name="smoking"]'
  ).checked;

  const results = mockData.filter((item) => {
    // Text search (name, description)
    const matchText =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    // Type filter
    const matchType = !selectedType || item.type === selectedType;

    // Location filter
    const matchLocation = !location || item.location === location;

    // Address/Neighborhood filter
    const matchAddress =
      !addressFilter ||
      item.address.toLowerCase().includes(addressFilter) ||
      item.neighborhood.toLowerCase().includes(addressFilter);

    // Square feet filter
    const matchSqFt = item.squareFeet >= minSqFt && item.squareFeet <= maxSqFt;

    // Capacity filter
    const matchCapacity = !capacityFilter || item.capacity >= capacityFilter;

    // Price filter
    const matchPrice =
      item.pricePerDay >= minPrice && item.pricePerDay <= maxPrice;

    // Availability date filter
    const matchAvailability =
      !availabilityDate ||
      new Date(item.availableFrom) <= new Date(availabilityDate);

    // Lease term filter
    const matchLeaseTerm = !leaseTerm || item.leaseTerms.includes(leaseTerm);

    // Amenity filters
    const matchWifi = !wifiChecked || item.amenities.includes("wifi");
    const matchParking = !parkingChecked || item.amenities.includes("parking");
    const matchKitchen = !kitchenChecked || item.amenities.includes("kitchen");
    const matchMeeting =
      !meetingChecked || item.amenities.includes("meeting room");
    const matchPublicTransport =
      !publicTransportChecked || item.amenities.includes("publicTransport");
    const matchSmoking =
      !smokingChecked ||
      item.smokingAllowed ||
      item.amenities.includes("smoking");

    return (
      matchText &&
      matchType &&
      matchLocation &&
      matchAddress &&
      matchSqFt &&
      matchCapacity &&
      matchPrice &&
      matchAvailability &&
      matchLeaseTerm &&
      matchWifi &&
      matchParking &&
      matchKitchen &&
      matchMeeting &&
      matchPublicTransport &&
      matchSmoking
    );
  });

  renderResults(results);
  updateMap(results);
}

// ------------------ Results Renderer ------------------
function renderResults(data) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (data.length === 0) {
    resultsContainer.innerHTML =
      "<p class='text-center text-gray-500 py-8'>No workspaces match your search criteria.</p>";
    return;
  }

  // Create a single column container with wider cards
  const containerDiv = document.createElement("div");
  containerDiv.className = "space-y-6";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow-lg rounded-lg p-6 transition hover:scale-[1.02] cursor-pointer w-full";

    // Sanitize all data before displaying
    const sanitizedName = sanitizeHTML(item.name);
    const sanitizedLocation = sanitizeHTML(item.location);
    const sanitizedType = sanitizeHTML(item.type);
    const sanitizedAddress = sanitizeHTML(item.address);
    const sanitizedDescription = sanitizeHTML(item.description);
    const sanitizedAmenities = item.amenities
      .map((amenity) => sanitizeHTML(amenity))
      .join(", ");
    const sanitizedLeaseTerms = item.leaseTerms
      .map((term) => sanitizeHTML(term))
      .join(", ");
    const sanitizedPrice = sanitizeNumber(item.pricePerDay);
    const sanitizedCapacity = sanitizeNumber(item.capacity);
    const sanitizedSquareFeet = sanitizeNumber(item.squareFeet);
    const sanitizedAvailableFrom = validateDate(item.availableFrom);
    const sanitizedWorkspaceId = sanitizeNumber(item.id);

    card.innerHTML = `
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="lg:w-1/3">
            <img src="${sanitizeHTML(item.image)}" 
                alt="${sanitizedName}" 
                class="w-full h-48 lg:h-full object-cover rounded-md" 
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4='; this.onerror=null;" />
          </div>
          <div class="lg:w-2/3 space-y-4">
            <div class="flex justify-between items-start">
              <h3 class="text-2xl font-bold text-gray-800">${sanitizedName}</h3>
              <span class="text-2xl font-bold text-gray-800">$${sanitizedPrice}/day</span>
            </div>
            
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
              <p><strong>Location:</strong> ${sanitizedLocation}</p>
              <p><strong>Type:</strong> ${sanitizedType}</p>
              <p><strong>Capacity:</strong> ${sanitizedCapacity} people</p>
              <p><strong>Square Feet:</strong> ${sanitizedSquareFeet} sq ft</p>
              <p><strong>Available:</strong> ${
                sanitizedAvailableFrom
                  ? new Date(sanitizedAvailableFrom).toLocaleDateString()
                  : "N/A"
              }</p>
              <p><strong>Lease Terms:</strong> ${sanitizedLeaseTerms}</p>
            </div>
            
            <div class="space-y-2">
              <p><strong>Address:</strong> ${sanitizedAddress}</p>
              <p><strong>Amenities:</strong> ${sanitizedAmenities}</p>
              <p class="text-gray-700">${sanitizedDescription}</p>
            </div>
            
            <div class="flex justify-end gap-3">
              <button onclick="showOnMap(${sanitizedWorkspaceId})" 
                      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition font-semibold">
                View on Map
              </button>
              <button onclick="showWorkspaceDetails(${sanitizedWorkspaceId})" 
                      class="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 transition font-semibold">
                View Details
              </button>
            </div>
          </div>
        </div>
      `;
    containerDiv.appendChild(card);
  });

  resultsContainer.appendChild(containerDiv);
}

// ------------------ Workspace Details Modal ------------------
function showWorkspaceDetails(workspaceId) {
  const sanitizedId = sanitizeNumber(workspaceId);
  const workspace = mockData.find((item) => item.id === sanitizedId);
  if (!workspace) return;

  const modal = document.getElementById("workspaceModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  // Sanitize all workspace data
  const sanitizedName = sanitizeHTML(workspace.name);
  const sanitizedType = sanitizeHTML(workspace.type);
  const sanitizedLocation = sanitizeHTML(workspace.location);
  const sanitizedAddress = sanitizeHTML(workspace.address);
  const sanitizedNeighborhood = sanitizeHTML(workspace.neighborhood);
  const sanitizedDescription = sanitizeHTML(workspace.description);
  const sanitizedSquareFeet = sanitizeNumber(workspace.squareFeet);
  const sanitizedCapacity = sanitizeNumber(workspace.capacity);
  const sanitizedPrice = sanitizeNumber(workspace.pricePerDay);
  const sanitizedAvailableFrom = validateDate(workspace.availableFrom);
  const sanitizedLeaseTerms = workspace.leaseTerms
    .map((term) => sanitizeHTML(term))
    .join(", ");
  const sanitizedAmenities = workspace.amenities.map((amenity) =>
    sanitizeHTML(amenity)
  );

  // Sanitize owner information
  const sanitizedOwnerName = sanitizeHTML(workspace.owner.name);
  const sanitizedOwnerCompany = sanitizeHTML(workspace.owner.company);
  const sanitizedOwnerEmail = sanitizeEmail(workspace.owner.email);
  const sanitizedOwnerPhone = sanitizePhone(workspace.owner.phone);

  modalTitle.textContent = sanitizedName;

  modalContent.innerHTML = `
      <div class="space-y-6">
        <img src="${sanitizeHTML(workspace.image)}" 
            alt="${sanitizedName}" 
            class="w-full h-64 object-cover rounded-md" 
            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4='; this.onerror=null;" />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800">Workspace Details</h3>
            <div class="space-y-2 text-sm">
              <p><strong>Type:</strong> ${sanitizedType}</p>
              <p><strong>Location:</strong> ${sanitizedLocation}</p>
              <p><strong>Address:</strong> ${sanitizedAddress}</p>
              <p><strong>Neighborhood:</strong> ${sanitizedNeighborhood}</p>
              <p><strong>Square Feet:</strong> ${sanitizedSquareFeet} sq ft</p>
              <p><strong>Capacity:</strong> ${sanitizedCapacity} people</p>
              <p><strong>Price:</strong> $${sanitizedPrice} per day</p>
              <p><strong>Available From:</strong> ${
                sanitizedAvailableFrom
                  ? new Date(sanitizedAvailableFrom).toLocaleDateString()
                  : "N/A"
              }</p>
              <p><strong>Lease Terms:</strong> ${sanitizedLeaseTerms}</p>
              <p><strong>Smoking Allowed:</strong> ${
                workspace.smokingAllowed ? "Yes" : "No"
              }</p>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800">Owner Contact Information</h3>
            <div class="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
              <p><strong>Name:</strong> ${sanitizedOwnerName}</p>
              <p><strong>Company:</strong> ${sanitizedOwnerCompany}</p>
              <p><strong>Email:</strong> ${
                sanitizedOwnerEmail
                  ? `<a href="mailto:${sanitizedOwnerEmail}" class="text-gray-800 hover:underline">${sanitizedOwnerEmail}</a>`
                  : "N/A"
              }</p>
              <p><strong>Phone:</strong> ${
                sanitizedOwnerPhone
                  ? `<a href="tel:${sanitizedOwnerPhone}" class="text-gray-800 hover:underline">${sanitizedOwnerPhone}</a>`
                  : "N/A"
              }</p>
            </div>
            
            <div class="mt-4 flex gap-3">
              <button onclick="showOnMap(${sanitizedId})" 
                      class="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                View on Map
              </button>
              <button onclick="contactOwner('${sanitizedOwnerEmail}', '${sanitizedName}')" 
                      class="flex-1 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                      ${!sanitizedOwnerEmail ? "disabled" : ""}>
                Contact Owner
              </button>
            </div>
          </div>
        </div>
        
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-gray-800">Description</h3>
          <p class="text-gray-700">${sanitizedDescription}</p>
        </div>
        
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-gray-800">Amenities</h3>
          <div class="flex flex-wrap gap-2">
            ${sanitizedAmenities
              .map(
                (amenity) =>
                  `<span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">${amenity}</span>`
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

  modal.classList.remove("hidden");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("workspaceModal");
  modal.classList.add("hidden");
  modal.style.display = "none";
}

function contactOwner(email, workspaceName) {
  const sanitizedEmail = sanitizeEmail(email);
  const sanitizedWorkspaceName = sanitizeHTML(workspaceName);

  if (!sanitizedEmail) {
    alert("Invalid email address");
    return;
  }

  const subject = `Inquiry about ${sanitizedWorkspaceName}`;
  const body = `Hello,\n\nI'm interested in learning more about the ${sanitizedWorkspaceName} workspace. Could you please provide more information about availability and booking?\n\nThank you!`;
  window.location.href = `mailto:${sanitizedEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

// Add event listeners for modal
document.addEventListener("DOMContentLoaded", () => {
  // Existing event listeners
  document
    .querySelector(".search_button")
    .addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        selectedType = event.target.value;

        document
          .querySelectorAll(".search_button button")
          .forEach((btn) => btn.classList.remove("bg-gray-800", "text-white"));
        event.target.classList.add("bg-gray-800", "text-white");

        filterResults();
      }
    });

  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    filterResults();
  });

  document.getElementById("filtersSearchBtn").addEventListener("click", () => {
    filterResults();
  });

  // Modal event listeners
  document.getElementById("closeModal").addEventListener("click", closeModal);

  // Close modal when clicking outside
  document.getElementById("workspaceModal").addEventListener("click", (e) => {
    if (e.target.id === "workspaceModal") {
      closeModal();
    }
  });

  // Initialize with all results
  renderResults(mockData);
  initMap();
});

// ------------------ Map Integration ------------------
let map;
let markers = [];

function initMap() {
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    // Initialize Leaflet map centered on Calgary
    map = L.map("map").setView([51.0447, -114.0719], 10);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add markers for all workspaces
    updateMap(mockData);
  }
}

function updateMap(data) {
  // Clear existing markers
  markers.forEach((marker) => map.removeLayer(marker));
  markers = [];

  // Add new markers for each workspace
  data.forEach((workspace) => {
    if (workspace.lat && workspace.lng) {
      const marker = L.marker([workspace.lat, workspace.lng])
        .bindPopup(
          `
            <div class="p-2">
              <h3 class="font-bold text-lg">${workspace.name}</h3>
              <p class="text-sm text-gray-600">${workspace.type}</p>
              <p class="text-sm">${workspace.address}</p>
              <p class="font-semibold text-green-600">$${workspace.pricePerDay}/day</p>
              <button onclick="showWorkspaceDetails(${workspace.id})" 
                      class="mt-2 bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                View Details
              </button>
            </div>
          `
        )
        .addTo(map);

      markers.push(marker);
    }
  });

  console.log("Map updated with", data.length, "workspaces");
}

function showOnMap(workspaceId) {
  const workspace = mockData.find((item) => item.id === workspaceId);
  if (workspace && workspace.lat && workspace.lng) {
    // Center map on the workspace location
    map.setView([workspace.lat, workspace.lng], 15);

    // Find and open the corresponding marker popup
    const marker = markers.find((m) => {
      const markerLatLng = m.getLatLng();
      return (
        Math.abs(markerLatLng.lat - workspace.lat) < 0.001 &&
        Math.abs(markerLatLng.lng - workspace.lng) < 0.001
      );
    });

    if (marker) {
      marker.openPopup();
    }
  }
}
