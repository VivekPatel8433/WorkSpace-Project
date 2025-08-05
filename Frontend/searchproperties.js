// ------------------ Workspace Data ------------------
const mockData = [
  {
    id: 1,
    name: "Downtown Hub",
    location: "Calgary",
    type: "coworking",
    amenities: ["wifi", "parking, meeting room"],
    lat: 51.045, lng: -114.057,
    image: "images/downtown-hub.jpg",
    description: "A vibrant coworking space in the heart of Calgary's downtown core. Perfect for entrepreneurs and remote teams."
  },
  {
    id: 2,
    name: "Oceanview Desk",
    location: "Toronto",
    type: "studio",
    amenities: ["wifi"],
    lat: 43.6532, lng: -79.3832,
    image: "images/oceanview-desk.jpg",
    description: "Bright and breezy studio space with views of Lake Ontario. Ideal for designers and creatives."
  },
  {
    id: 3,
    name: "Suburban Studio",
    location: "Calgary",
    type: "studio",
    amenities: ["parking"],
    lat: 51.0501, lng: -114.0853,
    image: "images/suburban-studio.jpg",
    description: "A quiet retreat in the suburbs with flexible layout options and ample natural light."
  }
];

// ------------------ Dynamic Buttons ------------------
let selectedType = "";

document.addEventListener("DOMContentLoaded", () => {
  const searchButtonContainer = document.querySelector(".search_button");
  const workspaceTypes = [
    { label: "Coworking", value: "coworking" },
    { label: "Studio", value: "studio" },
    { label: "Day Office", value: "dayoffice" }
  ];

  workspaceTypes.forEach(type => {
    const button = document.createElement("button");
    button.textContent = type.label;
    button.value = type.value;
    searchButtonContainer.appendChild(button);
  });

  searchButtonContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      selectedType = event.target.value;

      // Highlight active button
      document.querySelectorAll(".search_button button").forEach(btn =>
        btn.classList.remove("active")
      );
      event.target.classList.add("active");

      filterResults();
    }
  });

  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    filterResults();
  });

  initMap();
});

// ------------------ Filter & Results ------------------
function filterResults() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const location = document.getElementById("location").value;
  const wifiChecked = document.querySelector('input[name="wifi"]').checked;
  const parkingChecked = document.querySelector('input[name="parking"]').checked;

  const results = mockData.filter(item => {
    const matchText = item.name.toLowerCase().includes(query);
    const matchType = !selectedType || item.type === selectedType;
    const matchLocation = !location || item.location === location;
    const matchWifi = !wifiChecked || item.amenities.includes("wifi");
    const matchParking = !parkingChecked || item.amenities.includes("parking");
    return matchText && matchType && matchLocation && matchWifi && matchParking;
  });

  renderResults(results);
  updateMap(results);
}

function renderResults(data) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (data.length === 0) {
    resultsContainer.innerHTML = "<p>No workspaces match your search.</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Type:</strong> ${item.type}</p>
      <p><strong>Amenities:</strong> ${item.amenities.join(", ")}</p>
    `;
    resultsContainer.appendChild(card);
  });
}

// ------------------ Google Map Integration ------------------
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.0447, lng: -114.0719 }, // Default center: Calgary
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
// ------------------ Images stuff------------------
function renderResults(data) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (data.length === 0) {
    resultsContainer.innerHTML = "<p>No workspaces match your search.</p>";
    return;
  }

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="workspace-image" />
      <h3>${item.name}</h3>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Type:</strong> ${item.type}</p>
      <p><strong>Amenities:</strong> ${item.amenities.join(", ")}</p>
      <p>${item.description}</p>
    `;
    resultsContainer.appendChild(card);
  });
}