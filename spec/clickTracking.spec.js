/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import QuestionsList from '../client/src/questions/QuestionsList';
import App from '../client/src/index';
import product from './mochData';
import useClickTracking from '../client/src/useClickTracking';

describe('click tracker', () => {
  test('tracks clicks', () => {
    render(<App onClick={useClickTracking} />);
    // expect the click message to be sent to be logged
  });
});