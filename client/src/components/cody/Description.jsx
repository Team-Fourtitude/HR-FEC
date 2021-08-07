import React, { useContext } from 'react';
import ProductContext from '../context/ProductContext.jsx';
import DarkModeContext from '../context/DarkModeContext.jsx';
import { ShareIconWrapper } from './StyleHelpers.jsx';

const Description = () => {
  const currentProduct = useContext(ProductContext);
  const { darkMode } = useContext(DarkModeContext);
  return (
  <div style={{"display":"flex", "flexDirection":"column", "width":"80%", "margin":"0 auto"}}>
    <div style={{"display":"flex"}}>
      <div>
        <h2>{currentProduct.product.slogan || null}</h2>
        <p>{currentProduct.product.description || null}</p>
      </div>
      <div style={{"border": `${darkMode ? "1px solid #eee" : "1px solid gray"}`, "margin": "0 1em", "height":"100px", "alignSelf":"center"}}></div>
      <ul>
        {currentProduct.product.features ? currentProduct.product.features.map( (feature, index) => <li style={{"marginBottom":"0.5em"}} key={index}>{feature.value ? feature.value : null} {feature.feature}</li>) : null}
      </ul>
    </div>
    <div style={{"display":"flex", "justifyContent":"space-between", "width":"30%"}}>
      <ShareIconWrapper as='a' className="twitter-share-button" href="https://twitter.com/intent/tweet" target='_blank' rel='noopener'>
        <img style={{"width":"40px", "height":"40px"}} src='assets/twitterIcon.png' alt='twitter icon' />
      </ShareIconWrapper>
      <ShareIconWrapper onClick={ () => {
        FB.ui({
          display: 'popup',
          method: 'share',
          href: 'https://developers.facebook.com/docs/',
        }, function(response){});
      }}>
        <img style={{"width":"40px", "height":"40px"}} src='assets/fbIcon.png' alt='facebook icon' />
      </ShareIconWrapper>
      <ShareIconWrapper as='a' href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark" target='_blank' rel='noopener'>
        <img style={{"width":"40px", "height":"40px"}} src='assets/pinterestIcon.png' alt='pinterest icon' />
      </ShareIconWrapper>
    </div>
  </div>
  );
};

export default Description;