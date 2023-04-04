/* eslint-disable react/prop-types */
import React from 'react';

/*
*   Displays the different bars in the rating breakdown section. MultiBarDisplay takes in
*   the element to be displayed and the title of the section. SingleBarDisplay takes in
*   the element, title, the lowerRating, and higherRating to be shown
*/

function HorizontalLine() {
  const lineStyle = {
    height: '10px',
    backgroundColor: '#b1b1b1',
    border: 'none',
    borderRadius: '5px',
    marginRight: '2px',
  };
  return (
    <hr style={lineStyle} />
  );
}

// rating marker
function VerticalLine() {
  const lineStyle = {
    height: '10px',
    width: '5px',
    backgroundColor: '#000000',
    border: 'none',
    borderRadius: '5px',
    marginRight: '2px',
  };
  return (
    <hr style={lineStyle} />
  );
}

export function MultiBarDisplay({ element = 0, headerText }) {
  return (
    <div>
      {element && (
        <>
          <h4>{ headerText }</h4>
          <div style={{
            display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px', position: 'relative',
          }}
          >
            <div style={{ width: '33.33%', zIndex: 1 }}>
              <div style={{ position: 'relative' }}>
                <HorizontalLine />
                <div style={{
                  fontSize: '15px', textAlign: 'left', marginTop: '-3px', marginLeft: '3px',
                }}
                >
                  Poor
                </div>
              </div>
            </div>
            <div style={{ width: '33.33%', zIndex: 1 }}>
              <div style={{ position: 'relative' }}>
                <HorizontalLine />
                <div style={{ fontSize: '15px', textAlign: 'center', marginTop: '-5px' }}>Good</div>
              </div>
            </div>
            <div style={{ width: '33.33%', zIndex: 1 }}>
              <div style={{ position: 'relative' }}>
                <HorizontalLine />
                <div style={{
                  fontSize: '15px', textAlign: 'right', marginTop: '-5px', marginRight: '5px',
                }}
                >
                  Excellent
                </div>
              </div>
            </div>
            <div style={{
              position: 'absolute', left: `${element}%`, marginLeft: '-1px', zIndex: 2,
            }}
            >
              <VerticalLine />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function SingleBarDisplay({
  element = 0, headerText, lowRating, highRating,
}) {
  return (
    <div>
      {element && (
        <>
          <h4>{ headerText }</h4>
          <div style={{
            display: 'flex', justifyContent: 'left', alignItems: 'flex-start', marginTop: '-25px', position: 'relative',
          }}
          >
            <div style={{ width: '100%', position: 'relative' }}>
              <HorizontalLine />
              <div style={{
                fontSize: '15px', textAlign: 'left', marginTop: '-5px', marginLeft: '5px',
              }}
              >
                {lowRating}
              </div>
              <div style={{
                fontSize: '15px', textAlign: 'right', marginTop: '-14px', marginRight: '5px',
              }}
              >
                {highRating}
              </div>
            </div>
            <div style={{
              position: 'absolute', left: `${element}%`, top: '0', bottom: '0', marginLeft: '-1px', zIndex: 2,
            }}
            >
              <VerticalLine />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
