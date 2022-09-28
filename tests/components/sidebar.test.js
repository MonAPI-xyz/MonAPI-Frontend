import { h } from 'preact';
import { render, fireEvent, waitFor, screen } from '@testing-library/preact';
import SideBar from '../../src/components/SideBar'

describe('Test SideBar', () => {

  test('Test render success', async () => {
    render(<SideBar/>);

    await waitFor(() => {
      expect(screen.queryAllByRole('listitem').length).toBe(7)
    })
  });


  test('Test popup logout', async () => {
    render(<SideBar/>);

    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => {
      expect(screen.getByText("Are you sure want to logout?")).toBeDefined();
    })
	});

  test('Test collapse true', async () => {
    render(<SideBar/>);

    fireEvent.click(screen.getByRole('iconarrow'))
    await waitFor(() => {
      expect(screen.getByAltText('MonAPI').style.width).toBe('75%')
      expect(screen.queryByRole('button', { expanded: false})).toBeNull()
    })
  })

  test('Test collapse false', async () => {
    render(<SideBar/>);

    fireEvent.click(screen.getByRole('iconarrow'))
    fireEvent.click(screen.getByRole('iconarrow'))
    await waitFor(() => {
      expect(screen.getByAltText('MonAPI').style.width).toBe('')
      expect(screen.getByRole('button', { expanded: false})).toBeDefined()
    })
  })

  test('Test expanded accordion', async () => {
    render(<SideBar/>);

    fireEvent.click(screen.getByRole('button', { expanded: false}))
    await waitFor(() => {
      expect(screen.getByRole('button', { expanded: true})).toBeDefined()
    })
  })
})