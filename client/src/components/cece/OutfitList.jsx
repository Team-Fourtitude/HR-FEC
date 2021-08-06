import React, { useState, useContext, useEffect, useRef } from 'react';
import ProductContext from '../context/ProductContext.jsx';
import StylesContext from '../context/StylesContext.jsx';
import OutFitCard from './OutFitCard.jsx';
import { FaPlus, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { OutfitRoot, OutFitTitle, OutFitCarousel, OutfitCarouselContainer, AddCard, AddText } from './Styled/Outfit.jsx';


const OutfitList = () => {
const { product } = useContext(ProductContext);
const { styles } = useContext(StylesContext);
const [ left, setLeft] = useState('disabled');
const [ right, setRight] = useState('');
const [card, setCard] = useState([]);
const ref = useRef(null);


  //sets state if localStorage has properties
  useEffect( () => {
    if (localStorage.length) {
      let items = Object.keys(localStorage).map((id) => JSON.parse(localStorage.getItem(id)));
      setCard(card.concat(items));
    }
  }, []);


  const handleClick = () => {
    if (!localStorage.getItem(product.id)) {
      let defaultStyle = styles.results.filter(item => item[`default?`]);

      if (defaultStyle.length) {
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
    }
  }

  const handleArrowClick = (direction) => {
    if (direction === 'left') {
      ref.current.scrollLeft -= 200;
    } else {
      ref.current.scrollLeft += 200;
    }

    if (ref.current.scrollLeft > ref.current.offsetWidth || ref.current.scrollLeft > 500) {
      setRight('disabled')
    } else {
      setRight('next');
    }

    if (!ref.current.scrollLeft) {
      setLeft('disabled')
    } else {
      setLeft('prev');
    }
  }


  const renderOutfit = (outfitCard) => {
      return <OutFitCard key={product.id} product={outfitCard} style={outfitCard} card={card} setCard={setCard}/>
  }

  useEffect( () => {
    renderOutfit();
  }, [card])


  return (
    <>
     <OutfitRoot>
        <OutFitTitle>
          Your Outfit
        </OutFitTitle>
        <OutfitCarouselContainer>
          <FaAngleLeft
            className="prev"
            id={left}
            onClick={() => handleArrowClick('left')} />
          <OutFitCarousel ref={ref}>
            <AddCard >
              <FaPlus id="add" onClick={handleClick}/>
              <AddText onClick={handleClick}>
                Add To Outfit
              </AddText>
            </AddCard>
              {card.map(renderOutfit)}
          </OutFitCarousel>
          <FaAngleRight className="next" id={right} onClick={() => handleClick('right')}/>
        </OutfitCarouselContainer>
      </OutfitRoot>
    </>
  );
}

export default OutfitList;