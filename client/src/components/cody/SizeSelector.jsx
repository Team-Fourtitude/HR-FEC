import React from 'react';
import {CartButtonWrapper60} from './StyleHelpers';
import {closeSelect} from './utilFunctions';

const SizeSelector = ({functions, data}) => {
  const {setCurrentSize, setPrompt} = functions;
  const {currentSize, currentStyle, styleSizes} = data;
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
        value={currentSize || 'null'}
        onChange={handleChange}
        onBlur={closeDropdown}
      >
        {<option value='null'>SELECT SIZE</option>}
        {options}
      </CartButtonWrapper60> :
      <CartButtonWrapper60 as='select' id='size'
        value='null' disabled
      >
        <option value='null'>OUT OF STOCK</option>
      </CartButtonWrapper60>
  );
};

export default SizeSelector;