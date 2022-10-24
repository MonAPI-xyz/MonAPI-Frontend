import { h } from 'preact';
import { render, waitFor, screen, fireEvent } from '@testing-library/preact';
import ErrorLogs from '../../../src/routes/error_logs';
import userEvent from '@testing-library/user-event'
import * as axios from 'axios';

jest.mock('axios')

describe('Test view error logs in unique case', () => {
  test('When provide with no data error, then sucess render list error logs', async () => {
    const response = {count: 0, next: null, previous: null, results:[]}
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

  test('When provide more than 3 page, then pagination number in bottom page show dynamicly when clicked (test for pageSize=10)', async () => {
    function dummyResult(idx){
        return {
          id: idx,
          monitor: {
            id: 1,
            name: "name" + idx,
            method: "GET",
            url: "www.ui.ac.id",
            schedule: "1MIN",
            body_type: "EMPTY",
            query_params: [],
            headers: [],
            body_form: [],
            raw_body: null,
            assertion_type: "DISABLED",
            assertion_value: "",
            is_assert_json_schema_only: false,
            exclude_keys: [],
          },
        execution_time: "2022-10-07T21:27:20+07:00",
        response_time: idx,
        success: false,
        status_code: 400,
        log_response: "response1",
        log_error: "error1"
      }
    }

    const resultsList1 = []
    const resultsList2 = []
    const resultsList3 = []
    const resultsList4 = []
    await waitFor(() => {
      for (let i=1; i <= 10; i++) {
        resultsList1.push(dummyResult(i))
        resultsList2.push(dummyResult(i+10))
        resultsList3.push(dummyResult(i+20))
        resultsList4.push(dummyResult(i+30))
      }
    })

    const responsePage1 = {count: 40, next: "http://testserver/error-logs/?page=2", previous: null, results: resultsList1}
    const responsePage2 = {count: 40, next: "http://testserver/error-logs/?page=3", previous: "http://testserver/error-logs/?page=1", results: resultsList2}
    const responsePage3 = {count: 40, next: "http://testserver/error-logs/?page=4", previous: "http://testserver/error-logs/?page=2", results: resultsList3}
    const responsePage4 = {count: 40, next: null, previous: "http://testserver/error-logs/?page=3", results: resultsList4}
    axios.get.mockImplementation((url, data) => {
      if (url.includes('error-logs/')) {
        if (data.params.page == 1) return Promise.resolve({ data: responsePage1 }) 
        else if ((data.params.page == 2)) return Promise.resolve({ data: responsePage2 }) 
        else if ((data.params.page == 3)) return Promise.resolve({ data: responsePage3 }) 
        else if ((data.params.page == 4)) return Promise.resolve({ data: responsePage4 }) 
      }
    });

    render(<ErrorLogs />);
    // user go to page 4 with search bar
    userEvent.type(screen.getByRole('inputSearch'), '4')
    userEvent.click(screen.getByRole("button", { name: "buttonSearch" }))

    await waitFor(() => {
      expect(screen.queryByTestId("page-1")).toBeNull()
      expect(screen.getByTestId("page-4").classList).toContain("active")
    })

    // user go to page 1 with search bar
    userEvent.clear(screen.getByRole('inputSearch'))
    userEvent.type(screen.getByRole('inputSearch'), '1')
    userEvent.click(screen.getByRole("button", { name: "buttonSearch" }))

    await waitFor(() => {
      expect(screen.queryByTestId("page-4")).toBeNull()
      expect(screen.getByTestId("page-1").classList).toContain("active")
    })
  })

  test('When provide Text assertion, then success render detail with text compare', async () => {
    const response = {count: 1, next: null, previous: null, 
      results: [
        {
            id: 1,
            monitor: {
                id: 1,
                name: "Test",
                method: "GET",
              url: "www.pacil.ac.id",
              schedule: "2MIN",
              body_type: "EMPTY",
              query_params: [],
              headers: [],
              body_form: [],
              raw_body: null,
              assertion_type: "TEXT",
              assertion_value: "test text assert",
              is_assert_json_schema_only: false,
              exclude_keys: [],
            },
          execution_time: "2022-10-08T22:27:20+07:00",
          date: "2022-10-08",
          hour: 2,
          minute: 2,
          response_time: 30,
          success: false,
          status_code: 400,
          log_response: "test text",
          log_error: "Assertion text failed"
        }
      ]
    }

    axios.get.mockImplementation((url) => {
      if (url.includes('error-logs/1')) {
        return Promise.resolve({ data: response.results[0] })
      } else if (url.includes('error-logs/')) {
        return Promise.resolve({ data: response }) 
      }
    });

    render(<ErrorLogs />);

    const detailButton = await screen.findByRole('detail-button')
    fireEvent.click(detailButton)

    await waitFor(() => {
      expect(screen.getByText("Text Compare")).toBeDefined()
    })
  })

  test('When provide JSON assertion, then success render detail with JSON compare', async () => {
    const response = {count: 1, next: null, previous: null, 
      results: [
        {
            id: 1,
            monitor: {
                id: 1,
                name: "Test",
                method: "GET",
              url: "www.pacil.ac.id",
              schedule: "2MIN",
              body_type: "EMPTY",
              query_params: [],
              headers: [],
              body_form: [],
              raw_body: null,
              assertion_type: "JSON",
              assertion_value: '{"key":"value2"}',
              is_assert_json_schema_only: false,
              exclude_keys: [],
            },
          execution_time: "2022-10-08T22:27:20+07:00",
          date: "2022-10-08",
          hour: 2,
          minute: 2,
          response_time: 30,
          success: false,
          status_code: 400,
          log_response: '{"key":"value"}',
          log_error: 'Different value detected on root[\'key\'], expected "value2" but found "value"'
        }
      ]
    }

    axios.get.mockImplementation((url) => {
      if (url.includes('error-logs/1')) {
        return Promise.resolve({ data: response.results[0] })
      } else if (url.includes('error-logs/')) {
        return Promise.resolve({ data: response }) 
      }
    });

    render(<ErrorLogs />);

    const detailButton = await screen.findByRole('detail-button')
    fireEvent.click(detailButton)

    await waitFor(() => {
      expect(screen.getByText("JSON Compare")).toBeDefined()
    })
  })
})

describe('Functional test all feature of view error logs', () => {

  jest.setTimeout(40000);

  test('When provide with exist data error, then success render list error logs, open modal for the detail, and close the modal', async () => {
    const response = {count: 2, next: null, previous: null, 
    results: [
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
            raw_body: null,
            assertion_type: "DISABLED",
            assertion_value: "",
            is_assert_json_schema_only: false,
            exclude_keys: [],
          },
        execution_time: "2022-10-07T21:27:20+07:00",
        response_time: 40,
        success: false,
        status_code: 400,
        log_response: "response1",
        log_error: null
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
            raw_body: null,
            assertion_type: "DISABLED",
            assertion_value: "",
            is_assert_json_schema_only: false,
            exclude_keys: [],
          },
        execution_time: "2022-10-08T22:27:20+07:00",
        date: "2022-10-08",
        hour: 2,
        minute: 2,
        response_time: 30,
        success: false,
        status_code: 400,
        log_response: "response2",
        log_error: ""
      }
    ]}

		axios.get.mockImplementation((url) => {
      if (url.includes('error-logs/1')) {
        return Promise.resolve({ data: response.results[0] })
      } else if (url.includes('error-logs/2')) {
        return Promise.resolve({ data: response.results[1] }) 
      } else if (url.includes('error-logs/')) {
        return Promise.resolve({ data: response }) 
      }
    });

    render(<ErrorLogs />);
    await waitFor(() => {
      expect(screen.getByText("Error Logs")).toBeDefined()
      expect(screen.getByText("Test1")).toBeDefined()
      expect(screen.getByText("Test2")).toBeDefined()
    })

    const detailButton = screen.getAllByRole('detail-button')

    // detail of api monitor Test1 on modal
    fireEvent.click(detailButton[0])
    await waitFor(() => {
      expect(screen.getByText("response1")).toBeDefined()
    })

    //back to list of error logs (close modal in x button)
    fireEvent.click(screen.getByRole('button', {name:'Close'}));
    await waitFor(() => {
      expect(screen.queryByText("response1")).toBeNull()
    })
  });
  
  test('When provide with many data, then success render list error logs with pagination and do all stuff regarding move page (test for pageSize=10)', async () => {
    function dummyResult(idx){
        return {
          id: idx,
          monitor: {
            id: 1,
            name: "name" + idx,
            method: "GET",
            url: "www.ui.ac.id",
            schedule: "1MIN",
            body_type: "EMPTY",
            query_params: [],
            headers: [],
            body_form: [],
            raw_body: null,
            assertion_type: "DISABLED",
            assertion_value: "",
            is_assert_json_schema_only: false,
            exclude_keys: [],
          },
        execution_time: "2022-10-07T21:27:20+07:00",
        response_time: idx,
        success: false,
        status_code: 400,
        log_response: "response1",
        log_error: "error1"
      }
    }

    const resultsList = []
    await waitFor(() => {
      for (let i=1; i <= 10; i++) {
        resultsList.push(dummyResult(i))
      }
    })
    
    const responsePage1 = {count: 11, next: "http://testserver/error-logs/?page=2", previous: null, results: resultsList}
    const responsePage2 = {count: 11, next: null, previous: "http://testserver/error-logs/?page=1", results: [dummyResult(11)]}
    axios.get.mockImplementation((url, data) => {
      if (url.includes('error-logs/')) {
        if (data.params.page == 1) return Promise.resolve({ data: responsePage1 }) 
        else if ((data.params.page == 2)) return Promise.resolve({ data: responsePage2 }) 
      }
    });

    render(<ErrorLogs />);
    // user go to page 2 with search bar
    userEvent.type(screen.getByRole('inputSearch'), '2')
    userEvent.click(screen.getByRole("button", { name: "buttonSearch" }))

    await waitFor(() => {
      expect(screen.queryByText("name2")).toBeNull()
      expect(screen.getByText("name11")).toBeDefined()
      expect(screen.getByTestId("page-2").classList).toContain("active")
    })

    // user click page 1 with pagination in bottom page
    userEvent.click(screen.getByTestId("page-1"))
    await waitFor(() => {
      expect(screen.getByText("name2")).toBeDefined()
      expect(screen.queryByText("name11")).toBeNull()
      expect(screen.getByTestId("page-1").classList).toContain("active")
    })

    // user click last page (2) with pagination in bottom page
    userEvent.click(screen.getByTestId("page-last"))
    await waitFor(() => {
      expect(screen.queryByText("name2")).toBeNull()
      expect(screen.getByText("name11")).toBeDefined()
      expect(screen.getByTestId("page-2").classList).toContain("active")
    })

    // user click first page (1) with pagination in bottom page
    userEvent.click(screen.getByTestId("page-first"))
    await waitFor(() => {
      expect(screen.getByText("name2")).toBeDefined()
      expect(screen.queryByText("name11")).toBeNull()
      expect(screen.getByTestId("page-1").classList).toContain("active")
    })

    // user click page 1 again with pagination in bottom page
    userEvent.click(screen.getByTestId("page-1"))
      await waitFor(() => {
        expect(screen.getByText("name2")).toBeDefined()
        expect(screen.queryByText("name11")).toBeNull()
        expect(screen.getByTestId("page-1").classList).toContain("active")
    })
  })
})