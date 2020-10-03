// import React from 'react';
//import { render } from '@testing-library/react';
// import About from './About';

const About = require('./About');

function sum(x, y) {
  return x + y;
}

describe('sum', () => {
  test('sums up two values', () => {
    expect(sum(2, 4)).toBe(6);
  });
});

// describe('About', () => {
//   test('renders About component', () => {
//     render(<About />);
//   });
// });
