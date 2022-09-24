import { h } from 'preact';
import { render } from '@testing-library/preact';
import { connect, Provider } from 'unistore/preact';
import actions, { store } from '../../../src/config/store/store.js';
import { fireEvent, screen} from '@testing-library/preact';

describe('Test Store', () => {
    function GetUserButton({ onClick }) {
        return (
            <button data-testid='getUserButton' onClick={onClick}>getUser</button>
        );
    }
    const GetButton = connect('user', actions)(({getUser}) =>
        <GetUserButton onClick={getUser}/>
      );

	test('setup store', async () => {
		render(<Provider store={store}><GetButton /></Provider>);
        fireEvent.click(screen.getByTestId('getUserButton'));
	});

});