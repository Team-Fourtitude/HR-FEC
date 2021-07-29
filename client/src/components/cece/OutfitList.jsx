import React, { useState, useContext } from 'react';
import axios from 'axios';
import ProductContext from '../context/ProductContext.jsx';
import StylesContext from '../context/StylesContext.jsx';
import OutFitCard from './OutFitCard.jsx';


const OutfitList = () => {
const {product, setProduct} = useContext(ProductContext);
const { styles, setStyles } = useContext(StylesContext);
const [card, setCard] = useState({});
const [add, setAdd] = useState(false);

  const handleClick = () => {
    axios.get(`http://localhost:3000/products/${product.id}/styles`)
    .then( (styles) => {
      let defaultStyle = styles.data.results.filter(item => item[`default?`])
      setCard(defaultStyle[0]);
    })
    .then( () => setAdd(true))
    .catch( (err) => console.log(err))
    //need to refactor this, add local storage
    setAdd(false);
  }


  return (

    <div className="add-outfit-card-container">

      <div className='add-card'>
        <div>
          <button className="add" onClick={handleClick}>+</button>
        </div>
          <div className="add-to-outfit">Add To Outfit</div>
      </div>
        {add ? <OutFitCard product={product} style={card}/> : null}
    </div>

  );
}

export default OutfitList;