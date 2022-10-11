import { h } from 'preact';
import { render, waitFor, screen, fireEvent } from '@testing-library/preact';
import ViewAPIMonitorDetail from '../../../src/routes/view_api_monitor_detail';
import * as axios from 'axios';
import { getCurrentUrl, route } from 'preact-router';
import { setUserToken } from '../../../src/config/api/auth'
import App from '../../../src/components/app.js';

jest.mock('axios')

describe('Test view api monitor detail', () => {

  test('When render, then success', async () => {
    const response = {
			"url": "https://pacil.com",
			"schedule": "Daily at 06.00",
			"success_rate_list": [0.5, 1],
      "response_time_list": [10, 100],
		}

		axios.get.mockImplementation(() => Promise.resolve({ data: response }));

    render(<ViewAPIMonitorDetail id={1} />);
    await waitFor(() => {
      expect(screen.queryAllByRole('button').length).toBe(2)
      expect(screen.getByText("Schedule")).toBeDefined()
      expect(screen.getByTestId('select')).toBeDefined()
    })

    await waitFor(() => {
      expect(screen.getByRole("successRatePercentageChart").style["_values"].display).toBe('block')
      expect(screen.getByRole("responseTimeChart").style["_values"].display).toBe('block')
    })
  });

  test('When select time, then change value and chart', async () => {
    const response = {
			"url": "https://pacil.com",
			"schedule": "Before select change",
			"success_rate_list": [0.5, 1],
      "response_time_list": [50, 100],
		}

    const responseSelect = {
			"url": "https://pacil.com",
			"schedule": "After select change",
			"success_rate_list": [0.8, 0.2],
      "response_time_list": [80, 20],
		}

		axios.get.mockImplementation((url, data) => {
      if(data.params.range === '60MIN') {
        return Promise.resolve({ data: responseSelect });
      } else if(data.params.range === '30MIN') {
        return Promise.resolve({ data: response });
      }
    });

    render(<ViewAPIMonitorDetail id={1} />);
    fireEvent.change(screen.getByTestId('select'), { target: { value: '60MIN' } })

    await waitFor(() => {
      expect(screen.queryByText('Before select change')).toBeNull();
      expect(screen.getByText('After select change')).toBeDefined();
    })

    await waitFor(() => {
      expect(screen.getByRole("successRatePercentageChart").style["_values"].display).toBe('block')
      expect(screen.getByRole("responseTimeChart").style["_values"].display).toBe('block')
    })
  });
})

describe('Integration test detail page', () => {
  jest.setTimeout(30000);

  test('When click Yes button in Delete popup, then will be render to dashboard page', async () => {
    
    const responseDashboard = [{"id":1,"name":"Test","method":"GET","url":"url","schedule":"5MIN","body_type":"FORM","query_params":[],"headers":[],"body_form":[],"raw_body":[],"success_rate":100.0,"avg_response_time":0,"success_rate_history":[{"date":"2022-09-30","hour":17,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":18,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":19,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":20,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":21,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":22,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":23,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":0,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":1,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":2,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":3,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":4,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":5,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":6,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":7,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":8,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":9,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":10,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":11,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":12,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":13,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":14,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":15,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":16,"minute":0,"success":0,"failed":0}]}]
    const responseDetail = {
			"url": "https://pacil.com",
			"schedule": "mySchedule",
			"success_rate_list": [0.8, 0.2],
      "response_time_list": [80, 20],
		}

    axios.get.mockImplementation((url) => {
      if(url.includes('/1')) {
        return Promise.resolve({ data: responseDetail });
      } else {
        return Promise.resolve({ data: responseDashboard });
      }
    });

		setUserToken("TOKEN")
		render(<App/>);
		route('/')

		await waitFor(() => {
			expect(screen.getByText('Test')).toBeDefined()
			expect(getCurrentUrl()).toBe('/');
		})

    fireEvent.click(screen.getByRole('link', { name: "view-api-monitor-detail" }));

    await waitFor(() => {
      expect(screen.getByText("mySchedule")).toBeDefined();
      expect(getCurrentUrl()).toEqual(expect.stringContaining('/1/detail'));
    })

    axios.delete.mockImplementation(() => Promise.resolve({ data: {}}))

    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByRole('button', {name:'Yes'}));

    await waitFor(() => {
      expect(screen.getByText("API Monitors")).toBeDefined();
      expect(getCurrentUrl()).toBe('/');
    })
  })
})