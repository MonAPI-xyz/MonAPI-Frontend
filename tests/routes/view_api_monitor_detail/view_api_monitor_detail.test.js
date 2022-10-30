import { h } from 'preact';
import { render, waitFor, screen, fireEvent } from '@testing-library/preact';
import ViewAPIMonitorDetail from '../../../src/routes/view_api_monitor_detail';
import * as axios from 'axios';
import { getCurrentUrl, route } from 'preact-router';
import { setUserToken } from '../../../src/config/api/auth'
import userEvent from '@testing-library/user-event';
import App from '../../../src/components/app.js';

jest.mock('axios')

describe('Edit button route correctly', () => {
  jest.setTimeout(30000);
  test('When edit button is clicked, user is redirected', async () => {
    const responseDashboard = [{"id":1,"name":"Test","method":"GET","url":"url","schedule":"5MIN","body_type":"FORM","query_params":[],"headers":[],"body_form":[],"raw_body":[],"success_rate":100.0,"avg_response_time":0,"success_rate_history":[{"date":"2022-09-30","hour":17,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":18,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":19,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":20,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":21,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":22,"minute":0,"success":0,"failed":0},{"date":"2022-09-30","hour":23,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":0,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":1,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":2,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":3,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":4,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":5,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":6,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":7,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":8,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":9,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":10,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":11,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":12,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":13,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":14,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":15,"minute":0,"success":0,"failed":0},{"date":"2022-10-01","hour":16,"minute":0,"success":0,"failed":0}]}]
        const responseDetail = {
          "name":"Test",
    			"url": "https://pacil.com",
    			"schedule": "mySchedule",
    			"success_rate": [
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
              "success": 10,
              "failed": 0
            },
            {
              "start_time": "2022-10-12T00:24:54.784248+07:00",
              "end_time": "2022-10-12T00:25:54.784248+07:00",
              "success": 0,
              "failed": 0
            },
          ],
          "response_time": [
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
          ],
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

        fireEvent.click(screen.getByText('Edit'));

        await waitFor(() => {
            expect(getCurrentUrl()).toBe('/1/edit/');
        })
  })
})

describe('Test view api monitor detail', () => {

  test('When render, then success', async () => {
    const response = {
      "name":"Test API Name",
			"url": "https://pacil.com",
			"schedule": "mySchedule",
			"success_rate": [
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
      ],
      "response_time": [
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
      ],
		}

		axios.get.mockImplementation(() => Promise.resolve({ data: response }));

    render(<ViewAPIMonitorDetail id={1} />);
    await waitFor(() => {
      expect(screen.queryAllByRole('button').length).toBe(2)
      expect(screen.getByText("Test API Name")).toBeDefined()
      expect(screen.getByTestId('select')).toBeDefined()
    })

    await waitFor(() => {
      expect(screen.getByRole("successRatePercentageChart").style["_values"].display).toBe('block')
      expect(screen.getByRole("responseTimeChart").style["_values"].display).toBe('block')
    })
  });

  test('When select time, then change value and chart', async () => {
    const response = {
      "name":"Test",
			"url": "https://pacil.com",
			"schedule": "Before select change",
			"success_rate": [
        {
          "start_time": "2022-10-12T00:24:54.784248+07:00",
          "end_time": "2022-10-12T00:25:54.784248+07:00",
          "success": 5,
          "failed": 10
        },
        {
          "start_time": "2022-10-12T00:24:54.784248+07:00",
          "end_time": "2022-10-12T00:25:54.784248+07:00",
          "success": 0,
          "failed": 10
        },
      ],
      "response_time": [
        {
          "start_time": "2022-10-11T23:55:54.784248+07:00",
          "end_time": "2022-10-11T23:56:54.784248+07:00",
          "avg": 20
        },
        {
          "start_time": "2022-10-11T23:55:54.784248+07:00",
          "end_time": "2022-10-11T23:56:54.784248+07:00",
          "avg": 10
        },
      ],
		}

    const responseSelect = {
      "name":"Test",
			"url": "https://pacil.com",
			"schedule": "After select change",
			"success_rate": [
        {
          "start_time": "2022-10-12T00:24:54.784248+07:00",
          "end_time": "2022-10-12T00:25:54.784248+07:00",
          "success": 5,
          "failed": 0
        },
        {
          "start_time": "2022-10-12T00:24:54.784248+07:00",
          "end_time": "2022-10-12T00:25:54.784248+07:00",
          "success": 0,
          "failed": 0
        },
      ],
      "response_time": [
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
      ],
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
      "name":"Test",
			"url": "https://pacil.com",
			"schedule": "mySchedule",
			"success_rate": [
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
          "success": 10,
          "failed": 0
        },
        {
          "start_time": "2022-10-12T00:24:54.784248+07:00",
          "end_time": "2022-10-12T00:25:54.784248+07:00",
          "success": 0,
          "failed": 0
        },
      ],
      "response_time": [
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
      ],
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