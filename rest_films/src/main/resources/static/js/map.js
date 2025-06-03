document.addEventListener('DOMContentLoaded', function () {
  let map = L.map('map').setView([51.5074, -0.1278], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let markers = new Map();
  let currentFilter = 'todos';

  const icons = {
    'robo': L.icon({ iconUrl: 'icons/robo-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'asalto': L.icon({ iconUrl: 'icons/asalto-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'vandalismo': L.icon({ iconUrl: 'icons/vandalismo-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'homicidio': L.icon({ iconUrl: 'icons/homicidio-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'fraude': L.icon({ iconUrl: 'icons/fraude-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'acoso': L.icon({ iconUrl: 'icons/acoso-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
    'default': L.icon({ iconUrl: 'icons/default-icon.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })
  };

  const commentIcon = L.icon({
    iconUrl: 'icons/comment-bubble-icon.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });

  function clearMarkers() {
    markers.forEach(marker => {
      map.removeLayer(marker);
    });
    markers.clear();
  }

  function fetchAndAddData() {
    clearMarkers();

    // Cargar crímenes
    fetch('crimeservice/all')
      .then(response => response.json())
      .then(crimes => {
        crimes.forEach(crime => {
          const tipo = crime.category.toLowerCase();
          if (
            icons[tipo] &&
            (currentFilter === 'todos' || currentFilter === tipo)
          ) {
            const marker = L.marker([crime.latitude, crime.longitude], { icon: icons[tipo] })
              .addTo(map)
              .bindPopup(`<b>Categoría:</b> ${crime.category}<br><b>Fecha:</b> ${crime.month}`).on('popupopen', function() {
                if (window._paq) {
                  _paq.push(['trackEvent', 'Mapa', 'Abrir popup crimen', crime.category]);
                }
              });
            markers.set('crime_' + crime.id, marker);
          }
        });
      })
      .catch(err => console.error('Error fetching crimes:', err));

      // Cargar comentarios
      fetch('/api/comments')
        .then(response => response.json())
        .then(comments => {
          comments.forEach(comment => {
            if (comment.latitude && comment.longitude) {
              const marker = L.marker([comment.latitude, comment.longitude], { icon: commentIcon })
                .addTo(map)
                .bindPopup(`
                  <b>Comentario:</b> ${comment.text}<br>
                  <b>Tipo de delito:</b> ${comment.crimeType || 'No especificado'}<br>
                  <b>Fecha:</b> ${comment.date || 'No especificada'}<br>
                  <b>Valoración:</b> ${comment.rating || 'No disponible'}
                `)
                .on('popupopen', function () {
                  if (window._paq) {
                    _paq.push(['trackEvent', 'Mapa', 'Abrir popup comentario', comment.crimeType || 'No especificado']);
                  }
                });

              markers.set('comment_' + comment.id, marker);
            }
          });
        })
        .catch(err => console.error('Error fetching comments:', err));

  }

  // Filtro de tipo de crimen
  const filterSelect = document.getElementById('crimeFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', function () {
      currentFilter = this.value;
        _paq.push(['trackEvent', 'Filtro de crimen', 'Seleccionado', currentFilter]);
      fetchAndAddData();
    });
  }

      const tipoUsuario = localStorage.getItem('usuarioTipo');
    if (tipoUsuario) {
      _paq.push(['setCustomDimension', 1, tipoUsuario]); // Asegúrate de haber creado esta dimensión en Matomo
    }


  // Inicializar y actualizar cada 10 segundos
  fetchAndAddData();
  setInterval(fetchAndAddData, 10000);
});
