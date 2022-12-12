import { h } from "preact";
import { render, fireEvent, waitFor, screen } from '@testing-library/preact';
import TeamMemberComponent from '../../../src/components/teamMemberComponent';
import axios from "axios";

jest.mock('axios');
describe('Test team member component', () => {
    test('when header is true, set up header', async() =>{
        render(<TeamMemberComponent header={true} />)

        await waitFor(async () => {
            expect(screen.getByText('Members')).toBeDefined()
            expect(screen.getByText('Status')).toBeDefined()
        })
    })

    test('when verified is true, status is member', async() =>{
        render(<TeamMemberComponent email={`test@gmail.com`} verified={true} />)

        await waitFor(async () => {
            expect(screen.getByText('member')).toBeDefined()
            expect(screen.getByText('test@gmail.com')).toBeDefined()
        })
    })

    test('when verified is false, status is pending', async() => {
        render(<TeamMemberComponent email={'test@gmail.com'} verified={false} />)

        await waitFor(async () => {
            expect(screen.getByText('pending')).toBeDefined()
            expect(screen.getByText('test@gmail.com')).toBeDefined()
        })
    })

    test('when cancel button clicked then refresh team data', async() => {
        const mockFn = jest.fn();
        render(<TeamMemberComponent email={'test@gmail.com'} verified={false} cancelUserId={1} refreshTeamData={mockFn} />)

        axios.post.mockImplementation(() => Promise.resolve({
            status: 200,
            response: {
                data: {
                    success: true
                }
            }
        }))

        const cancelButton = screen.getByRole('button')
        fireEvent.click(cancelButton)

        await waitFor(async () => {
            expect(mockFn).toHaveBeenCalledTimes(1)
        })
    })

})