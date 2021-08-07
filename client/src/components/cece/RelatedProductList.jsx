import React, { useState, useRef, useContext } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { RelatedCarousel, RelatedCarouselContainer, RelatedProductsRoot } from './Styled/Related.jsx';
import { OutFitTitle } from './Styled/Outfit.jsx';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';
import ProductCard from './ProductCard.jsx';
import { Next, Prev } from './Styled/Icons.jsx';




const RelatedProductList = () => {
  const [ relatedStyles ] = useContext(RelatedStylesContext);
  const [ left, setLeft] = useState('disabled');
  const [ right, setRight] = useState('');
  const ref = useRef(null);

  const handleClick = (direction) => {
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

  return (
    <RelatedProductsRoot>
      <OutFitTitle style={{'paddingTop': '25px'}}>
        Related Products
      </OutFitTitle>
      <RelatedCarouselContainer>
        <Prev>
          <FaAngleLeft id={left} onClick={() => handleClick('left')} />

        </Prev>
        <RelatedCarousel ref={ref} >
        {relatedStyles.related ? relatedStyles.related.map((item, index) => {
        return <ProductCard item={item} key={index}/>})
        : null}
        </RelatedCarousel>
        <Next>
          <FaAngleRight id={right} onClick={() => handleClick('right')}/>

        </Next>
      </RelatedCarouselContainer>
    </RelatedProductsRoot>
  );
}

export default RelatedProductList;

