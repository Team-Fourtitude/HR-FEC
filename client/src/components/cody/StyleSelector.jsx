import React, { useContext } from 'react';
import Styles from './Styles.jsx';
import ProductContext from '../context/ProductContext.jsx';
import StyleContext from '../context/StyleContext.jsx';
import { StyleSelectorP, StyleSelectorContainer, StyleSelectorDiv, StyleSelectorName} from './StyleHelpers';


const StyleSelector = () => {
  const currentProduct = useContext(ProductContext);
  const curStyle = useContext(StyleContext);
  var price;
  if (curStyle.style) {
    const current = curStyle.style;
    if (current.sale_price) {
      price = <StyleSelectorP><s style={{"color": "red", "marginRight":"0.5em"}}>{'$' + curStyle.style.original_price}</s><span>{'$' + curStyle.style.sale_price}</span></StyleSelectorP>
    } else {
      price = <StyleSelectorP><span>{'$' + curStyle.style.original_price}</span></StyleSelectorP>
    }
  } else {
    price = <StyleSelectorP>null price</StyleSelectorP>
  }
  return (
  <StyleSelectorContainer onClick={ () => {console.log(currentProduct.product)}}>
    <StyleSelectorDiv>{currentProduct.product.category}</StyleSelectorDiv>
    <StyleSelectorName>{currentProduct.product.name}</StyleSelectorName>
    {price || null}
    <StyleSelectorDiv><b>STYLE</b> <b> &gt; </b> <span>{curStyle.style ? curStyle.style.name : null}</span></StyleSelectorDiv>
    <Styles />
  </StyleSelectorContainer>
  );
};

export default StyleSelector;