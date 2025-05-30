// chart.js
document.addEventListener('DOMContentLoaded', function () {
  fetchCrimeDataAndRenderChart();
  fetchCrimeDataAndRenderChartLastYear();
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

  if (window.crimeChartInstance1) {
    window.crimeChartInstance1.destroy();
  }

  window.crimeChartInstance1 = new Chart(ctx, {
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
function fetchCrimeDataAndRenderChartLastYear() {
  fetch('crimeservice/all')
    .then(response => response.json())
    .then(data => {
      const currentYear = new Date().getFullYear().toString();
      const countByCategory = {};

      data.forEach(crime => {
        if (crime.month && crime.month.startsWith(currentYear)) {
          const category = crime.category.toLowerCase();
          countByCategory[category] = (countByCategory[category] || 0) + 1;
        }
      });

      const labels = Object.keys(countByCategory);
      const values = Object.values(countByCategory);
      renderChart2(labels, values);
    })
    .catch(err => console.error('Error al cargar crímenes para gráficos:', err));
}

function renderChart2(labels, values) {
  const ctx = document.getElementById('crimeChartYear')?.getContext('2d');
  if (!ctx) return;

  if (window.crimeChartInstance2) {
    window.crimeChartInstance2.destroy();
  }

  window.crimeChartInstance2 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Delitos en el último año',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}
