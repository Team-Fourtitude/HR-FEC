import React from 'react';
import {CartButtonWrapper75} from './StyleHelpers';
import {promptSelectSize} from './utilFunctions';

const AddBag = ({setPrompt}) => {
  const handleClick = (ev) => {
    ev.preventDefault();
    const size = document.getElementById('size').value;
    if (size !== 'null') {
      // add functionality to submit information to user cart
      const quantity = document.getElementById('quantity').value;
      console.log(size);
      console.log(quantity);
    } else {
      promptSelectSize(setPrompt);
    }
  };
  return (
    <CartButtonWrapper75 as='button' type='submit'
      onClick={handleClick}
    >
      ADD TO BAG
    </CartButtonWrapper75>
  );
};

export default AddBag;
