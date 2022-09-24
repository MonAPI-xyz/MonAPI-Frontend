import { h } from 'preact';
import { render } from '@testing-library/preact';
import { fireEvent, waitFor} from '@testing-library/preact';
import PasswordInput from '../../../../src/components/forms/passwordinput/index.js';

describe('Test PasswordInput', () => {
	
	test('reveal password', async () => {
		const { container } = render(
        <PasswordInput
            id="password"
            register={()=>{}}
            errors={[]}
            title="Password"
            placeholder='************'
            rules={{
                required: 'Wajib diisi',
                minLength: { value: 8, message: 'Minimum length should be 8' },
            }}
        />);
		const button = container.querySelector('#bsEye')

		fireEvent.click(button);
        
        await waitFor( ()=> {
            console.log('passwe',container.querySelector('#password').getAttribute('type'));
            expect(container.querySelector('#password').getAttribute('type')).toEqual('text')
        })
	});

    test('hide password', async () => {
		const { container } = render(
        <PasswordInput
            id="password"
            register={()=>{}}
            errors={[]}
            title="Password"
            placeholder='************'
            rules={{
                required: 'Wajib diisi',
                minLength: { value: 8, message: 'Minimum length should be 8' },
            }}
        />);
		const button = container.querySelector('#bsEye')

		fireEvent.click(button);
        fireEvent.click(button);
        
        await waitFor( ()=> {
            expect(container.querySelector('#password').getAttribute('type')).toEqual('password')
        })
	});
})