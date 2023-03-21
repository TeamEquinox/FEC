/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import QuestionsList from '../client/src/questions/QuestionsList.jsx';
import product from './mochData.js';

describe('Questions', () => {
  test('renders Questions component', () => {
    const { getByText } = render(<QuestionsList product_id={product.product[0]['id']} />);
    expect(getByText(/Ask a question!/i)).toBeInTheDocument();

    // screen.debug();
  });
});