import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegWindowClose } from 'react-icons/fa';
import { OFCard, ImageView, OutFitImg, OutFitInfo, CatAndPrice, StarRating } from './Styled/Outfit.jsx';
import Rating from '../cody/Rating.jsx';


const OutFitCard = ({ style }) => {
  const [ outfit, setOutfit ] = useState({ style })
  const [ toggle, setToggle ] = useState(true);


  const handleDelete = () => {
    localStorage.removeItem(Number(outfit.style.id));
    console.log('removed: ', Number(outfit.style.id))
    setToggle(false);
  }

  return(
    <>
    {toggle ?
    <OFCard>
      <FaRegWindowClose id="delete" onClick={handleDelete}/>
      {outfit && outfit.style.photos ?
      <ImageView>
        <OutFitImg src={outfit.style.photos[0].thumbnail_url} />
      </ImageView>
      : null}
      <OutFitInfo>
        <CatAndPrice>
          [ {outfit ? outfit.style.category : null} ]
        </CatAndPrice><br />
        {outfit ? outfit.style.name : null}<br />
        <CatAndPrice>
          {outfit ? outfit.style.original_price : null}
        </CatAndPrice>
      </OutFitInfo>
      <StarRating>
        <Rating />
      </StarRating>
    </OFCard>
    : null}
    </>
  );
}

export default OutFitCard;