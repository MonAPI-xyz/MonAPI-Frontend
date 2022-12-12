import { h } from 'preact';
import { screen, waitFor, render } from '@testing-library/preact';
import StatusPageDashboard from '../../../src/routes/statusPageDashboard';
import * as axios from 'axios';

jest.mock('axios')

describe("status page dashboard test", () => {
  test("when doesn't have path, then render with error", async () => {
    axios.get.mockImplementation(() => Promise.reject({
      response: {
          data: {
              error : "Please make sure your URL path is exist!"
          }
      }
  }));
		render(<StatusPageDashboard path='testpath' />);

		await waitFor(() => {
			expect(screen.getByText('Status Page')).toBeDefined()
			expect(screen.getByText('Please make sure your URL path is exist!')).toBeDefined()
		})
  })

  test("when doesn't have category, then render with notify user that no data exist", async () => {
    const response = []
    axios.get.mockImplementation(() => Promise.resolve({ data: response }));
		render(<StatusPageDashboard path='testpath' />);

		await waitFor(() => {
			expect(screen.getByText('Status Page')).toBeDefined()
			expect(screen.getByText('No data')).toBeDefined()
		})
  })

  test("when have category but doesn't assigned, then render with notify user that no data exist for that category", async () => {
    const response = [
      {
        id: 1,
        name: "testcategory",
        success_rate_category: []
      }
    ]
    axios.get.mockImplementation(() => Promise.resolve({ data: response }));
		render(<StatusPageDashboard path='testpath' />);

		await waitFor(() => {
			expect(screen.getByText('testcategory')).toBeDefined()
			expect(screen.getByText('No data')).toBeDefined()
		})
  })

  test("when have category assigned and has failed success rate, then success render graph with text 'not healthy'", async () => {
    const response = [
      {
          id: 1,
          name: "testcategory",
          success_rate_category: [
              {
                  start_time: "2022-11-28T23:57:20.882338+07:00",
                  end_time: "2022-11-29T00:57:20.882338+07:00",
                  success: 0,
                  failed: 1
              },
              {
                  start_time: "2022-11-29T00:57:20.882338+07:00",
                  end_time: "2022-11-29T01:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T01:57:20.882338+07:00",
                  end_time: "2022-11-29T02:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T02:57:20.882338+07:00",
                  end_time: "2022-11-29T03:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T03:57:20.882338+07:00",
                  end_time: "2022-11-29T04:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T04:57:20.882338+07:00",
                  end_time: "2022-11-29T05:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T05:57:20.882338+07:00",
                  end_time: "2022-11-29T06:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T06:57:20.882338+07:00",
                  end_time: "2022-11-29T07:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T07:57:20.882338+07:00",
                  end_time: "2022-11-29T08:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T08:57:20.882338+07:00",
                  end_time: "2022-11-29T09:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T09:57:20.882338+07:00",
                  end_time: "2022-11-29T10:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T10:57:20.882338+07:00",
                  end_time: "2022-11-29T11:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T11:57:20.882338+07:00",
                  end_time: "2022-11-29T12:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T12:57:20.882338+07:00",
                  end_time: "2022-11-29T13:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T13:57:20.882338+07:00",
                  end_time: "2022-11-29T14:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T14:57:20.882338+07:00",
                  end_time: "2022-11-29T15:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T15:57:20.882338+07:00",
                  end_time: "2022-11-29T16:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T16:57:20.882338+07:00",
                  end_time: "2022-11-29T17:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T17:57:20.882338+07:00",
                  end_time: "2022-11-29T18:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T18:57:20.882338+07:00",
                  end_time: "2022-11-29T19:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T19:57:20.882338+07:00",
                  end_time: "2022-11-29T20:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T20:57:20.882338+07:00",
                  end_time: "2022-11-29T21:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T21:57:20.882338+07:00",
                  end_time: "2022-11-29T22:57:20.882338+07:00",
                  success: 0,
                  failed: 0
              },
              {
                  start_time: "2022-11-29T22:57:20.882338+07:00",
                  end_time: "2022-11-29T23:57:20.882338+07:00",
                  success: 0,
                  failed: 0,
              }
          ]
      },
    ]

    axios.get.mockImplementation(() => Promise.resolve({ data: response }));
		render(<StatusPageDashboard path='testpath' />);

		await waitFor(() => {
			expect(screen.getByText('testcategory')).toBeDefined()
			expect(screen.getByText('Some endpoint(s) are not healthy')).toBeDefined()
		})
  })
})