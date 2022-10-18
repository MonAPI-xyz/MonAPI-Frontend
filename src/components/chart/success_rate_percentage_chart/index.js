import { createRef, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Chart from 'chart.js/auto';
import ChartConfig from '../ChartConfig'

const SuccessRatePercentageChart = ({success_rate}) => {
  const [chart, setChart] = useState(null);

  if (success_rate == undefined) {
    return (<div></div>)
  }

  function successRateDictToPercentageNumber(dict) {
    if (dict.success+dict.failed === 0) {
      return -1;
    }
    return dict.success/(dict.success+dict.failed)
  }

  function successRateList(success_rate) {
    const listOfNumber = []
    success_rate.forEach(dict => {
      listOfNumber.push(successRateDictToPercentageNumber(dict))
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
      if (data[i] > 0.5) {
        colors[i] = "#36CB72";
      } else if (data[i] === -1) {
        colors[i] = "grey";
        data[i] += 1;
        labels[i] = "No Data"
      } else {
        colors[i] = "#CB5136";
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
    const successRateChart = new Chart(ctx, ChartConfig( "Success Rate", labels, data, colors, y_scale_config))
    
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