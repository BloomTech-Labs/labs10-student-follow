import React from 'react';
import { render } from 'react-testing-library';
import LandingPage from '../containers/LandingPage';

describe(`-- Using Props Correctly --`, () => {
  test('displays list of people names', () => {
    const people = [{ firstname: 'Phil', id: 1 }, { firstname: 'Greg', id: 2 }];
    const { container } = render(<LandingPage people={people} />);
    expect(container.children[0].textContent).toBe('Phil');
    expect(container.children[1].textContent).toBe('Greg');
  });
});
