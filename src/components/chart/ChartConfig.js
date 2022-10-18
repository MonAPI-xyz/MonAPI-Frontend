import { h } from 'preact';

function ChartConfig(title, labels, data, backgroundColor, y_scale_config) {
  return {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: data,
        backgroundColor: backgroundColor,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        minBarLength: 5,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          color: 'black',
          text: title,
          align: 'start',
          font: {
            weight: 'bold',
            size: 25,
            family: 'Open Sans',
          },
          padding: {
            top: 10,
            bottom: 30
          }
        },
        legend: {
          display: false
        },
      },
      scales: {
        y: y_scale_config,
        x: {
          display: false
        },
      }
    },
  };
}

export default ChartConfig;