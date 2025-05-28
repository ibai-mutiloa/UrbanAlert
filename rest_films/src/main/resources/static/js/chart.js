// chart.js
document.addEventListener('DOMContentLoaded', function () {
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
  const ctx = document.getElementById('crimeChart')?.getContext('2d');
  if (!ctx) return;

  if (window.crimeChartInstance) {
    window.crimeChartInstance.destroy();
  }

  window.crimeChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
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
      scales: { y: { beginAtZero: true } }
    }
  });
}
