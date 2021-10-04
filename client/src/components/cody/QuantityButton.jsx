import React from 'react';
import {CartButtonWrapper30} from './StyleHelpers';

const QuantityButton = ({currentSize, setCurrentSize, currentStyle}) => {
  const max = currentStyle?.style.skus[currentSize]?.quantity;
  const options = [];
  if (max) {
    for (let i = 1; i < Math.min(max + 1, 16); i++) {
      options.push(<option value={i} key={i}>{i}</option>);
    }
  }
  return (
    <CartButtonWrapper30 as='select' id='quantity'>
      {options.length ? options : <option value='0'>-</option>}
    </CartButtonWrapper30>
  );
};

export default QuantityButton;