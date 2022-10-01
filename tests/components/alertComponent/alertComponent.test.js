import { h } from 'preact';
import { render, fireEvent, waitFor, screen } from '@testing-library/preact';
import AlertComponent from '../../../src/components/alertComponent';
import React from 'react';

describe('Test alert component', () => {
  test('When render with isButton false, then success', async () => {
    const mockCallback = jest.fn();
    const onSubmit = () => {}

    render(<AlertComponent
      isButton={false}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      popupOpen={false}
      setPopupOpen={mockCallback}
      onSubmit={onSubmit}
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    await waitFor(async () => {
      expect(screen.queryByRole('button')).toBeNull();
      expect(screen.queryByRole('clickable-text').textContent).toBe('Test Alert');
    })
  });

  test('When render with isButton true, then success', async () => {
    const mockCallback = jest.fn();
    const onSubmit = () => {}

    render(<AlertComponent
      isButton={true}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      popupOpen={false}
      setPopupOpen={mockCallback}
      onSubmit={onSubmit}
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    await waitFor(() => {
      expect(screen.getByRole('button').textContent).toBe('Test Alert')
    })
  });

  test('When click alert clickable-text, then popup appears', async () => {
    const mockCallback = jest.fn();
    const onSubmit = () => {}

    render(<AlertComponent
      isButton={false}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      popupOpen={false}
      setPopupOpen={mockCallback}
      onSubmit={onSubmit}
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    fireEvent.click(screen.getByRole('clickable-text'));
    await waitFor(() => {
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.calls[0][0]).toBe(true);
      expect(screen.queryByText('Alert Header')).toBeNull();
    })
  });

  test('When click alert button, then popup appears', async () => {
    const mockCallback = jest.fn();
    const onSubmit = () => {}

    render(<AlertComponent
      isButton={true}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      popupOpen={false}
      setPopupOpen={mockCallback}
      onSubmit={onSubmit}
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.calls[0][0]).toBe(true);
      expect(screen.queryByText('Alert Header')).toBeNull();
    })
  });

  test('When click Cancel button in popup, then popupOpen status to be false', async () => {
    const mockCallback = jest.fn();
    const onSubmit = () => {}

    render(<AlertComponent
      isButton={true}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      popupOpen={true}
      setPopupOpen={mockCallback}
      onSubmit={onSubmit}
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    fireEvent.click(screen.getByRole('button', {name:'Cancel'}));
    await waitFor(() => {
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.calls[0][0]).toBe(false);
    })
  })

  test('When click Yes button in popup, then popupOpen status still true and run submit', async () => {
    const mockCallback = jest.fn();
    const onSubmit = () => {}

    render(<AlertComponent
      isButton={true}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      popupOpen={true}
      setPopupOpen={mockCallback}
      onSubmit={onSubmit}
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    fireEvent.click(screen.getByRole('button', {name:'Yes'}));
    await waitFor(() => {
      expect(mockCallback.mock.calls.length).toBe(0);

      //onSubmit do nothing, so it is still on the current condition
      expect(screen.queryByText('Alert Header')).toBeDefined();
      
    })
  })

  test('When click Close button (x) in popup, then popupOpen status to be false', async () => {
    const mockCallback = jest.fn();
    const onSubmit = () => {}

    render(<AlertComponent
      isButton={true}
      displayText='Test Alert'
      header='Alert Header'
      body='Alert Body'
      buttonLeftText='Cancel'
      popupOpen={true}
      setPopupOpen={mockCallback}
      onSubmit={onSubmit}
      buttonRightText='Yes'
      buttonRightColor='blue' 
      />);

    fireEvent.click(screen.getByRole('button', {name:'Close'}));
    await waitFor(() => {
      expect(mockCallback.mock.calls.length).toBe(1);
      expect(mockCallback.mock.calls[0][0]).toBe(false);
      expect(screen.queryByText('Alert Header')).toBeDefined();
    })
  })
})