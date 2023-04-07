/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import axios from 'axios';

const useClickTracking = () => {
  // initialize state to empty object
  // **NOTE** may need to initialize obj with the properties targeting
  const [clickData, setClickData] = useState({});
  // console.log('useClickTracking invoked');

  // use Effect on load
  useEffect(() => {
    // console.log('inside useEffect');
    // handle click fn to update state with gathered data
    const handleClick = (e) => {
      // collect various parts of event object to be target data
      /*
      widget (string)
      element (string)
      time (string)
      */
      const data = {};
      data.element = e.target.localName;
      data.widget = e.target.id;
      data.time = Date.now().toString();
      // console.log('data', data);
      // update state with the collect event datas
      setClickData(data);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // use effect to send data to server
  useEffect(() => {
    axios.post('/clickTrack', clickData)
      .then(() => {
        // console.log('sent click data!', response);
      })
      .catch((err) => {
        console.log('error sending click data', err);
      });
  }, [clickData]);

  return clickData;
};

export default useClickTracking;
