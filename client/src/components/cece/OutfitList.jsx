import React, { useState, useContext, useEffect, useRef } from 'react';
import ProductContext from '../context/ProductContext.jsx';
import StylesContext from '../context/StylesContext.jsx';
import OutFitCard from './OutFitCard.jsx';
import { FaPlus, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { OutfitRoot, OutFitTitle, OutFitCarousel, OutfitCarouselContainer, AddCard, AddText } from './Styled/Outfit.jsx';
import { Add, Next, Prev } from './Styled/Icons.jsx';
import {v4 as uuidv4} from 'uuid';


const OutfitList = () => {
const { product } = useContext(ProductContext);
const { styles } = useContext(StylesContext);
const [ left, setLeft] = useState('disabled');
const [ right, setRight] = useState('');
const [card, setCard] = useState([]);
const ref = useRef(null);
let key = uuidv4();


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
    console.log(ref)
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
      return <OutFitCard key={key} style={outfitCard} card={card} setCard={setCard}/>
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
          <Prev>
            <FaAngleLeft id={left}
              onClick={() => handleArrowClick('left')} />
          </Prev>
          <OutFitCarousel ref={ref}>
            <AddCard >
              <Add>
                <FaPlus onClick={handleClick}/>
              </Add>
              <AddText onClick={handleClick}>
                Add To Outfit
              </AddText>
            </AddCard>
              {card.map(renderOutfit)}
          </OutFitCarousel>
          <Next>
            <FaAngleRight id={right}
              onClick={() => handleArrowClick('right')}/>
          </Next>
        </OutfitCarouselContainer>
      </OutfitRoot>
    </>
  );
}

export default OutfitList;