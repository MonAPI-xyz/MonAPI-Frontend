import { createRef, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Chart from 'chart.js/auto';
import ChartComponent from '../ChartComponent';

const ResponseTimeChart = ({response_time}) => {
  const [chart, setChart] = useState(null);

  if (response_time == undefined) {
    return (<div></div>)
  }

  function responseTimeList(response_time) {
    const listOfNumber = []
    response_time.forEach(dict => {
      if (dict.avg === 0) {
        listOfNumber.push(-1)
      } else {
        listOfNumber.push(dict.avg)
      }
    });
    return listOfNumber
  }

  const chartRef = createRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chart != null) { chart.destroy() }

    const data = responseTimeList(response_time)
    const labels = data.slice()

    const colors=[];
    for (let i=0; i < data.length; i++) {
      if (data[i] === -1) {
        colors[i] = "grey";
        data[i] += 1;
        labels[i] = "No Data"
      } else {
        colors[i] = "#36CB72";
      }
    }

    const y_scale_option = {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
            return value + " ms";
        }
      }
    }
    
    const responseTimeChart = new Chart(ctx, ChartComponent("Response Time", labels, data, colors, y_scale_option))

    setChart(responseTimeChart);
  }, [response_time])

  return (
    <canvas
      role="responseTimeChart"
      id="responseTimeChartId"
      ref={chartRef}
    />
  )
}

export default ResponseTimeChart;