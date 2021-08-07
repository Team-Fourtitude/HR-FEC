import React, { useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import { OFCard, ImageView, OutFitImg, OutFitInfo, CatAndPrice, StarRating } from './Styled/Outfit.jsx';
import Rating from './RelatedRatings.jsx';


const OutFitCard = ({ style, card, setCard }) => {
  const [ outfit, setOutfit ] = useState({ style })
  const [ toggle, setToggle ] = useState(true);


  const handleDelete = () => {
    localStorage.removeItem(Number(outfit.style.id));
    console.log('removed: ', Number(outfit.style.id))
    setToggle(false);
    const found = card.find((id) => id.id === outfit.style.id);
    card.splice(card.indexOf(found), 1);
    setCard(card);
  }

  return(
    <>
    {toggle ?
    <OFCard>
      <FaRegWindowClose id="delete" onClick={handleDelete}/>
      {outfit && outfit.style.photos ?
      <ImageView>
        <OutFitImg src={outfit.style.photos[0].thumbnail_url} alt="main" />
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
        <Rating item={outfit.style}/>
      </StarRating>
    </OFCard>
    : null}
    </>
  );
}

export default OutFitCard;