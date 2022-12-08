import { createRef, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Chart from 'chart.js/auto';
import "chartjs-adapter-date-fns";
import ChartConfig from '../ChartConfig';

const ResponseTimeChart = ({response_time, stepSizeInSecond}) => {
  const [chart, setChart] = useState(null);

  if (response_time == undefined) {
    return (<div />)
  }

  const parseISODateToChart = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const dt = date.getDate();
    const hour = date.getHours();
    const minute =date.getMinutes();

    return `${year}-${month.toString().padStart(2,'0')}-${dt.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }


  function responseTimeList(response_time) {
    const listOfNumber = []
    response_time.forEach(dict => {
      if (dict.avg === 0) {
        listOfNumber.push({
          x: parseISODateToChart(dict.start_time),
          y: -1,
        })
      } else {
        listOfNumber.push({
          x: parseISODateToChart(dict.start_time),
          y: dict.avg,
        })
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
      labels[i] = '';
      if (data[i].y === -1) {
        colors[i] = "grey";
        data[i].y += 1;
        labels[i] = "No Data";
      } else {
        colors[i] = "#36CB72";
      }
    }

    const y_scale_config = {
      beginAtZero: true,
      ticks: {
        callback(value) {
            return `${value} ms`;
        }
      }
    }

    const xScaleConfig = {
      min: parseISODateToChart(response_time[0].start_time),
      max: parseISODateToChart(response_time[response_time.length - 1].start_time),
      type: 'time',
      time: {
        unit: 'second',
        stepSize: stepSizeInSecond,
        displayFormats: {
          minute: 'HH:mm aaa',
          second: 'HH:mm aaa',
          hour: 'HH:mm aaa'
        }
      }
    }

    const tooltipConfig = {
      callbacks: {
        title: (context) => {
          return labels[context[0].dataIndex];
        }
      }
    }
    
    const responseTimeChart = new Chart(ctx, ChartConfig("Response Time", labels, data, colors, xScaleConfig, y_scale_config, tooltipConfig))

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