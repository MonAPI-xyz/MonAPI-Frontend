import { h } from 'preact';
import { render, waitFor, screen } from '@testing-library/preact'
import App from '../../../src/components/app';
import { setUserToken } from '../../../src/config/api/auth';
import * as axios from 'axios';

jest.mock('axios');
describe('Test Dashboard Wrapper', () => {

    test('Dashboard wrapper show sidebar and children', async () => {
      setUserToken('d16c4059484867e8d12ff535072509e3f29719e7');
      const response = [
        {
            "id": 1,
            "name": "test teqam"
        },
        {
            "id": 2,
            "name": "test teqam2"
        },
        {
            "id": 3,
            "name": "test teqam3"
        }
      ]
      axios.get.mockImplementation(() => Promise.resolve({data: response}))
      render(<App/>);
  
      await waitFor(() => {
        expect(screen.getByText("Error Logs")).toBeDefined();
        expect(screen.getByText("Dashboard")).toBeDefined();
      })
    });

});