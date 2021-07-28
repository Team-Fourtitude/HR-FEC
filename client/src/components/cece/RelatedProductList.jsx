import React, { useState, useRef, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import RelatedProductContext from '../context/RelatedProductContext.jsx';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';



const RelatedProductList = () => {
  const [ relatedProduct, setRelatedProduct ] = useContext(RelatedProductContext);
  const [ relatedStyles, setRelatedStyles ] = useContext(RelatedStylesContext);

console.log('styles', relatedStyles)

// console.log('rel', relatedProduct)
// console.log('def', relatedStyles)



  // const deStyle = relatedStyles.defaults.map((style) => {
  //   let newStyle = style.defaults.results.filter((def) => {
  //     return def[`default?`];
  //   })
  //   return newStyle;
  // })

  // console.log(deStyle)



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
        <div className="container" ref={ref} >
          {relatedProduct ? relatedProduct.map((item) => {
            return <ProductCard item={item}  key={item.id}/>
          }) : null}
        </div>
        <div>
          <button id="prev" onClick={() => handleClick('left')}> {`<`} </button>
        </div>
        <div>
          <button id="next" onClick={() => handleClick('right')}> {`>`} </button>
        </div>
    </>
  );
}

export default RelatedProductList;

