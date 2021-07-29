import React, { useState, useRef, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import RelatedProductContext from '../context/RelatedProductContext.jsx';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';



const RelatedProductList = () => {
  const [ relatedProduct, setRelatedProduct ] = useContext(RelatedProductContext);
  const [ relatedStyles, setRelatedStyles ] = useContext(RelatedStylesContext);
  const [ leftDisabled, setLeftDisabled] = useState(true);
  const [ rightDisabled, setRightDisabled] = useState(false);


  const ref = useRef(null);

  const handleClick = (direction) => {
    if (direction === 'left') {
      ref.current.scrollLeft -= 200;
    } else {
      ref.current.scrollLeft += 200;
    }
    if (ref.current.scrollLeft) {
      setLeftDisabled(prevState => !prevState);
    }

  }


  return (
    <>

      {leftDisabled ? <FaAngleLeft id="prev" onClick={() => handleClick('left')} /> : <FaAngleLeft id="prev disabled" onClick={() => handleClick('left')}/>}
      <FaAngleRight id="next" onClick={() => handleClick('right')} />
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
    </>
  );
}

export default RelatedProductList;

