/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import QuestionsList from '../client/src/related/QuestionsList.jsx';
import product from './mochData.js';

