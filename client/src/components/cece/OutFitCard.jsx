import React, {useState} from 'react';

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
        <div className="delete">
          <button id="delete" value={outfit.product.product_id} onClick={handleDelete}>X</button>
        </div>
        <div>
          {outfit && outfit.style.photos ? <img className="outfit-img" src={outfit.style.photos[0].thumbnail_url} /> : null}<br /><br />
          {outfit ? outfit.product.category : null}<br /><br />
          {outfit ? outfit.product.name : null}<br /><br />
          {outfit ? outfit.style.original_price : null}
        </div>
        </div>
        : null}
        </>
  );
}

export default OutFitCard;