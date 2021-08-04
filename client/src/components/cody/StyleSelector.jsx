import React, { useContext } from 'react';
import Styles from './Styles.jsx';
import ProductContext from '../context/ProductContext.jsx';
import StyleContext from '../context/StyleContext.jsx';

const styler = {padding:"0", margin:"1em 0"};

const StyleSelector = () => {
  const currentProduct = useContext(ProductContext);
  const curStyle = useContext(StyleContext);
  var price;
  if (curStyle.style) {
    const current = curStyle.style;
    if (current.sale_price) {
      price = <p style={styler}><s style={{"color": "red"}}>{'$' + curStyle.style.original_price}</s><span>{'$' + curStyle.style.sale_price}</span></p>
    } else {
      price = <p style={styler}><span>{'$' + curStyle.style.original_price}</span></p>
    }
  } else {
    price = <p style={styler}>null price</p>
  }
  return (
  <div style={{"width":"100%", "marginBottom":"1.5em"}} onClick={ () => {console.log(currentProduct.product)}}>
    <div style={{"marginBottom": "1em"}}>{currentProduct.product.category}</div>
    <h1 style={{"margin":"0", "padding":"0"}}>{currentProduct.product.name}</h1>
    {price || null}
    <div style={{"marginBottom":"1em"}}><b>STYLE</b> <b> &gt; </b> <span>{curStyle.style ? curStyle.style.name : null}</span></div>
    <Styles />
  </div>
  );
};

export default StyleSelector;