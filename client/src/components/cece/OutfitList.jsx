import React, { useState, useContext } from 'react';
import axios from 'axios';
import ProductContext from '../context/ProductContext.jsx';
import StylesContext from '../context/StylesContext.jsx';
import OutFitCard from './OutFitCard.jsx';
import { FaPlus } from 'react-icons/fa';
// import uuid from 'uuid/v1';


const OutfitList = () => {
const {product, setProduct} = useContext(ProductContext);
const { styles, setStyles } = useContext(StylesContext);
const [card, setCard] = useState([]);
const [add, setAdd] = useState(false);

  // const handleClick = () => {
  //   axios.get(`http://localhost:3000/products/${product.id}/styles`)
  //   .then( (styles) => {
  //     let defaultStyle = styles.data.results.filter(item => item[`default?`])
  //     setCard(defaultStyle[0]);
  //   })
  //   .then( () => setAdd(true))
  //   .catch( (err) => console.log(err))
  //   //need to refactor this, add local storage
  //   setAdd(false);
  // }
  const handleClick = () => {
    if (!localStorage.getItem(product.id)) {
      localStorage.setItem(product.id, product);

      console.log('added to storage: ', product.id)
      //style is not updating
      let defaultStyle = styles.results.filter(item => item[`default?`]);
      setCard([...card, defaultStyle[0]]);
      setAdd(true);
    }
  }


  return (
    <>
    {console.log('card', card)}
      <h4 id="outfit-title">Your Outfit</h4>
      <div className="add-outfit-card-container">
        <div className='add-card' onClick={handleClick}>
            <FaPlus id="add" />
            <div className="add-to-outfit">Add To Outfit</div>
        </div>
          {localStorage.length ? card.map((outfitItem) =>
            <OutFitCard key={outfitItem.style_id} product={product} style={outfitItem}/>) : null}
      </div>
    </>
  );
}

export default OutfitList;