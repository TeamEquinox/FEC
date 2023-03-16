/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import RelatedProducts from './client/src/related/RelatedProducts.jsx'; 
// import Product from './client/src/related/Products.jsx';


// test('use jsdom in this test file', () => {
//   const element = document.createElement('div');
//   expect(element).not.toBeNull();
// });

// test('renders component', () => {
//   const { getByText } = render(<RelatedProducts/>)
//   expect(getByText(/Name/)).not.toBeNull();
//   // screen.debug();
// })

describe('RelatedProduct', () => {
  
  it('Displays the related products component', () => {
    render(<RelatedProducts/>);
    screen.debug();
  })

    it('renders component', () => {
      render(<RelatedProducts/>)
      expect(screen.getByText(/Loading/)).toBeInTheDocument();
    })
    

    // it('renders component', () => {
    //   render(<RelatedProducts/>);
    //   expect(screen.getByText(/Name/)).toBe('Name');
    // })
  })
// })