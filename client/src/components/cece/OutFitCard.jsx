import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegWindowClose } from 'react-icons/fa';


const OutFitCard = ({product, style}) => {
  const [outfit, setOutfit] = useState({product, style})
  const [canSee, setToggle] = useState(true);
  console.log(outfit)

  const handleDelete = () => {
    setToggle(false);
    setOutfit({});
  }

  return(
    <>
    {canSee ?
    <div className="outfit-card">
          {/* <button id="delete" value={outfit.product.product_id} onClick={handleDelete}>X</button> */}
          <FaRegWindowClose id="delete" value={outfit.product.product_id} onClick={handleDelete}/>
            {outfit && outfit.style.photos ?
            <div className="square">
              <img className="outfit-img" src={outfit.style.photos[0].thumbnail_url} />
            </div>
              : null}
              <p className="outfit-info">
                <span>[ {outfit ? outfit.product.category : null} ]</span><br />
                {outfit ? outfit.product.name : null}<br />
                <span>{outfit ? outfit.style.original_price : null}</span>
              </p>
          <div className="starRating">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
            <FaRegStar />
          </div>
        </div>
        : null}
        </>
  );
}

export default OutFitCard;