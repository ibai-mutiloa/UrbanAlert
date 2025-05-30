document.addEventListener('DOMContentLoaded', function () {
  let map = L.map('map').setView([51.5074, -0.1278], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let markers = new Map();

  // Iconos para crímenes (sin violación)
  const icons = {
    'robo': L.icon({ iconUrl: 'icons/robo-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'asalto': L.icon({ iconUrl: 'icons/asalto-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'vandalismo': L.icon({ iconUrl: 'icons/vandalismo-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'homicidio': L.icon({ iconUrl: 'icons/homicidio-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'fraude': L.icon({ iconUrl: 'icons/fraude-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'acoso': L.icon({ iconUrl: 'icons/acoso-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'default': L.icon({ iconUrl: 'icons/default-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })
  };

  // Icono para comentarios (nube/bocadillo)
  const commentIcon = L.icon({
    iconUrl: 'icons/comment-bubble-icon.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });

  function fetchAndAddCrimes() {
    fetch('crimeservice/all')
      .then(response => response.json())
      .then(crimes => {
        crimes.forEach(crime => {
          // Solo mostrar tipos que tenemos definidos en icons (sin violación)
          const tipo = crime.category.toLowerCase();
          if (icons[tipo] && !markers.has(crime.id)) {
            const marker = L.marker([crime.latitude, crime.longitude], { icon: icons[tipo] })
              .addTo(map)
              .bindPopup(`<b>Categoría:</b> ${crime.category}<br><b>Fecha:</b> ${crime.month}`);
            markers.set(crime.id, marker);
          }
        });
      })
      .catch(err => console.error('Error fetching crimes:', err));
  }

  function fetchAndAddComments() {
    fetch('/api/comments')
      .then(response => response.json())
      .then(comments => {
        comments.forEach(comment => {
          if (!markers.has(comment.id) && comment.latitude && comment.longitude) {
            // Icono de comentario siempre igual
            const marker = L.marker([comment.latitude, comment.longitude], { icon: commentIcon })
              .addTo(map)
              .bindPopup(`
                <b>Comentario:</b> ${comment.text}<br>
                <b>Tipo de delito:</b> ${comment.crimeType || 'No especificado'}<br>
                <b>Fecha:</b> ${comment.date || 'No especificada'}<br>
                <b>Valoración:</b> ${comment.rating || 'No disponible'}
              `);
            markers.set(comment.id, marker);
          }
        });
      })
      .catch(err => console.error('Error fetching comments:', err));
  }

  fetchAndAddCrimes();
  fetchAndAddComments();

  setInterval(fetchAndAddCrimes, 10000);
  setInterval(fetchAndAddComments, 10000);
});
