import { createRef, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Chart from 'chart.js/auto';

const ResponseTimeChart = ({data}) => {
  const [chart, setChart] = useState(null);

  if (data == undefined) {
    return (<div></div>)
  }

  const chartRef = createRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chart != null) { chart.destroy() }

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data,
        datasets: [{
          label: "Response Time Chart",
          data: data,
          backgroundColor: "#36CB72",
          borderRadius: Number.MAX_VALUE,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
              display: true,
              color: 'black',
              text: 'Response Time',
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
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                  return value + " ms";
              }
            }
          },
          x: {
            display: false
          },
        }
      },
    });

    setChart(myChart);
  }, [data])

  return (
    <canvas
      role="responseTimeChart"
      id="responseTimeChartId"
      ref={chartRef}
    />
  )
}

export default ResponseTimeChart;