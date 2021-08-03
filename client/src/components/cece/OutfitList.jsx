import React, { useState, useContext, useEffect } from 'react';
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

  //sets state if localStorage has properties
  useEffect( () => {
    if (localStorage.length) {
      let items = Object.keys(localStorage).map((id) => JSON.parse(localStorage.getItem(id)));
      console.log('first render', items)
      setCard(card.concat(items));
    }
  }, [])


  const handleClick = () => {
    if (!localStorage.getItem(product.id)) {
      let defaultStyle = styles.results.filter(item => item[`default?`]);
      if (defaultStyle) {
        let combined = Object.assign(defaultStyle[0], product);
        localStorage.setItem(product.id, JSON.stringify(combined));
        console.log('added default to storage: ', product.id)
        setCard([...card, combined]);
      } else {
        let combined = Object.assign(styles.results[0], product);
        localStorage.setItem(product.id, JSON.stringify(combined));
        console.log('added to storage: ', product.id)
        setCard([...card, combined]);
      }
      setAdd(true);
    }
  }

  const renderOutfit = (outfitCard) => {
      return <OutFitCard key={product.id} product={outfitCard} style={outfitCard}/>
  }

  useEffect( () => {
    renderOutfit();
  }, [card])


  return (
    <>
    {console.log('card', card)}
      <h4 id="outfit-title">Your Outfit</h4>
      <div className="add-outfit-card-container">
        <div className='add-card' onClick={handleClick}>
            <FaPlus id="add" />
            <div className="add-to-outfit">Add To Outfit</div>
        </div>
          {card.map(renderOutfit)}
      </div>
    </>
  );
}

export default OutfitList;