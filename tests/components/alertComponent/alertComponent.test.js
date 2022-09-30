import { h, Fragment } from 'preact';
import { render, fireEvent, waitFor, screen } from '@testing-library/preact';
import AlertComponent from '../../../src/components/alertComponent'

describe('Test alert component', () => {

  test('Test render success - isButton false', async () => {
    render(<AlertComponent
      isButton={false}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    await waitFor(() => {
      expect(screen.queryByRole('button')).toBeNull();
      expect(screen.queryByRole('clickable-text').textContent).toBe('Test Alert');
    })
  });

  test('Test render success - isButton true', async () => {
    render(<AlertComponent
      isButton={true}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    await waitFor(() => {
      expect(screen.getByRole('button').textContent).toBe('Test Alert')
    })
  });

  test('Test pop up', async () => {
    render(<AlertComponent
      isButton={true}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Alert Header')).toBeDefined();
      expect(screen.getByText('Alert Body')).toBeDefined();
    })
  });

  test('Test cancel button in popup (no link)', async () => {
    render(<AlertComponent
      isButton={true}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button', {name:'Cancel'}));
    await waitFor(() => {
      expect(screen.queryByText('Alert Header')).toBeNull();
      expect(screen.queryByText('Alert Body')).toBeNull();
    })
  })

  test('Test yes button in popup (no link)', async () => {
    render(<AlertComponent
      isButton={true}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button', {name:'Yes'}));
    await waitFor(() => {
      expect(screen.queryByText('Alert Header')).toBeDefined();
      expect(screen.queryByText('Alert Body')).toBeDefined();
    })
  })
})