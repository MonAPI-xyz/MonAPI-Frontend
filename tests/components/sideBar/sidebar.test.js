import { h } from 'preact';
import { render, fireEvent, waitFor, screen, getByTestId } from '@testing-library/preact';
import * as axios from 'axios';
import App from '../../../src/components/app.js';
import { route } from 'preact-router'
import { setUserToken } from '../../../src/config/api/auth'
import SideBar from '../../../src/components/sideBar/index.js';

jest.mock('axios');

describe('Test sideBar', () => {

  test('When render, then success', async () => {
    setUserToken('d16c4059484867e8d12ff535072509e3f29719e7');
    const response = [
      {
          id: 1,
          name: "test teqam"
      },
      {
          id: 2,
          name: "test teqam2"
      },
      {
          id: 3,
          name: "test teqam3"
      }
    ]
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
    render(<App />);

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem').length).toBe(7)
    })
  });


  test('When click logout, then popup appears', async () => {
    setUserToken('d16c4059484867e8d12ff535072509e3f29719e7');
    const response = [
      {
          id: 1,
          name: "test teqam"
      },
      {
          id: 2,
          name: "test teqam2"
      },
      {
          id: 3,
          name: "test teqam3"
      }
    ]
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
    render(<App />);
    

    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByText("Are you sure want to logout?")).toBeDefined();
    })
	});

  test('When click Close button (x) in logout popup, then popup to be close', async () => {
    setUserToken('d16c4059484867e8d12ff535072509e3f29719e7');
    const response = [
      {
          id: 1,
          name: "test teqam"
      },
      {
          id: 2,
          name: "test teqam2"
      },
      {
          id: 3,
          name: "test teqam3"
      }
    ]
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
    render(<App />);

    fireEvent.click(screen.getByText('Logout'));
    fireEvent.click(screen.getByRole('button', {name:'Close'}));
    await waitFor(() => {
      expect(screen.queryByText("Are you sure want to logout?")).toBeNull();
    })
  })


  test('When click Cancel button in logout popup, then popup to be close', async () => {
    const responseMonitor = []
		axios.get.mockImplementation(() => Promise.resolve({data: responseMonitor}))
    setUserToken("TOKEN")
    render(<App />);
    route('/');
    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeDefined();
    })
    

    fireEvent.click(screen.getByText('Logout'));
    fireEvent.click(screen.getByTestId('buttonCancelAlert'));
    await waitFor(() => {
      expect(screen.queryByText("Are you sure want to logout?")).toBeNull();
    })
  })

  test('When click Yes button in logout popup, then will be render to login page', async () => {
    const responseMonitor = []
		axios.get.mockImplementation(() => Promise.resolve({data: responseMonitor}))
    setUserToken("TOKEN")
    render(<App />);
    route('/');
    await waitFor(() => {
      expect(screen.getByText('Logout')).toBeDefined();
    })

    const response = "User Logged out successfully"
    axios.post.mockImplementation(() => Promise.resolve({ data: response }));

    fireEvent.click(screen.getByText('Logout'));
    fireEvent.click(screen.getByRole('button', {name:'Yes'}));
    await waitFor(() => {
      expect(screen.getByText("Login")).toBeDefined();
    })
  })

  test('When click arrow icon, then the collapsed status to be true', async () => {
    setUserToken('d16c4059484867e8d12ff535072509e3f29719e7');
    render(<App />);
    route('/');

    await waitFor(() => {
      expect(screen.getByText('API Monitors')).toBeDefined();
    })

    fireEvent.click(screen.getByRole('iconarrow'))
    await waitFor(() => {
      expect(screen.getByAltText('MonAPI').style.width).toBe('75%')
      // expect(screen.getByTestId('accordionButton', { expanded: false})).toBeNull()
    })
  })

  test('When the collapsed was true and click the arrow icon, then the collapsed status to be false', async () => {
    setUserToken('d16c4059484867e8d12ff535072509e3f29719e7');
    render(<App />);

    fireEvent.click(screen.getByRole('iconarrow'))
    fireEvent.click(screen.getByRole('iconarrow'))
    await waitFor(() => {
      expect(screen.getByAltText('MonAPI').style.width).toBe('')
      expect(screen.getByTestId('accordionButton', { expanded: false})).toBeDefined()
    })
  })

  test('When click accordion, then it become expand', async () => {
    setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
    render(<App />);
    
    fireEvent.click(screen.getByTestId('accordionButton', { expanded: false}))
    // const removeButton = await screen.getByTestId('keyValueRemoveButton')
    //     userEvent.click(removeButton)
    await waitFor(() => {
      expect(screen.getByTestId('accordionButton', { expanded: true})).toBeDefined()
    })
  })

  test('When click expanded accordion, then it become shrink', async () => {
    setUserToken('d16c4059484867e8d12ff535072509e3f29719e7')
    render(<App />);

    fireEvent.click(screen.getByRole('button', { expanded: false}))
    fireEvent.click(screen.getByRole('button', { expanded: true}))
    await waitFor(() => {
      expect(screen.getByRole('button', { expanded: false})).toBeDefined()
    })
  })

  test('Select team from accordion team', async () => {
    const response = [
      {
          id: 1,
          name: "test teqam"
      },
      {
          id: 2,
          name: "test teqam2"
      },
      {
          id: 3,
          name: "test teqam3"
      }
    ]
		axios.get.mockImplementation(() => Promise.resolve({data: response}))
		setUserToken("token")
		render(<App />);
    axios.get.mockImplementation(() => Promise.resolve({data: []}))
    fireEvent.click(screen.getByTestId('accordionButton', { expanded: false}))
    await waitFor(() => {
      fireEvent.click(screen.getByText('test teqam3'))
    })
  })
})