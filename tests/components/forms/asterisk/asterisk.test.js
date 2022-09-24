import { h } from 'preact';
import { render } from '@testing-library/preact';
import { fireEvent, waitFor} from '@testing-library/preact';
import Asterisk from '../../../../src/components/forms/asterisk/index.js';

describe('Test Asterisk', () => {

    test('not required asterisk', async () => {
		const { container } = render(
        <Asterisk
            isRequired={false}
        />);
        
        await waitFor( ()=> {
            expect(container.innerHTML).toEqual('')
        })
	});
})