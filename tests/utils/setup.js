import { render } from '@testing-library/preact';
import userEvent from '@testing-library/user-event'
// setup function
export const setup = (jsx) => {
	return {
	  user: userEvent.setup(),
	  ...render(jsx),
	}
  }
