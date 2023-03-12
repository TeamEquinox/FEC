import React, { useState, useEffect } from 'react';
import StarRating from '../../starRatings'

const RatingBreakdown = () => {

  const HorizontalLine = () => {
    const lineStyle = {
      height: '10px',
      backgroundColor: '#929292',
      border: 'none',
      borderRadius: '5px',
      marginRight: '2px'
    };
    return (
      <hr style={lineStyle} />
    )
  }

  const VerticalLine = () => {
    const lineStyle = {
      height: '10px',
      width: '2px',
      backgroundColor: '#000000',
      border: 'none',
      borderRadius: '5px',
      marginRight: '2px'
    };
    return (
      <hr style={lineStyle} />
    )
  }

  return (
    <>
      <div>
        This is from RatingBreakdown
      </div>
      <div style={{ width: '300px' }}>
      <h3 style={{ fontWeight: 'bold' }}>Overall Rating</h3>
        <StarRating rating={3.8} pixels={15} style={{ marginTop: '-20px' }} />

        <h4>Size</h4>
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px', position: 'relative' }}>
          <div style={{ width: '33.33%', zIndex: 1 }}>
            <div style={{ position: 'relative' }}>
              <HorizontalLine />
              <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '-5px', marginLeft: '5px' }}>Small</div>
            </div>
          </div>
          <div style={{ width: '33.33%', zIndex: 1 }}>
            <div style={{ position: 'relative' }}>
              <HorizontalLine />
              <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '-5px' }}>Perfect</div>
            </div>
          </div>
          <div style={{ width: '33.33%', zIndex: 1 }}>
            <div style={{ position: 'relative' }}>
              <HorizontalLine />
              <div style={{ fontSize: '12px', textAlign: 'right', marginTop: '-5px', marginRight: '5px' }}>Large</div>
            </div>
          </div>
          <div style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', marginLeft: '-1px', zIndex: 2 }}>
            <VerticalLine />
          </div>
        </div>

        <h4>Comfort</h4>
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px', position: 'relative' }}>
          <div style={{ width: '100%', position: 'relative' }}>
            <HorizontalLine />
            <div style={{ fontSize: '12px', textAlign: 'left', marginTop: '-5px', marginLeft: '5px' }}>Poor</div>
            <div style={{ fontSize: '12px', textAlign: 'right', marginTop: '-14px', marginRight: '5px' }}>Perfect</div>
          </div>
          <div style={{ position: 'absolute', left: '75%', top: '0', bottom: '0', marginLeft: '-1px', zIndex: 2 }}>
            <VerticalLine />
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingBreakdown;