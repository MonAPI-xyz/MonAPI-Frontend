import { h } from 'preact';
import { createRef } from 'preact';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'preact/hooks';

const SuccessRatePercentageChart = ({data}) => {
  const [chart, setChart] = useState(null);

  if (data == undefined) {
    return (<div></div>)
  }

  const chartRef = createRef()

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chart != null) { chart.destroy() }

    const colors=[];
    for (let i=0; i < data.length; i++) {
      if (data[i] > 0.5) {
        colors[i] = "#36CB72";
      } else {
        colors[i] = "#CB5136";
      }
    }

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data,
        datasets: [{
          label: "Success Rate Percentage Chart",
          data: data,
          backgroundColor: colors,
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
            text: 'Success Rate',
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
            max: 1,
            ticks: {
              format: {
                  style: 'percent'
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
  }, [])

  return (
    <canvas
      role='successRatePercentageChart'
      id="successRatePercentageChartId"
      ref={chartRef}
    />
  )
}

export default SuccessRatePercentageChart;