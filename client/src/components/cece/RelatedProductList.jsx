import React, { useState, useRef, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import ProductContext from '../context/ProductContext.jsx';
import StylesContext from '../context/StylesContext.jsx';
import StyleContext from '../context/StyleContext.jsx';
import RelatedProductContext from '../context/RelatedProductContext.jsx';



const RelatedProductList = () => {
  const { product, setProduct } = useContext(ProductContext);
  const { style, setStyle } = useContext(StyleContext);
  const [ styles, setStyles ] = useContext(StylesContext);
  const [ relatedProduct, setRelatedProduct ] = useContext(RelatedProductContext);
  const [state, setState] = useState([]);

console.log('styles', styles)

// console.log('rel', relatedProduct)


  const deStyle = styles.map((style) => {
    let newStyle = style.results.filter((def) => {
      return def[`default?`];
    })
    return newStyle;
  })




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
            return <ProductCard item={item} defaults={deStyle} key={item.id}/>
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

