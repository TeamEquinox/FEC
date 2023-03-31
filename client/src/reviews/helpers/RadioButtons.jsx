/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

function RadioButtons(props) {
  const { element, formData, handleInputChange } = props;

  return (
    <div>
      <label>
        <input
          type="radio"
          name={element}
          value="1"
          checked={formData.characteristics[element].value === '1'}
          onChange={handleInputChange}
        />
        1
      </label>
      <label>
        <input
          type="radio"
          name={element}
          value="2"
          checked={formData.characteristics[element].value === '2'}
          onChange={handleInputChange}
        />
        2
      </label>
      <label>
        <input
          type="radio"
          name={element}
          value="3"
          checked={formData.characteristics[element].value === '3'}
          onChange={handleInputChange}
        />
        3
      </label>
      <label>
        <input
          type="radio"
          name={element}
          value="4"
          checked={formData.characteristics[element].value === '4'}
          onChange={handleInputChange}
        />
        4
      </label>
      <label>
        <input
          type="radio"
          name={element}
          value="5"
          checked={formData.characteristics[element].value === '5'}
          onChange={handleInputChange}
        />
        5
      </label>
    </div>
  );
}

export default RadioButtons;
