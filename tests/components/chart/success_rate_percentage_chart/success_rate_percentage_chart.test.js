import { h } from 'preact';
import { render, waitFor, screen } from '@testing-library/preact';
import SuccessRatePercentageChart from '../../../../src/components/chart/success_rate_percentage_chart';

describe('Test success rate percentage chart', () => {
  test('When render with data, then return with chart', async () => {
    const myData = [
        {
          "start_time": "2022-10-12T00:24:54.784248+07:00",
          "end_time": "2022-10-12T00:25:54.784248+07:00",
          "success": 20,
          "failed": 10
        },
        {
          "start_time": "2022-10-12T00:24:54.784248+07:00",
          "end_time": "2022-10-12T00:25:54.784248+07:00",
          "success": 0,
          "failed": 10
        },
        {
          "start_time": "2022-10-12T00:24:54.784248+07:00",
          "end_time": "2022-10-12T00:25:54.784248+07:00",
          "success": 0,
          "failed": 0
        },
        {
          "start_time": "2022-10-12T00:24:54.784248+07:00",
          "end_time": "2022-10-12T00:25:54.784248+07:00",
          "success": 10,
          "failed": 0
        },
    ];

    render(<SuccessRatePercentageChart success_rate={myData} />);

    await waitFor(() => {
      expect(screen.getByRole("successRatePercentageChart").style["_values"].display).toBe('block')
    })
  });

  test('When render with empty data, then return empty chart', async () => {
    render(<SuccessRatePercentageChart success_rate={[{}]} />);

    await waitFor(() => {
      expect(screen.getByRole("successRatePercentageChart").style["_values"].display).toBe('block')
    })
  });

  test('When render without data, then return without chart', async () => {
    render(<SuccessRatePercentageChart success_rate={undefined} />);

    await waitFor(() => {
      expect(screen.queryByRole("responseTimeChart")).toBeNull()
    })
  });
})