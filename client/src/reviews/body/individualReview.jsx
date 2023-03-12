import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { CgLoadbar } from 'react-icons/cg';

import StarRating from '../../starRatings'



const IndividualReview = () => {

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

  return (
    <>
      <div>
        This is from the IndividualReview
      </div>
      <div style={{ width: '300px' }}>

        <h4>Size</h4>
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px' }}>
          <div style={{ width: '33.33%' }}>
            <HorizontalLine />
            <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '-5px' }}>Small</div>
          </div>
          <div style={{ width: '33.33%' }}>
            <HorizontalLine />
            <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '-5px' }}>Perfect</div>
          </div>
          <div style={{ width: '33.33%' }}>
            <HorizontalLine />
            <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '-5px' }}>Large</div>
          </div>
        </div>

        <h4>Comfort</h4>
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px' }}>
          <div style={{ width: '25%' }}>
            <HorizontalLine />
            <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '-5px' }}>Poor</div>
          </div>
          <div style={{ width: '25%' }}>
            <HorizontalLine />
          </div>
          <div style={{ width: '25%' }}>
            <HorizontalLine />
          </div>
          <div style={{ width: '25%' }}>
            <HorizontalLine />
            <div style={{ fontSize: '12px', textAlign: 'center', marginTop: '-5px' }}>Perfect</div>
          </div>
        </div>
      </div>
      {/* <div style={{ width: '200px' }}>

        <h4>Size</h4>
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-40px' }}>
          <div style={{ flexDirection: 'column', alignItems: 'center', marginRight: '0px', color: '#929292', flex: 1, width: '33.33%' }}>
            <CgLoadbar size={70} />
            <div style={{ fontSize: '12px', textAlign: 'center', marginLeft: '0px', marginTop: '-25px' }}>Small</div>
          </div>
          <div style={{ flexDirection: 'column', alignItems: 'center', margin: '0 0px', color: '#929292', flex: 1, width: '33.33%' }}>
            <CgLoadbar size={70} style={{ marginLeft: '0px', marginRight: '0px' }} />
            <div style={{ fontSize: '12px', textAlign: 'center', marginLeft: '0px', marginTop: '-25px' }}>Perfect</div>
          </div>
          <div style={{ flexDirection: 'column', alignItems: 'center', marginLeft: '-0px', color: '#929292', flex: 1, width: '33.33%' }}>
            <CgLoadbar size={70} />
            <div style={{ fontSize: '12px', textAlign: 'center', marginLeft: '0px', marginTop: '-25px' }}>Large</div>
          </div>
        </div>

        <h4>Comfort</h4>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '-40px' }}>
        <div style={{ flexDirection: 'column', alignItems: 'center', marginLeft: '-0px', color: '#929292', width: '25%' }}>
            <CgLoadbar size={60} />
            <div style={{ fontSize: '12px', marginLeft: '10px', marginTop: '-15px' }}>Poor</div>
          </div>
          <div style={{ flexDirection: 'column', alignItems: 'center', marginLeft: '-0px', color: '#929292', width: '25%' }}>
            <CgLoadbar size={60} style={{ marginLeft: '0px', marginRight: '0px' }} />
          </div>
          <div style={{ flexDirection: 'column', alignItems: 'center', marginLeft: '-0px', color: '#929292', width: '25%' }}>
            <CgLoadbar size={60} />
          </div>
          <div style={{ flexDirection: 'column', alignItems: 'center', marginLeft: '-0px', color: '#929292', width: '25%' }}>
            <CgLoadbar size={60} />
            <div style={{ fontSize: '12px', marginLeft: '10px', marginTop: '-15px' }}>Perfect</div>
          </div>
        </div>
      </div> */}

      <StarRating rating={3.8} pixels={15} style={{ marginTop: '10px' }} />
    </>
  );
};

export default IndividualReview;
