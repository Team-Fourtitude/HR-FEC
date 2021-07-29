import React from 'react';
import AddCart from './AddCart.jsx';
import Thumbnails from './Thumbnails.jsx';
import Rating from './Rating.jsx';
import Description from './Description.jsx';
import StyleSelector from './StyleSelector.jsx';

const Overview = () => {
  return (
    <div style={{"display":"flex", "flexDirection":"column", "border": "1px solid blue", "maxWidth":"1250px", "overflowX":"hidden", "margin":"0 auto"}}>
      <div style={{"position":"relative", "border": "1px solid yellow"}}>
        <div style={{"border":"2px solid orange", "width":"100%"}}>
          <Thumbnails />
        </div>
        <div style={{"position":"absolute","right":"0","top":"0","border":"2px solid purple", "width": "35%", "height":"100%"}}>
          <div style={{"width":"90%", "margin":"0 auto"}}>
            <Rating />
            <StyleSelector />
            <AddCart />
          </div>
        </div>
      </div>
      <div>
        <Description />
      </div>
    </div>
  );
}

export default Overview;