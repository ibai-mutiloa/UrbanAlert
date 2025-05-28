// index.js
document.addEventListener('DOMContentLoaded', function () {
  const btnLondres = document.getElementById('btn-londres');
  const linkGrafikak = document.getElementById('link-grafikak');
  const inicio = document.getElementById('inicio');
  const mapaContainer = document.getElementById('mapa-container');
  const grafikak = document.getElementById('grafikak');

  let map;
  let markers = new Map();

  const icons = {
    'theft': L.icon({ iconUrl: 'icons/robo-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'asalto': L.icon({ iconUrl: 'icons/asalto-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'vandalismo': L.icon({ iconUrl: 'icons/vandalismo-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'default': L.icon({ iconUrl: 'icons/default-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })
  };

  btnLondres?.addEventListener('click', () => {
    inicio.style.display = 'none';
    mapaContainer.style.display = 'block';
    grafikak.style.display = 'none';

    map = L.map('map').setView([51.5074, -0.1278], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    fetchAndAddCrimes();
    setInterval(fetchAndAddCrimes, 10000);
  });

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

  linkGrafikak?.addEventListener('click', function (e) {
    e.preventDefault();
    inicio.style.display = 'none';
    mapaContainer.style.display = 'none';
    grafikak.style.display = 'block';

    // Llamada a la función que está en chart.js
    if (typeof fetchCrimeDataAndRenderChart === 'function') {
      fetchCrimeDataAndRenderChart();
    }
  });
});
