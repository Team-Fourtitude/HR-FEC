import React, { useState, useRef, useContext } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { RelatedContainer } from './Styled/Related.jsx';
import { OutFitTitle } from './Styled/Outfit.jsx';
import { v1 as uuidv1 } from 'uuid';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';
import ProductCard from './ProductCard.jsx';
import { Next } from './Styled/Icons.jsx';




const RelatedProductList = () => {
  const [ relatedStyles, setRelatedStyles ] = useContext(RelatedStylesContext);
  const [ left, setLeft] = useState('disabled');
  const [ right, setRight] = useState('');
  let key = uuidv1();
  const ref = useRef(null);

  const handleClick = (direction) => {
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
    console.log(ref)
    console.log(ref.current.scrollLeft, 'left')
    console.log(ref.current.scrollWidth, 'width')


    if (!ref.current.scrollLeft) {
      setLeft('disabled')
    } else {
      setLeft('prev');
    }
  }

  console.log('ref', ref)
  return (
    <>
      <FaAngleLeft className="prev" id={left} onClick={() => handleClick('left')} />
      <FaAngleRight className="next" id={right} onClick={() => handleClick('right')} />

      <OutFitTitle style={{'paddingTop': '20px'}}>Related Products</OutFitTitle>
      <RelatedContainer ref={ref} >
        {relatedStyles.related ? relatedStyles.related.map((item, index) => {
          return (
            <>
              <ProductCard item={item} key={key.toString()} />
            </>
          )
        })
        : null}
      </RelatedContainer>
    </>
  );
}

export default RelatedProductList;

