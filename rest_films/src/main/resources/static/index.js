document.addEventListener('DOMContentLoaded', function () {
  const btnLondres = document.getElementById('btn-londres');
  const inicio = document.getElementById('inicio');
  const mapaContainer = document.getElementById('mapa-container');

  let map;
  let markers = new Map(); // guardamos marcadores por ID para evitar duplicados

  // Definimos iconos personalizados para cada categoría
  const icons = {
    'theft': L.icon({
      iconUrl: 'icons/robo-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    }),
    'asalto': L.icon({
      iconUrl: 'icons/asalto-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    }),
    'vandalismo': L.icon({
      iconUrl: 'icons/vandalismo-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    }),
    'default': L.icon({
      iconUrl: 'icons/default-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    })
  };

  btnLondres.addEventListener('click', function () {
    inicio.style.display = 'none';
    mapaContainer.style.display = 'block';

    map = L.map('map').setView([51.5074, -0.1278], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Carga inicial de crímenes
    fetchAndAddCrimes();

    // Cada 10 segundos vuelve a consultar el backend para buscar crímenes nuevos
    setInterval(fetchAndAddCrimes, 10000);
  });

  function fetchAndAddCrimes() {
    fetch('crimeservice/all')
      .then(response => response.json())
      .then(crimes => {
        crimes.forEach(crime => {
          if (!markers.has(crime.id)) { // si no existe ya ese marcador
            // Elegimos icono según categoría o usamos default si no está definida
            const icon = icons[crime.category.toLowerCase()] || icons['default'];

            const marker = L.marker([crime.latitude, crime.longitude], { icon: icon })
              .addTo(map)
              .bindPopup(`<b>Categoría:</b> ${crime.category}<br><b>Fecha:</b> ${crime.month}`);

            markers.set(crime.id, marker);
          }
        });
      })
      .catch(err => console.error('Error fetching crimes:', err));
  }
});
