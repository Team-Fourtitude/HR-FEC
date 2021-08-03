import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegWindowClose } from 'react-icons/fa';


const OutFitCard = ({product, style}) => {
  const [outfit, setOutfit] = useState({product, style})
  const [canSee, setToggle] = useState(true);
  console.log(outfit)

  // const handleDelete = () => {
  //   setToggle(false);
  //   setOutfit({});
  // }

  const handleDelete = () => {
    localStorage.removeItem(Number(outfit.product.id));
    console.log('removed: ', Number(outfit.product.id))
    setToggle(false);
  }

  return(
    <>
  {/* {console.log('help', localStorage.getItem(25171))} */}
    {/* {console.log('longone', outfit.product.id)} */}
    {/* {canSee ? */}
    <div className="outfit-card">
      <FaRegWindowClose id="delete" value={outfit.product.id} onClick={handleDelete}/>
      {outfit && outfit.style.photos ?
      <div className="square">
        <img className="outfit-img" src={outfit.style.photos[0].thumbnail_url} />
      </div>
      : null}
      <p className="outfit-info">
        <span className="cat">[ {outfit ? outfit.product.category : null} ]</span><br />

        {outfit ? outfit.product.name : null}<br />
        <span className="price">{outfit ? outfit.style.original_price : null}</span>
      </p>
      <div className="starRating">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
        <FaRegStar />
      </div>
    </div>
    {/* : null} */}
    </>
  );
}

export default OutFitCard;