
const profiles = [
  {
    id: 1,
    name: "Rushikesh Pawar",
    photo: "images/rushi.jpg",
    description: "Software Engineer from Pune",
    location: { lat: 18.5204, lng: 73.856726 },
  },
  {
    id: 2,
    name: "Athrva Ingle",
    photo: "images/atharva.jpg",
    description: "HR from mumbai",
    location: { lat: 19.0760, lng: 72.8777 },
  },
  {
    id: 3,
    name: "Sakshi Kadam",
    photo: "images/sakshi.jpg",
    description: "Product Manager from new delhi",
    location: { lat: 28.6139, lng: 77.2088  },
  },
];

let map; 
let markers = []; 


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
  });
}


function renderProfiles(filteredProfiles) {
  const profilesSection = document.getElementById("profiles-section");
  profilesSection.innerHTML = "";

  filteredProfiles.forEach((profile) => {
    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";

    profileCard.innerHTML = `
      <img src="${profile.photo}" alt="${profile.name}" class="profile-photo" />
      <h3>${profile.name}</h3>
      <p>${profile.description}</p>
      <div class="profile-buttons">
        <button onclick="showSummary(${profile.id})">Summary</button>
        <button onclick="showDetails(${profile.id})">Details</button>
      </div>
    `;

    profilesSection.appendChild(profileCard);
  });
}


function showSummary(profileId) {
  const profile = profiles.find((p) => p.id === profileId);
  if (profile) {
    const { location } = profile;

    
    markers.forEach((marker) => marker.setMap(null));
    markers = [];

 
    const marker = new google.maps.Marker({
      position: location,
      map,
      title: profile.name,
    });
    markers.push(marker);

    
    map.setCenter(location);
    map.setZoom(10);
  }
}


function showDetails(profileId) {
  const profile = profiles.find((p) => p.id === profileId);
  alert(`Details for ${profile.name}: ${JSON.stringify(profile)}`);
}


document.getElementById("search-bar").addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm)
  );
  renderProfiles(filteredProfiles);
});


document.addEventListener("DOMContentLoaded", () => {
  initMap();
  renderProfiles(profiles);
});