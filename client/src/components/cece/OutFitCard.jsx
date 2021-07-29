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
          <button id="delete" value={outfit.product.product_id} onClick={handleDelete}>X</button>
            {outfit && outfit.style.photos ?
            <div className="square">
              <img className="outfit-img" src={outfit.style.photos[0].thumbnail_url} />
            </div>
              : null}
          {outfit ? outfit.product.category : null}<br />
          {outfit ? outfit.product.name : null}<br />
          {outfit ? outfit.style.original_price : null}
        </div>
        : null}
        </>
  );
}

export default OutFitCard;