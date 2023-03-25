import React, { useState, useEffect } from 'react';

const useClickTracking = () => {
  // initialize state to empty object
  // **NOTE** may need to initialize obj with the properties targeting
  const [clickData, setClickData] = useState({});

  // use Effect on load
  useEffect(() => {
    // handle click fn to update state with gathered data
    var handleClick = (e) => {
      // collect various parts of event object to be target data
      /*
        widget (string)
        element (string)
        time (string)
      */
     // update state with the collect event datas
    }
  }, [])

  return clickData;
}

export default useClickTracking;