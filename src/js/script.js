const fs = require('fs');
const path = require('path');

const data = [];
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: { labels: [], datasets: [{ label: 'Valori', data: [], backgroundColor: '#4e79a7' }] },
  options: { responsive: true, plugins: { legend: { display: false } } }
});

// Carica dati.csv
const filePath = path.join(__dirname, 'dati.csv');
fs.readFile(filePath, 'utf8', (err, text) => {
  if (err) {
    console.error('Errore lettura file:', err);
    return;
  }
  const lines = text.trim().split('\n');
  lines.shift(); // rimuove intestazione
  lines.forEach(line => {
    const [name, value] = line.split(',');
    if (name && value && !isNaN(parseFloat(value))) {
      data.push({ name: name.trim(), value: parseFloat(value) });
    }
  });
  updateTable();
  updateChart();
});

document.getElementById('addButton').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const value = parseFloat(document.getElementById('value').value);
  if (!name || isNaN(value)) return alert('Inserisci un nome e un valore valido.');

  data.push({ name, value });
  updateTable();
  updateChart();
  document.getElementById('name').value = '';
  document.getElementById('value').value = '';
});

document.getElementById('exportButton').addEventListener('click', () => {
  if (data.length === 0) return alert('Nessun dato da esportare!');
  let csv = 'Nome,Valore\n';
  data.forEach(d => {
    csv += `${d.name},${d.value}\n`;
  });
  fs.writeFile(filePath, csv, (err) => {
    if (err) return console.error('Errore salvataggio CSV:', err);
    alert('Dati salvati in dati.csv');
  });
});

function updateTable() {
  const tbody = document.querySelector('#data-table tbody');
  tbody.innerHTML = '';
  data.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.name}</td><td>${row.value}</td>`;
    tbody.appendChild(tr);
  });
}

function updateChart() {
  chart.data.labels = data.map(d => d.name);
  chart.data.datasets[0].data = data.map(d => d.value);
  chart.update();
}

