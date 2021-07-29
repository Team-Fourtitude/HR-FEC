import React, { useContext } from 'react';
import Styles from './Styles.jsx';
import ProductContext from '../context/ProductContext.jsx';
import StyleContext from '../context/StyleContext.jsx';

const StyleSelector = () => {
  const currentProduct = useContext(ProductContext);
  const curStyle = useContext(StyleContext);
  var price;
  if (curStyle.style) {
    const current = curStyle.style;
    if (current.sale_price) {
      price = <p><s style={{"color": "red"}}>{'$' + curStyle.style.original_price}</s><span>{'$' + curStyle.style.sale_price}</span></p>
    } else {
      price = <p><span>{'$' + curStyle.style.original_price}</span></p>
    }
  } else {
    price = <p>null price</p>
  }
  return (
  <div style={{"border": "1px solid orange", "width":"max-content"}}>
    <p>{currentProduct.product.category}</p>
    <h1>{currentProduct.product.name}</h1>
    {price || null}
    <div><b>STYLE</b> <b> &gt; </b> <span>{curStyle.style ? curStyle.style.name : null}</span></div>
    <Styles />
  </div>
  );
};

export default StyleSelector;