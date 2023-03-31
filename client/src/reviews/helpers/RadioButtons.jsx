/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

function RadioButtons(props) {
  const {
    element, formData, tempCharStorage, handleInputChange,
  } = props;

  return (
    <div>
      <label>
        <input
          type="radio"
          name={element}
          value="1"
          checked={formData.characteristics[tempCharStorage[element]] === '1'}
          onChange={(e) => handleInputChange(e, element)}
        />
        1
      </label>
      <label>
        <input
          type="radio"
          name={element}
          value="2"
          checked={formData.characteristics[tempCharStorage[element]] === '2'}
          onChange={(e) => handleInputChange(e, element)}
        />
        2
      </label>
      <label>
        <input
          type="radio"
          name={element}
          value="3"
          checked={formData.characteristics[tempCharStorage[element]] === '3'}
          onChange={(e) => handleInputChange(e, element)}
        />
        3
      </label>
      <label>
        <input
          type="radio"
          name={element}
          value="4"
          checked={formData.characteristics[tempCharStorage[element]] === '4'}
          onChange={(e) => handleInputChange(e, element)}
        />
        4
      </label>
      <label>
        <input
          type="radio"
          name={element}
          value="5"
          checked={formData.characteristics[tempCharStorage[element]] === '5'}
          onChange={(e) => handleInputChange(e, element)}
        />
        5
      </label>
    </div>
  );
}

export default RadioButtons;
