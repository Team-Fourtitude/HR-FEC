import React from 'react';
import {CartButtonWrapper60} from './StyleHelpers';

const SizeSelector = ({functions, styleSizes, currentStyle}) => {
  const {setCurrentSize, setPrompt, closeSelect} = functions;
  const closeDropdown = (event) => {
    setPrompt(null);
    closeSelect(event);
  };
  const handleChange = (event) => {
    setCurrentSize(event.target.value);
    closeDropdown(event);
    const quantity = document.getElementById('quantity');
    quantity.value = 1;
  };
  const skus = currentStyle.style.skus;
  const options = styleSizes?.map((sizeID) =>
    <option key={sizeID} value={sizeID}>{skus[sizeID].size}</option>
  );
  return (
    options.length ?
      <CartButtonWrapper60 as='select' id='size'
        onChange={handleChange}
        onBlur={closeDropdown}
      >
        {options}
      </CartButtonWrapper60> :
      <CartButtonWrapper60 as='select' id='size' disabled>
        <option value='null'>OUT OF STOCK</option>
      </CartButtonWrapper60>
  );
};

export default SizeSelector;