import { h } from 'preact';
import { render, waitFor, screen } from '@testing-library/preact';
import ResponseTimeChart from '../../../../src/components/chart/response_time_chart';

describe('Test response time chart', () => {
  test('When render with data, then return with chart', async () => {
    const myData = [
      {
        "start_time": "2022-10-11T23:55:54.784248+07:00",
        "end_time": "2022-10-11T23:56:54.784248+07:00",
        "avg": 20
      },
      {
        "start_time": "2022-10-11T23:55:54.784248+07:00",
        "end_time": "2022-10-11T23:56:54.784248+07:00",
        "avg": 0
      },
    ];

    render(<ResponseTimeChart response_time={myData} />);

    await waitFor(() => {
      expect(screen.getByRole("responseTimeChart").style["_values"].display).toBe('block')
    })
  });

  test('When render with empty data, then return empty chart', async () => {
    render(<ResponseTimeChart response_time={[{}]} />);

    await waitFor(() => {
      expect(screen.getByRole("responseTimeChart").style["_values"].display).toBe('block')
    })
  });

  test('When render without data, then return without chart', async () => {
    render(<ResponseTimeChart response_time={undefined} />);

    await waitFor(() => {
      expect(screen.queryByRole("responseTimeChart")).toBeNull()
    })
  });
})