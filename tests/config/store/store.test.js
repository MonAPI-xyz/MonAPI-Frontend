import { h } from 'preact';
import { connect, Provider } from 'unistore/preact';
import actions, { store } from '../../../src/config/store/store.js';
import { render, fireEvent, screen} from '@testing-library/preact';

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