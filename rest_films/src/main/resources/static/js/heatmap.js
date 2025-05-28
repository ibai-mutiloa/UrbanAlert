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
        0.5 // intensidad base; podrías variarla según gravedad si tienes ese dato
      ]);

      // Crear capa de calor
      L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 17,
        gradient: {
          0.1: 'blue',
          0.3: 'lime',
          0.6: 'orange',
          0.9: 'red'
        }
      }).addTo(map);
    })
    .catch(err => console.error('Error cargando datos de crimen:', err));
});
