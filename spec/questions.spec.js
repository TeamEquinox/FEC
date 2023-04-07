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
import Search from '../client/src/questions/Search';
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
});

describe('Individual Question', () => {
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

  test('lets user know there are no answers when none are provided', () => {
    render(<QuestionBox
      question={data.questions.results[1]}
      product_id={data.questions.product_id}
      key={data.questions.results[1].question_id}
    />);
    expect(screen.getByText(/be the first to answer/i)).toBeInTheDocument();
  });
});

describe('asking a question', () => {
  test('opens question modal when ask question button is clicked', () => {
    act(() => {
      render(<QuestionsList />);
      fireEvent.click(screen.getByText(/ask a question/i));
    });
    expect(screen.getByText(/nickname/i)).toBeInTheDocument();
  });
});

describe('answering a question', () => {
  test('opens answer modal when answer question button is clicked', () => {
    render(<QuestionBox
      question={data.questions.results[1]}
      product_id={data.questions.product_id}
      key={data.questions.results[1].question_id}
    />);
    fireEvent.click(screen.getByText(/add answer/i));
    expect(screen.getByText(/nickname/i)).toBeInTheDocument();
  })
})

describe('Search', () => {
  const mockSet = jest.fn().mockResolvedValue({ data: [] });
  test('calls search function with query on change', () => {
    const mockSearch = jest.fn().mockResolvedValue({ data: [] });
    // axios.get.mockImplementation(mockSearch);

    render(<Search questions={data.questions.results} setQuestions={mockSet} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockSearch).toHaveBeenCalledTimes(2);
  });

  test('clears after clear button clicked', () => {
    const mockClear = jest.fn().mockResolvedValue({ data: data.questions.results });

    render(<Search questions={data.questions.results} setQuestions={mockSet} />);

    fireEvent.click(screen.getByText(/clear/i));
    expect(mockClear).toHaveBeenCalledTimes(1);
  })
})
