import { h } from 'preact';
import { render, waitFor, screen, fireEvent } from '@testing-library/preact';
import EditTeam from '../../../src/routes/editTeam';
import userEvent from '@testing-library/user-event'
import * as axios from 'axios';
import { getCurrentUrl } from 'preact-router';

jest.mock('axios')

describe('Test input', () => {

  test('When user fill the description, then success', async () => {
    const responseCurrentTeam = {
      "id": 47,
      "name": "team3",
      "logo": "/uploads/teamlogo/d35b869d-e411-4648-9fe8-e1a0700c4202.jpeg",
      "description": "des",
      "teammember": [
          {
              "team": 47,
              "user": {
                  "id": 16,
                  "username": "hugoirdev@gmail.com",
                  "email": "hugoirdev@gmail.com",
                  "first_name": "",
                  "last_name": ""
              },
              "verified": true
          }
      ]
  }
   
		axios.get.mockImplementation(() => {
      return Promise.resolve({data: responseCurrentTeam})
    })

		render(<EditTeam />);

    const response = {
      "id": 43,
      "name": "Hugoirdev"
    }

    const mockPut = jest.fn()
		axios.put.mockImplementation(() => {
      mockPut()
      return Promise.resolve({data: response})
    })
    const descField = await screen.findByPlaceholderText('Insert Team Description');
    userEvent.type(descField, 'teamdesc')

		const edit = screen.getByText('Save');
		userEvent.click(edit);
		await waitFor(() => {
      expect(getCurrentUrl()).toBe('/')
      expect(mockPut).toHaveBeenCalledTimes(0)
		});		
	});

  test('When empty image and update then success', async () => {
    const responseCurrentTeam = {
      "id": 47,
      "name": "team3",
      "logo": null,
      "description": "des",
      "teammember": [
          {
              "team": 47,
              "user": {
                  "id": 16,
                  "username": "hugoirdev@gmail.com",
                  "email": "hugoirdev@gmail.com",
                  "first_name": "",
                  "last_name": ""
              },
              "verified": true
          }
      ]
  }
   
		axios.get.mockImplementation(() => {
      return Promise.resolve({data: responseCurrentTeam})
    })

		render(<EditTeam />);

    const response = {
      "id": 43,
      "name": "Hugoirdev"
    }

    const mockPut = jest.fn()
		axios.put.mockImplementation(() => {
      mockPut()
      return Promise.resolve({data: response})
    })
    const descField = await screen.findByPlaceholderText('Insert Team Description');
    userEvent.type(descField, 'teamdesc')

		const edit = screen.getByText('Save');
		userEvent.click(edit);
		await waitFor(() => {
      expect(getCurrentUrl()).toBe('/')
      expect(mockPut).toHaveBeenCalledTimes(0)
		});		
	});

  test('When user fill inputs completely, then success', async () => {
		render(<EditTeam />);


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
      "id": 43,
      "name": "Hugoirdev"
    }

    const mockPut = jest.fn()
		axios.put.mockImplementation(() => {
      mockPut()
      return Promise.resolve({data: response})
    })
    
		const edit = screen.getByText('Save');
		userEvent.click(edit);

		await waitFor(() => {
      expect(mockPut).toHaveBeenCalledTimes(1);
		});		
	});

  test('When user upload image file size more than 10MB, then failed', async () => {
		render(<EditTeam />);

    global.URL.createObjectURL = jest.fn();

    // create new file that have size more than 10MB, specificly 10MB + 1b
    const imageFile = new File([new ArrayBuffer(1024 * 1024 * 10 + 1)], 'hello.png', { type: "image/png" });
    
    const fileField = await screen.findByPlaceholderText('Select Image');

    // test file input can upload image file
    userEvent.upload(fileField, imageFile)
    
		const edit = screen.getByText('Save');
		userEvent.click(edit);

		await waitFor(() => {
      expect(screen.getByText("Please choose image that the file size less than or equal to 10MB"))
		});		
	});

  test('When user click edit button, then show spinner to loading', async () => {
    
    let response = {
			"id": 43,
      "name": "Hugoirdev"
		}
		axios.put.mockImplementation(() => {
			return new Promise((resolve)=> {
				setTimeout(() =>  resolve({ 
					data: response
				}), 3000)
			})
		});
    		
		render(<EditTeam />);
		
    const descField = await screen.findByPlaceholderText('Insert Team Description');
    userEvent.type(descField, 'teamdesc')

		const edit = screen.getByText('Save');
		userEvent.click(edit);

		await waitFor(() => {
			expect(screen.getByText('Loading...'))
		})
	})
	
})