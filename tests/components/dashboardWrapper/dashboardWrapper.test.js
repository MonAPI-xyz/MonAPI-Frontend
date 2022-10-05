import { h } from 'preact';
import { render, waitFor, screen } from '@testing-library/preact'
import DashboardWrapper from '../../../src/components/dashboardWrapper';

describe('Test Dashboard Wrapper', () => {

    test('Dashboard wrapper show sidebar and children', async () => {
      render(<DashboardWrapper><span>Unit Test Dashboard</span></DashboardWrapper>);
  
      await waitFor(() => {
        expect(screen.getByText("Error Logs")).toBeDefined();
        expect(screen.getByText("Unit Test Dashboard")).toBeDefined();
      })
    });

});