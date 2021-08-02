import React, { useState, useRef, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import RelatedProductContext from '../context/RelatedProductContext.jsx';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';



const RelatedProductList = ({ initData }) => {
  const [ relatedProduct, setRelatedProduct ] = useContext(RelatedProductContext);
  const [ relatedStyles, setRelatedStyles ] = useContext(RelatedStylesContext);
  const [ left, setLeft] = useState('disabled');
  const [ right, setRight] = useState('');

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

    if (!ref.current.scrollLeft) {
      setLeft('disabled')
    } else {
      setLeft('prev');
    }
  }


  return (
    <>

      <FaAngleLeft className="prev" id={left} onClick={() => handleClick('left')} />
      <FaAngleRight className="next" id={right} onClick={() => handleClick('right')} />
      <h4 id="related-title">Related Products</h4>
      <div className="container" ref={ref} >
        {relatedStyles.related ? relatedStyles.related.map((item) => {
          return (
            <>
              <ProductCard  initData={initData} item={item} key={item.product_id} />
            </>
          )
        })
        : null}
      </div>
    </>
  );
}

export default RelatedProductList;

