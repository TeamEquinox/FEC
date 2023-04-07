/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import axios from 'axios';

const useClickTracking = () => {
  const [clickData, setClickData] = useState({});

  useEffect(() => {
    const handleClick = (e) => {
      const data = {};
      data.element = e.target.localName;
      data.widget = e.target.id;
      data.time = Date.now().toString();
      setClickData(data);
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
