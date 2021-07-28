import React, { useState, useContext } from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import ProductContext from '../context/ProductContext.jsx';
import StylesContext from '../context/StylesContext.jsx';
import StyleContext from '../context/StyleContext.jsx';
import RelatedProductContext from '../context/RelatedProductContext.jsx';



const ProductCard = ({item, defaults}) => {
  const { product, setProduct } = useContext(ProductContext);
  const { style, setStyle } = useContext(StyleContext);
  // const [styles, setStyles]  = useContext(StylesContext);
  const [ relatedProduct, setRelatedProduct] = useContext(RelatedProductContext);

  const [viewModal, setViewModal] = useState(false);

  // console.log('PC', style)



  const modalInfoClick = (e) => {
    setViewModal(prevState => !prevState);
    console.log(e.target.value)
  }



  return (
    <>
      {viewModal ? <ComparisonModal current={product} related={relatedProduct}/> : null}
      <div className="column"  onClick={modalInfoClick}>

        {item.defaultStyle && item.defaultStyle.photos ? <img className="relImg" src={item.defaultStyle.photos[0].thumbnail_url} /> : null}
        {item ? item.category : null} <br />
        {item ? item.name : null} <br />
        {item.defaultStyle ? item.defaultStyle.original_price : null}
      </div>

    </>
  );



}

export default ProductCard;