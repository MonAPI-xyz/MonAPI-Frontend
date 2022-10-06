import { h } from 'preact';
import { render, waitFor, screen } from '@testing-library/preact';
import ResponseTimeChart from '../../../src/components/response_time_chart';

describe('Test response time chart', () => {
  test('When render with data, then return with chart', async () => {
    const myData = [];
    await waitFor(() => {
      for (let i = 0; i < 5; i++) {
        myData.push(Math.floor(Math.random() * 101))
      }
    })

    render(<ResponseTimeChart data={myData} />);

    await waitFor(() => {
      expect(screen.getByRole("responseTimeChart").style["_values"].display).toBe('block')
    })
  });

  test('When render without data, then return without chart', async () => {
    render(<ResponseTimeChart data={undefined} />);

    await waitFor(() => {
      expect(screen.queryByRole("responseTimeChart")).toBeNull()
    })
  });
})