import { h } from 'preact';
import { render, waitFor, screen } from '@testing-library/preact';
import CreateTeam from '../../../src/routes/createTeam/index.js';
import userEvent from '@testing-library/user-event'
import * as axios from 'axios';

jest.mock('axios')

describe('Test input', () => {
  test('When user doesnt fill the team name, then error raises', async () => {
		render(<CreateTeam />);

		const Create = screen.getByText('Create');
		userEvent.click(Create);
		await waitFor(() => {
      //required for the team name, whereas non-required for others, so just one error
			expect(screen.getAllByText("Required")).toHaveLength(1);
		});		
	});

  test('When user fill the team name, then success', async () => {
    const response = {
      name: "myteam",
      description: "myDesc",
      logo:null
    }
    const mockPost = jest.fn()
		axios.post.mockImplementation(() => {
      mockPost()
      return Promise.resolve({data: response})
    })

		render(<CreateTeam />);

    const nameField = await screen.findByPlaceholderText('Insert Team Name');
    userEvent.type(nameField, 'myteam')

		const Create = screen.getByText('Create');
		userEvent.click(Create);
		await waitFor(() => {
      expect(mockPost).toHaveBeenCalledTimes(0)
		});		
	});

  test('When user fill inputs completely, then success', async () => {
		render(<CreateTeam />);

    const nameField = await screen.findByPlaceholderText('Insert Team Name');
    userEvent.type(nameField, 'myteam')

    const descField = await screen.findByPlaceholderText('Insert Team Description');
    userEvent.type(descField, 'myDesc')

    global.URL.createObjectURL = jest.fn();
    const imageFile = new File([new ArrayBuffer(1)], 'hello.png', { type: "image/png" });
    
    const fileField = await screen.findByPlaceholderText('Select Image');

    // test file input is optional
    userEvent.upload(fileField, null)

    // test file input can upload image file
    userEvent.upload(fileField, imageFile)

    const response = {
      name: "myteam",
      description: "myDesc",
      logo:imageFile
    }
    const mockPost = jest.fn()
		axios.post.mockImplementation(() => {
      mockPost()
      return Promise.resolve({data: response})
    })
    
		const Create = screen.getByText('Create');
		userEvent.click(Create);

		await waitFor(() => {
      expect(mockPost).toHaveBeenCalledTimes(1);
		});		
	});

  test('When user upload image file size more than 10MB, then failed', async () => {
		render(<CreateTeam />);

    const nameField = await screen.findByPlaceholderText('Insert Team Name');
    userEvent.type(nameField, 'myteam')

    global.URL.createObjectURL = jest.fn();

    // create new file that have size more than 10MB, specificly 10MB + 1b
    const imageFile = new File([new ArrayBuffer(1024 * 1024 * 10 + 1)], 'hello.png', { type: "image/png" });
    
    const fileField = await screen.findByPlaceholderText('Select Image');

    // test file input can upload image file
    userEvent.upload(fileField, imageFile)
    
		const Create = screen.getByText('Create');
		userEvent.click(Create);

		await waitFor(() => {
      expect(screen.getByText("Please choose image that the file size less than or equal to 10MB")).toBeDefined()
		});		
	});

  test('When user click Create button, then show spinner to loading', async () => {
		let response = {
			name: "myteam"
		}
		axios.post.mockImplementation(() => {
			return new Promise((resolve)=> {
				setTimeout(() =>  resolve({ 
					data: response
				}), 3000)
			})
		});
		
		render(<CreateTeam />);

    const nameField = await screen.findByPlaceholderText('Insert Team Name');
    userEvent.type(nameField, 'myteam')

		const Create = screen.getByText('Create');
		userEvent.click(Create);

		await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeDefined()
		})
	})
	
})