import { h } from 'preact';
import { render, fireEvent, waitFor, screen } from '@testing-library/preact';
import SideBar from '../../../src/components/sideBar/index'
import * as axios from 'axios';
import App from '../../../src/components/app.js';
import { route } from 'preact-router'
import { setUserToken } from '../../../src/config/api/auth'
import SuccessRate from '../../../src/components/success_rate';

jest.mock('axios');

describe('Test success rate', () => {

  test('When render, then succes', async () => {
    const {container} = render(<SuccessRate success={2} failed={0}/>);

    await waitFor(() => {
      expect(container.getElementsByClassName("green-bar").length).toBe(1)
    })
  });

  test('When render, then there are success and failed', async () => {
    const {container} = render(<SuccessRate success={2} failed={2}/>);

    await waitFor(() => {
      expect(container.getElementsByClassName("yellow-bar").length).toBe(1)
    })
  });

  test('When render, then there are success and failed pt.2,', async () => {
    const {container} = render(<SuccessRate success={2} failed={1}/>);

    await waitFor(() => {
      expect(container.getElementsByClassName("yellow-bar").length).toBe(1)
    })
  });

  test('When render, then there are success and failed pt.3', async () => {
    const {container} = render(<SuccessRate success={1} failed={2}/>);

    await waitFor(() => {
      expect(container.getElementsByClassName("yellow-bar").length).toBe(1)
    })
  });

  test('When render, then failed', async () => {
    const {container} = render(<SuccessRate success={0} failed={2}/>);

    await waitFor(() => {
      expect(container.getElementsByClassName("red-bar").length).toBe(1)
    })
  });

  test('When render, then nothing', async () => {
    const {container} = render(<SuccessRate success={0} failed={0}/>);

    await waitFor(() => {
      expect(container.getElementsByClassName("grey-bar").length).toBe(1)
    })
  });

})