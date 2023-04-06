/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

function DropdownSelector(props) {
  const {
    element, formData, tempCharStorage, handleInputChange,
  } = props;

  return (
    <select
      name={element}
      value={formData.characteristics[tempCharStorage[element]]}
      onChange={(e) => handleInputChange(e, element)}
      required
    >
      <option value="">-- Select --</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  );
}

export default DropdownSelector;
