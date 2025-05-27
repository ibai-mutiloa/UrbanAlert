document.addEventListener('DOMContentLoaded', function () {
  const btnLondres = document.getElementById('btn-londres');
  const linkGrafikak = document.getElementById('link-grafikak');
  const inicio = document.getElementById('inicio');
  const mapaContainer = document.getElementById('mapa-container');
  const grafikak = document.getElementById('grafikak');

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

  // Botón Londres: mostrar mapa
  btnLondres.addEventListener('click', function () {
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

            const marker = L.marker([crime.latitude, crime.longitude], { icon: icon })
              .addTo(map)
              .bindPopup(`<b>Categoría:</b> ${crime.category}<br><b>Fecha:</b> ${crime.month}`);

            markers.set(crime.id, marker);
          }
        });
      })
      .catch(err => console.error('Error fetching crimes:', err));
  }

  // Sección de Gráficos: mostrar estadística de crímenes
  linkGrafikak.addEventListener('click', function (e) {
    e.preventDefault();
    inicio.style.display = 'none';
    mapaContainer.style.display = 'none';
    grafikak.style.display = 'block';

    fetchCrimeDataAndRenderChart();
  });

  function fetchCrimeDataAndRenderChart() {
    fetch('crimeservice/all')
      .then(response => response.json())
      .then(data => {
        const countByCategory = {};

        data.forEach(crime => {
          const category = crime.category.toLowerCase();
          countByCategory[category] = (countByCategory[category] || 0) + 1;
        });

        const labels = Object.keys(countByCategory);
        const values = Object.values(countByCategory);

        renderChart(labels, values);
      })
      .catch(err => console.error('Error al cargar crímenes para gráficos:', err));
  }

  function renderChart(labels, values) {
    const ctx = document.getElementById('crimeChart').getContext('2d');

    if (window.crimeChartInstance) {
      window.crimeChartInstance.destroy();
    }

    window.crimeChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Número de delitos por tipo',
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
});
