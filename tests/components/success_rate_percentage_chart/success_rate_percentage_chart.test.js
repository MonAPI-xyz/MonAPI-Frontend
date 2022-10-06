import { h } from 'preact';
import { render, waitFor, screen } from '@testing-library/preact';
import SuccessRatePercentageChart from '../../../src/components/success_rate_percentage_chart';

describe('Test success rate percentage chart', () => {
  test('When render with data, then return with chart', async () => {
    const myData = [];
    await waitFor(() => {
      for (let i = 0; i < 5; i++) {
        myData.push(Math.floor(Math.random() * 101)/100)
      }
    })

    render(<SuccessRatePercentageChart data={myData} />);

    await waitFor(() => {
      expect(screen.getByRole("successRatePercentageChart").style["_values"].display).toBe('block')
    })
  });

  test('When render without data, then return without chart', async () => {
    render(<SuccessRatePercentageChart data={undefined} />);

    await waitFor(() => {
      expect(screen.queryByRole("responseTimeChart")).toBeNull()
    })
  });
})