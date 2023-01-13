import { createRef, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Chart from 'chart.js/auto';
import "chartjs-adapter-date-fns";
import ChartConfig from '../ChartConfig'

const SuccessRatePercentageChart = ({success_rate, stepSizeInSecond}) => {
  const [chart, setChart] = useState(null);

  if (success_rate == undefined) {
    return (<div />)
  }

  function successRateDictToPercentageNumber(dict) {
    if (dict.success+dict.failed === 0) {
      return -1;
    }
    return dict.success/(dict.success+dict.failed)
  }

  const parseISODateToChart = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dt = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${year}-${month.toString().padStart(2,'0')}-${dt.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }

  function successRateList(success_rate) {
    const listOfNumber = []
    success_rate.forEach(dict => {
      listOfNumber.push({
        x: parseISODateToChart(dict.start_time),
        y: successRateDictToPercentageNumber(dict)
      });
    });
    return listOfNumber
  }

  const chartRef = createRef()

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chart != null) { chart.destroy() }

    const data = successRateList(success_rate)
    const labels = data.slice()

    const colors=[];
    for (let i=0; i < data.length; i++) {
      labels[i] = '';

      if (data[i].y == 1) {
        colors[i] = "#36CB72";
      } else if (data[i].y === -1) {
        colors[i] = "grey";
        data[i].y += 1;
        labels[i] = "No Data"
      } else if (data[i].y == 0) {
        colors[i] = "#CB5136";
      } else {
        colors[i] = "yellow";
      }
    }

    const y_scale_config = {
      beginAtZero: true,
      max: 1,
      ticks: {
        format: {
            style: 'percent'
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

    const xScaleConfig = {
      min: parseISODateToChart(success_rate[0].start_time),
      max: parseISODateToChart(success_rate[success_rate.length - 1].start_time),
      type: 'time',
      time: {
        unit: 'second',
        stepSize: stepSizeInSecond,
        displayFormats: {
          minute: 'HH:mm aaa',
          hour: 'HH:mm aaa',
          second: 'HH:mm aaa',
        }
      }
    }
    const successRateChart = new Chart(ctx, ChartConfig( "Success Rate", labels, data, colors, xScaleConfig, y_scale_config, tooltipConfig))
    
    setChart(successRateChart);
  }, [success_rate])

  return (
    <canvas
      role='successRatePercentageChart'
      id="successRatePercentageChartId"
      ref={chartRef}
    />
  )
}

export default SuccessRatePercentageChart;