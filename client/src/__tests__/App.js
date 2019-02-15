import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { render, cleanup } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import App from '../App';

// automatically unmount and cleanup DOM after test is finished
afterEach(cleanup);

describe('-- Default Test --', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

// === React Router Tests === //
// function needed for react router tests
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests
    history,
  };
}
describe('-- React Router --', () => {
  describe('- Landing page at route "/teachers"', () => {
    test('shows Loading... text before axios call', async () => {
      const { container } = renderWithRouter(<App />, {
        route: '/',
      });
      expect(container.innerHTML).toMatch('Loading...');
    });
  });
});
