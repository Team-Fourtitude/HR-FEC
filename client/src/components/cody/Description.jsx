import React, { useContext } from 'react';
import ProductContext from '../context/ProductContext.jsx';

const Description = () => {
  const currentProduct = useContext(ProductContext);
  return (
  <div style={{"display":"flex", "flexDirection":"column", "width":"80%", "margin":"0 auto"}}>
    <div style={{"display":"flex"}}>
      <div>
        <h2>{currentProduct.product.slogan || null}</h2>
        <p>{currentProduct.product.description || null}</p>
      </div>
      <div style={{"border": "1px solid gray", "margin": "0 1em", "height":"100px", "alignSelf":"center"}}></div>
      <ul>
        {currentProduct.product.features ? currentProduct.product.features.map( (feature, index) => <li style={{"marginBottom":"0.5em"}} key={index}>{feature.value ? feature.value : null} {feature.feature}</li>) : null}
      </ul>
    </div>
    <div style={{"display":"flex"}}>
      <button type="button" onClick={() => {
        console.log('Share to facebook button activated');
      }}>Facebook</button>
      <button type="button" onClick={() => {
        console.log('Share to twitter button activated');
      }}>Twitter</button>
      <button type="button" onClick={() => {
        console.log('Share to pinterest button activated');
      }}>Pinterest</button>
    </div>
  </div>
  );
};

export default Description;