import React, { useContext } from 'react';
import ProductContext from '../context/ProductContext.jsx';
import { DescriptionBox, DescriptionShareBox, DescriptionSplit, ShareIconWrapper } from './StyleHelpers.js';

const Description = () => {
  const currentProduct = useContext(ProductContext);
  const fbUI = () => {
    FB.ui({
      display: 'popup',
      method: 'share',
      href: 'https://developers.facebook.com/docs/',
    }, function(response){});
  };
  return (
  <DescriptionBox>
    <div style={{"display":"flex"}}>
      <div>
        <h2>{currentProduct.product.slogan || null}</h2>
        <p>{currentProduct.product.description || null}</p>
      </div>
      <DescriptionSplit/>
      <ul>
        {currentProduct.product.features ? currentProduct.product.features.map( (feature, index) => <li style={{"marginBottom":"0.5em"}} key={index}>{feature.value || null} {feature.feature || null}</li>) : null}
      </ul>
    </div>
    <DescriptionShareBox>
      <ShareIconWrapper as='a' className="twitter-share-button" href="https://twitter.com/intent/tweet" target='_blank' rel='noopener'>
        <img style={{"width":"40px", "height":"40px"}} src='assets/twitterIcon.png' alt='twitter icon' />
      </ShareIconWrapper>
      <ShareIconWrapper onClick={fbUI}>
        <img style={{"width":"40px", "height":"40px"}} src='assets/fbIcon.png' alt='facebook icon' />
      </ShareIconWrapper>
      <ShareIconWrapper as='a' href="https://www.pinterest.com/pin/create/button/"
        data-pin-do="buttonBookmark" target='_blank' rel='noopener'
      >
        <img style={{"width":"40px", "height":"40px"}} src='assets/pinterestIcon.png' alt='pinterest icon' />
      </ShareIconWrapper>
    </DescriptionShareBox>
  </DescriptionBox>
  );
};

export default Description;