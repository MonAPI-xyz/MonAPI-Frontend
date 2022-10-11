import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import 'jest-canvas-mock';

configure({
	adapter: new Adapter()
});

const noop = () => {};

Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

global.ResizeObserver = jest.fn().mockImplementation(() => ({
	observe: jest.fn(),
	unobserve: jest.fn(),
	disconnect: jest.fn(),
}))