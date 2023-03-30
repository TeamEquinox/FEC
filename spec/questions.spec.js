/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import axios from 'axios';
import QuestionsList from '../client/src/questions/QuestionsList';
import QuestionBox from '../client/src/questions/QuestionBox';
import data from './mochData';


describe('Questions List', () => {

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('renders Questions component', () => {
    act(() => {
    render(<QuestionsList />);
    });
    expect(screen.getByText('Questions')).toBeInTheDocument();
  });

  test('renders ask a question button', () => {
    act(() => {
      render(<QuestionsList />);
    });
    expect(screen.getByText(/ask a question/i)).toBeInTheDocument();
  });

  test('informs that there are no questions when none are passed', () => {
    act(() => {
      render(<QuestionsList />);
    });
    expect(screen.getByText(/No questions yet.../i)).toBeInTheDocument();
  });

  test('renders an individual question with desired data', () => {
    act(() => {
      render(<QuestionBox
        question={data.questions.results[0]}
        product_id={data.questions.product_id}
        key={data.questions.results[0].question_id}
      />);
    });
    expect(screen.getByText(/justin/i)).toBeInTheDocument();
  });

  test('opens question modal when ask question button is clicked', () => {
    act(() => {
      render(<QuestionsList />);
      fireEvent.click(screen.getByText(/ask a question/i));
    });
    expect(screen.getByLabelText(/nickname/i)).toBeInTheDocument();
  })
});
