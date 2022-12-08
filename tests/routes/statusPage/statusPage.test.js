import { h } from 'preact';
import { render, waitFor, screen, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event'
import * as axios from 'axios';
import { getCurrentUrl } from 'preact-router';
import StatusPage from '../../../src/routes/statusPage';

jest.mock('axios')

describe('Test input status page', () => {

  test('When user fill the save url, then failed', async () => {

    axios.get.mockImplementation((url) => {
        if (url.includes('/config/')) {
            return Promise.resolve({ data: {
                path: ""
            } }) 
        }
        if (url.includes('/status-page/category/')) {
            return Promise.resolve({ data: [
                {
                    id: 1,
                    team: 14,
                    name: "new category"
                }
            ] }) 
        }
    })
    
    axios.post.mockImplementation(() => Promise.reject({
        response: {
            data: {
                path: [
                    "status page configuration with this path already exists."
                ]
            }
        }
    }))

	render(<StatusPage />);

    const pathField = await screen.findByPlaceholderText('custompath');
    userEvent.type(pathField, 'abcee')

    const save = screen.getByText('Save');
    userEvent.click(save);
	await waitFor(() => {
      expect(getCurrentUrl()).toBe('/')
      expect(screen.getByText("status page configuration with this path already exists.")).toBeDefined()
	});
    })

    test('When user fill the save url, then success', async () => {
        const response = {
            path: "abceef"
        }
       
        axios.get.mockImplementation((url) => {
            if (url.includes('/config/')) {
                return Promise.resolve({ data: {
                    path: ""
                } }) 
            }
            if (url.includes('/status-page/category/')) {
                return Promise.resolve({ data: [
                    {
                        id: 1,
                        team: 14,
                        name: "new category"
                    }
                ] }) 
            }
        })
        axios.post.mockImplementation((url) => {
            if (url.includes('/status-page/config/')) {
                return Promise.resolve({data: response, status: 201})
            }
        })
    
        const container = render(<StatusPage />);
    
        const pathField = await screen.findByPlaceholderText('custompath');
        userEvent.type(pathField, 'abceef')
    
        const save = screen.getByText('Save');
        userEvent.click(save);
        await waitFor(() => {
          expect(getCurrentUrl()).toBe('/')
          expect(pathField.value).toBe('abceef')
          expect(screen.getByText('Success update URL for status page')).toBeDefined()
        });
    })

    test('When user fill the save url, then show loading spinner', async () => {
        const response = {
            path: "abceef"
        }
       
        axios.get.mockImplementation((url) => {
            if (url.includes('/config/')) {
                return Promise.resolve({ data: {
                    path: ""
                } }) 
            }
            if (url.includes('/status-page/category/')) {
                return Promise.resolve({ data: [
                    {
                        id: 1,
                        team: 14,
                        name: "new category"
                    }
                ] }) 
            }
        })
        axios.post.mockImplementation((url) => {
            if (url.includes('/status-page/config/')) {
                return new Promise((resolve) => {
                    setTimeout(()=> resolve({data: response, status: 201}), 3000)
                })   
            }
        })
    
        const container = render(<StatusPage />);
    
        const pathField = await screen.findByPlaceholderText('custompath');
        userEvent.type(pathField, 'abceef')
    
        const save = screen.getByText('Save');
        userEvent.click(save);
        await waitFor(() => {
          expect(screen.getByText('Loading...')).toBeDefined()
        });
    })

    test('When empty category show message no category', async () => {
        axios.get.mockImplementation((url) => {
            if (url.includes('/config/')) {
                return Promise.resolve({ data: {
                    path: ""
                } }) 
            }
            if (url.includes('/status-page/category/')) {
                return Promise.resolve({ data: []}) 
            }
        })
    
        render(<StatusPage />);
    
        await waitFor(() => {
          expect(screen.getByText('No Category Exists')).toBeDefined()
        });
    })

    test('When user add new category , then success', async () => {
        const response = {
            id: 2,
            team: 14,
            name: "abc"
        }
        let isCreated = false;
        axios.get.mockImplementation((url) => {
            if (url.includes('/config/')) {
                return Promise.resolve({ data: {
                    path: ""
                } }) 
            }
            if (url.includes('/status-page/category/')) {
                return Promise.resolve({ data: isCreated ? [
                    {
                        id: 1,
                        team: 14,
                        name: "new category"
                    },
                    {
                        id: 2,
                        team: 14,
                        name: "abc"
                    }
                    ] : [
                        {
                            id: 1,
                            team: 14,
                            name: "new category"
                        }
                    ] }) 
            }
        })
        axios.post.mockImplementation((url) => {
            if (url.includes('/status-page/category/')) {
                isCreated = true
                return Promise.resolve({data: response, status: 201})
            }
        })
    
        render(<StatusPage />);
    
        const pathField = await screen.findByPlaceholderText('Category Name');
        userEvent.type(pathField, 'abc')
    
        const save = screen.getByText('Create');
        userEvent.click(save);
        await waitFor(() => {
          expect(getCurrentUrl()).toBe('/')
          expect(screen.getByText("abc")).toBeDefined()
        });
    })

    test('When user add new category then show loading spinner', async () => {
        const response = {
            id: 2,
            team: 14,
            name: "abc"
        }
        let isCreated = false;
        axios.get.mockImplementation((url) => {
            if (url.includes('/config/')) {
                return Promise.resolve({ data: {
                    path: ""
                } }) 
            }
            if (url.includes('/status-page/category/')) {
                return Promise.resolve({ data: isCreated ? [
                    {
                        id: 1,
                        team: 14,
                        name: "new category"
                    },
                    {
                        id: 2,
                        team: 14,
                        name: "abc"
                    }
                    ] : [
                        {
                            id: 1,
                            team: 14,
                            name: "new category"
                        }
                    ] }) 
            }
        })
        axios.post.mockImplementation((url) => {
            if (url.includes('/status-page/category/')) {
                isCreated = true
                return new Promise((resolve) => {
                    setTimeout(()=> resolve({data: response, status: 201}), 3000)
                })
            }
        })
    
        render(<StatusPage />);
    
        const pathField = await screen.findByPlaceholderText('Category Name');
        userEvent.type(pathField, 'abc')
    
        const save = screen.getByText('Create');
        userEvent.click(save);
        await waitFor(() => {
          expect(screen.getByText('Loading...')).toBeDefined()
        });
    })
}
)