import { h } from 'preact';
import { render, waitFor, screen, fireEvent } from '@testing-library/preact';
import ErrorLogs from '../../../src/routes/error_logs';
import * as axios from 'axios';

jest.mock('axios')

describe('Test view error logs in unique case', () => {
  test('When provide with no data error, then sucess render list error logs', async () => {
    const response = []
    axios.get.mockImplementation((url) => {
      if (url.includes('error-logs/')) {
        return Promise.resolve({ data: response }) 
      }
    });

    render(<ErrorLogs />);
    await waitFor(() => {
      expect(screen.getByText("Error Logs")).toBeDefined()
      expect(screen.queryByRole('td')).toBeNull()
      expect(screen.queryByRole('detail-button')).toBeNull()
    })
  })
})

describe('Functional test all feature of view error logs', () => {

  jest.setTimeout(30000);

  test('When provide with exist data error, then success render list error logs, open modal for the detail, and close the modal', async () => {
    const response = [
        {
          id: 1,
          monitor: {
              id: 1,
              name: "Test1",
              method: "GET",
            url: "www.ui.ac.id",
            schedule: "1MIN",
            body_type: "EMPTY",
            query_params: [],
            headers: [],
            body_form: [],
            raw_body: null
          },
        execution_time: "2022-10-07T21:27:20+07:00",
        date: "2022-10-07",
        hour: 1,
        minute: 1,
        response_time: 40,
        success: false,
        log_response: "response1",
        log_error: "error1"
      },
      {
          id: 2,
          monitor: {
              id: 1,
              name: "Test2",
              method: "GET",
            url: "www.pacil.ac.id",
            schedule: "2MIN",
            body_type: "EMPTY",
            query_params: [],
            headers: [],
            body_form: [],
            raw_body: null
          },
        execution_time: "2022-10-08T22:27:20+07:00",
        date: "2022-10-08",
        hour: 2,
        minute: 2,
        response_time: 30,
        success: false,
        log_response: "response2",
        log_error: "error2"
      }
    ]

		axios.get.mockImplementation((url) => {
      if (url.includes('error-logs/1')) {
        return Promise.resolve({ data: response[0] })
      } else if (url.includes('error-logs/2')) {
        return Promise.resolve({ data: response[1] }) 
      } else if (url.includes('error-logs/')) {
        return Promise.resolve({ data: response }) 
      }
    });

    render(<ErrorLogs />);
    await waitFor(() => {
      expect(screen.getByText("Error Logs")).toBeDefined()
      expect(screen.getByText("07/10/2022, 21:27:20")).toBeDefined()
      expect(screen.getByText("08/10/2022, 22:27:20")).toBeDefined()
    })

    const detailButton = screen.getAllByRole('detail-button')

    // detail of api monitor Test1 on modal
    fireEvent.click(detailButton[0])
    await waitFor(() => {
      expect(screen.getByText("Response")).toBeDefined()
      expect(screen.getByText("Fri Oct 07 2022 21:27:20 GMT+0700 (Indochina Time)")).toBeDefined()
    })

    //back to list of error logs (close modal in x button)
    fireEvent.click(screen.getAllByRole('button', {name:'Close'})[0]);
    await waitFor(() => {
      expect(screen.getByText("Error Logs")).toBeDefined()
      expect(screen.queryByText("Fri Oct 07 2022 21:27:20 GMT+0700 (Indochina Time)")).toBeNull()
    })

    // detail of api monitor Test2 on modal
    fireEvent.click(detailButton[1])
    await waitFor(() => {
      expect(screen.getByText("Response")).toBeDefined()
      expect(screen.getByText("Sat Oct 08 2022 22:27:20 GMT+0700 (Indochina Time)")).toBeDefined()
    })

    //back to list of error logs (button close in bottom modal)
    fireEvent.click(screen.getAllByRole('button', {name:'Close'})[1])
    await waitFor(() => {
      expect(screen.getByText("Error Logs")).toBeDefined()
      expect(screen.queryByText("Sat Oct 08 2022 22:27:20 GMT+0700 (Indochina Time)")).toBeNull()
    })
  });
})