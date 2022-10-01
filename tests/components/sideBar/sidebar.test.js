import { h } from 'preact';
import { render, fireEvent, waitFor, screen } from '@testing-library/preact';
import SideBar from '../../../src/components/sideBar/index'
import * as axios from 'axios';
import App from '../../../src/components/app.js';
import { route } from 'preact-router'
import { setUserToken } from '../../../src/config/api/auth'

jest.mock('axios');

describe('Test sideBar', () => {

  test('When render, then succes', async () => {
    render(<SideBar/>);

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem').length).toBe(7)
    })
  });


  test('When click logout, then popup appears', async () => {
    render(<SideBar/>);

    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByText("Are you sure want to logout?")).toBeDefined();
    })
	});

  test('When click Close button (x) in logout popup, then popup to be close', async () => {
    render(<SideBar/>);

    fireEvent.click(screen.getByText('Logout'));
    fireEvent.click(screen.getByRole('button', {name:'Close'}));
    await waitFor(() => {
      expect(screen.queryByText("Are you sure want to logout?")).toBeNull();
    })
  })


  test('When click Cancel button in logout popup, then popup to be close', async () => {
    render(<SideBar/>);

    fireEvent.click(screen.getByText('Logout'));
    fireEvent.click(screen.getByRole('button', {name:'Cancel'}));
    await waitFor(() => {
      expect(screen.queryByText("Are you sure want to logout?")).toBeNull();
    })
  })

  test('When click Yes button in logout popup, then will be render to login page', async () => {
    setUserToken("TOKEN")
    render(<App/>);
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
    render(<SideBar/>);

    fireEvent.click(screen.getByRole('iconarrow'))
    await waitFor(() => {
      expect(screen.getByAltText('MonAPI').style.width).toBe('75%')
      expect(screen.queryByRole('button', { expanded: false})).toBeNull()
    })
  })

  test('When the collapsed was true and click the arrow icon, then the collapsed status to be false', async () => {
    render(<SideBar/>);

    fireEvent.click(screen.getByRole('iconarrow'))
    fireEvent.click(screen.getByRole('iconarrow'))
    await waitFor(() => {
      expect(screen.getByAltText('MonAPI').style.width).toBe('')
      expect(screen.getByRole('button', { expanded: false})).toBeDefined()
    })
  })

  test('When click accordion, then it become expand', async () => {
    render(<SideBar/>);

    fireEvent.click(screen.getByRole('button', { expanded: false}))
    await waitFor(() => {
      expect(screen.getByRole('button', { expanded: true})).toBeDefined()
    })
  })

  test('When click expanded accordion, then it become shrink', async () => {
    render(<SideBar/>);

    fireEvent.click(screen.getByRole('button', { expanded: false}))
    fireEvent.click(screen.getByRole('button', { expanded: true}))
    await waitFor(() => {
      expect(screen.getByRole('button', { expanded: false})).toBeDefined()
    })
  })
})