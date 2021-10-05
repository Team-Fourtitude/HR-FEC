import React from 'react';
import {CartButtonWrapper15} from './StyleHelpers';
import {FaStar, FaRegStar} from 'react-icons/fa';

const AddFavorite = ({currentStyle, favorite, prompt}) => {
  const {fav, setFav} = favorite;
  const handleClick = (ev) => {
    ev.preventDefault();
    if (fav) setFav(false);
    else setFav(true);
    // implement logic to add item to favorites
    console.log('current style', currentStyle?.style.name);
    console.log('prompt', prompt);
  }
  return (
    <CartButtonWrapper15 as='button' type='submit'
      onClick={handleClick}
    >
      {fav ? <FaStar style={{color:'goldenrod'}} name='star-filled' /> :
      <FaRegStar style={{color:'grey'}} name='star-empty' />}
    </CartButtonWrapper15>
  );
};

export default AddFavorite;
