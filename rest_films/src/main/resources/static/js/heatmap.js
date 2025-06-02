document.addEventListener('DOMContentLoaded', function () {
  const map = L.map('heatmap').setView([51.5074, -0.1278], 12); // Londres por defecto

  // Capa base del mapa
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Cargar los datos de crimen
  fetch('crimeservice/all')
    .then(response => response.json())
    .then(data => {
      const heatData = data.map(crime => [
        parseFloat(crime.latitude),
        parseFloat(crime.longitude),
        1.0 // intensidad aumentada
      ]);

      // Crear capa de calor mejorada
      L.heatLayer(heatData, {
        radius: 40,  // más grande
        blur: 10,    // menos desenfoque
        maxZoom: 17,
        max: 2.0,    // intensidad máxima ajustada
        gradient: {
          0.0: '#00ff00',  // Verde
          0.4: '#ffff00',  // Amarillo
          0.7: '#ff8000',  // Naranja
          1.0: '#ff0000'   // Rojo
        }
      }).addTo(map);
    })
    .catch(err => console.error('Error cargando datos de crimen:', err));
});
