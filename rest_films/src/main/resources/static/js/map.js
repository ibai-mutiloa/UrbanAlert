document.addEventListener('DOMContentLoaded', function () {
  let map = L.map('map').setView([51.5074, -0.1278], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let markers = new Map();

  const icons = {
    'theft': L.icon({ iconUrl: 'icons/robo-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'asalto': L.icon({ iconUrl: 'icons/asalto-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'vandalismo': L.icon({ iconUrl: 'icons/vandalismo-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'default': L.icon({ iconUrl: 'icons/default-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })
  };

  function fetchAndAddCrimes() {
    fetch('crimeservice/all')
      .then(response => response.json())
      .then(crimes => {
        crimes.forEach(crime => {
          if (!markers.has(crime.id)) {
            const icon = icons[crime.category.toLowerCase()] || icons['default'];
            const marker = L.marker([crime.latitude, crime.longitude], { icon })
              .addTo(map)
              .bindPopup(`<b>Categoría:</b> ${crime.category}<br><b>Fecha:</b> ${crime.month}`);
            markers.set(crime.id, marker);
          }
        });
      })
      .catch(err => console.error('Error fetching crimes:', err));
  }

  fetchAndAddCrimes();
  setInterval(fetchAndAddCrimes, 10000);
});
