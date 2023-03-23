/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import QuestionsList from '../client/src/questions/QuestionsList.jsx';
import product from './mochData.js';

describe('Questions List', () => {

  test('renders Questions component', () => {
    render(<QuestionsList />);
    expect(screen.getByText('Questions')).toBeInTheDocument();
  });

  test('renders ask a question button', () => {
    // screen.debug();
    render(<QuestionsList />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  })
});