// ------------------ Workspace Data ------------------
const mockData = [
  {
    id: 1,
    name: "Downtown Hub",
    location: "Calgary",
    type: "coworking",
    amenities: ["wifi", "parking", "meeting room"],
    lat: 51.045,
    lng: -114.057,
    image: "img/benjamin-child-GWe0dlVD9e0-unsplash.jpg",
    description: "A vibrant coworking space in the heart of Calgary's downtown core. Perfect for entrepreneurs and remote teams."
  },
  {
    id: 2,
    name: "Oceanview Desk",
    location: "Toronto",
    type: "studio",
    amenities: ["wifi"],
    lat: 43.6532,
    lng: -79.3832,
    image: "img/alesia-kazantceva-VWcPlbHglYc-unsplash.jpg",
    description: "Bright and breezy studio space with views of Lake Ontario. Ideal for designers and creatives."
  },
  {
    id: 3,
    name: "Suburban Studio",
    location: "Calgary",
    type: "studio",
    amenities: ["parking"],
    lat: 51.0501,
    lng: -114.0853,
    image: "img/Suburban.jpg", 
    description: "A quiet retreat in the suburbs with flexible layout options and ample natural light."
  },
  {
    id: 4,
    name: "Urban Kitchen Lab",
    location: "Toronto",
    type: "dayoffice",
    amenities: ["kitchen", "wifi"],
    lat: 43.6515,
    lng: -79.3876,
    image: "img/jose-losada-DyFjxmHt3Es-unsplash.jpg",
    description: "A fully equipped kitchen workspace with modern appliances, designed for culinary startups and workshops."
  },
  {
    id: 5,
    name: "Midtown Meeting Spot",
    location: "Calgary",
    type: "coworking",
    amenities: ["meeting room"],
    lat: 51.0486,
    lng: -114.0708,
    image: "img/olena-bohovyk-dIMJWLx1YbE-unsplash.jpg",
    description: "Professional meeting rooms perfect for client presentations, team strategy sessions, and collaboration hubs."
  },
  {
    id: 6,
    name: "Greenhouse Desk",
    location: "Toronto",
    type: "studio",
    amenities: ["wifi", "kitchen", "parking"],
    lat: 43.6629,
    lng: -79.3957,
    image: "img/img2.jpg",
    description: "A plant-filled workspace with skylights and cozy corners, designed for wellness-minded creatives."
  },
  {
    id: 7,
    name: "Remote Outpost",
    location: "Calgary",
    type: "dayoffice",
    amenities: ["parking", "meeting room", "wifi"],
    lat: 51.0463,
    lng: -114.0719,
    image: "img/benjamin-child-GWe0dlVD9e0-unsplash.jpg",
    description: "A minimalist remote office setup with smart booking tools and professional ambiance for solo professionals."
  }
];

// ------------------ Dynamic Workspace Type Buttons ------------------

let selectedType = "";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".search_button").addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      selectedType = event.target.value;

      document.querySelectorAll(".search_button button").forEach(btn =>
        btn.classList.remove("bg-indigo-600", "text-white")
      );
      event.target.classList.add("bg-indigo-600", "text-white");

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
  const query = document.getElementById("searchInput").value.toLowerCase();
  const location = document.getElementById("location").value;
  const wifiChecked = document.querySelector('input[name="wifi"]').checked;
  const parkingChecked = document.querySelector('input[name="parking"]').checked;
  const kitchenChecked = document.querySelector('input[name="kitchen"]').checked;
  const meetingChecked = document.querySelector('input[name="meeting"]').checked;

  const results = mockData.filter(item => {
    const matchText = item.name.toLowerCase().includes(query);
    const matchType = !selectedType || item.type === selectedType;
    const matchLocation = !location || item.location === location;
    const matchWifi = !wifiChecked || item.amenities.includes("wifi");
    const matchParking = !parkingChecked || item.amenities.includes("parking");
    const matchKitchen = !kitchenChecked || item.amenities.includes("kitchen");
    const matchMeeting = !meetingChecked || item.amenities.includes("meeting room");

    return matchText && matchType && matchLocation && matchWifi && matchParking && matchKitchen && matchMeeting;
  });

  renderResults(results);
  updateMap(results);
}

// ------------------ Results Renderer ------------------
function renderResults(data) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (data.length === 0) {
    resultsContainer.innerHTML = "<p>No workspaces match your search.</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "bg-white shadow rounded-md p-4 space-y-2 transition hover:scale-105";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover rounded-md mb-2" />
      <h3 class="text-lg font-bold">${item.name}</h3>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Type:</strong> ${item.type}</p>
      <p><strong>Amenities:</strong> ${item.amenities.join(", ")}</p>
      <p class="text-gray-700 text-sm">${item.description}</p>
    `;
    resultsContainer.appendChild(card);
  });
}

// ------------------ Map Integration ------------------
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.0447, lng: -114.0719 },
    zoom: 12
  });

  updateMap(mockData);
}

function updateMap(data) {
  if (!map) return;

  map.setCenter({ lat: 51.0447, lng: -114.0719 });

  data.forEach(item => {
    if (item.lat && item.lng) {
      new google.maps.Marker({
        position: { lat: item.lat, lng: item.lng },
        map,
        title: item.name
      });
    }
  });
}
