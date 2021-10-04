import React from 'react';
import {CartButtonWrapper30} from './StyleHelpers';

const QuantityButton = ({currentSize, currentStyle}) => {
  const max = currentStyle?.style.skus?.[currentSize]?.quantity;
  const options = [];
  if (max) {
    for (let i = 1; i < Math.min(max + 1, 16); i++) {
      options.push(<option value={i} key={i}>{i}</option>);
    }
  }
  return (
    options.length ?
    <CartButtonWrapper30 as='select' id='quantity'>
      {options}
    </CartButtonWrapper30>:
    <CartButtonWrapper30 as='select' id='quantity' disabled>
      <option value='0'>-</option>
    </CartButtonWrapper30>
  );
};

export default QuantityButton;
