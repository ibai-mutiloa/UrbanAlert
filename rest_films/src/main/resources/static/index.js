
    document.addEventListener('DOMContentLoaded', function () {
        const btnLondres = document.getElementById('btn-londres');
        const inicio = document.getElementById('inicio');
        const mapaContainer = document.getElementById('mapa-container');
  
        btnLondres.addEventListener('click', function () {
          // Oculta la pantalla de inicio y muestra el mapa
          inicio.style.display = 'none';
          mapaContainer.style.display = 'block';
  
          // Inicializa el mapa centrado en Londres
          const map = L.map('map').setView([51.5074, -0.1278], 10);
  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);
  
          L.marker([51.5074, -0.1278])
            .addTo(map)
            .bindPopup('¡Hola desde Londres!')
            .openPopup();
        });
      });