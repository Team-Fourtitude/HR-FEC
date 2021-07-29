import React, { useState, useRef, useContext } from 'react';
import ProductCard from './ProductCard.jsx';

import RelatedProductContext from '../context/RelatedProductContext.jsx';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';



const RelatedProductList = () => {
  const [ relatedProduct, setRelatedProduct ] = useContext(RelatedProductContext);
  const [ relatedStyles, setRelatedStyles ] = useContext(RelatedStylesContext);


  const ref = useRef(null);

  const handleClick = (direction) => {
    if (direction === 'left') {
      ref.current.scrollLeft -= 200;
    } else {
      ref.current.scrollLeft += 200;
    }
  }


  return (
    <>
          <button id="prev" onClick={() => handleClick('left')}> {`<`} </button>
          <button id="next" onClick={() => handleClick('right')}> {`>`} </button>
        <div className="container" ref={ref} >
          {relatedStyles.related ? relatedStyles.related.map((item) => {
            return (
              <>
                <ProductCard item={item} key={item.product_id} />
              </>
            )
          })
          : null}
        </div>
        {/* <div>
        </div>
        <div>
        </div> */}
    </>
  );
}

export default RelatedProductList;

