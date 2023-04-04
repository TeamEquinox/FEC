/* eslint-disable react/prop-types */
import React from 'react';
import { SingleBarDisplay, MultiBarDisplay } from '../helpers/barDisplay';

function ProductBreakdown({ meta }) {
  const comfort = meta.characteristics.Comfort
    ? ((meta.characteristics.Comfort.value / 5) * 100) : null;
  const length = meta.characteristics.Length
    ? ((meta.characteristics.Length.value / 5) * 100) : null;
  const width = meta.characteristics.Width
    ? ((meta.characteristics.Width.value / 5) * 100) : null;
  const quality = meta.characteristics.Quality
    ? ((meta.characteristics.Quality.value / 5) * 100) : null;
  const size = meta.characteristics.Size
    ? ((meta.characteristics.Size.value / 5) * 100) : null;
  const fit = meta.characteristics.Fit
    ? ((meta.characteristics.Fit.value / 5) * 100) : null;

  return (
    <div style={{ width: '300px' }}>
      <SingleBarDisplay element={comfort} headerText="Comfort" lowRating="Physical Pain" highRating="Nirvana" />
      <SingleBarDisplay element={length} headerText="Length" lowRating="Shorties" highRating="Giants" />
      <MultiBarDisplay element={width} headerText="Width" />
      <MultiBarDisplay element={quality} headerText="Quality" />
      <MultiBarDisplay element={size} headerText="Size" />
      <MultiBarDisplay element={fit} headerText="Fit" />
      <br />
    </div>
  );
}

export default ProductBreakdown;
