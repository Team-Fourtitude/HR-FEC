import React from 'react';
import AddCart from './AddCart.jsx';
import Thumbnails from './Thumbnails.jsx';
import Rating from './Rating.jsx';
import Description from './Description.jsx';
import StyleSelector from './StyleSelector.jsx';

const Overview = () => {
  return (
    <div style={{"display":"flex", "flexDirection":"column", "border": "1px solid blue"}}>
      <div style={{"display":"flex", "border": "1px solid yellow"}}>
        <div style={{"border":"2px solid orange", "width":"65%"}}>
          <Thumbnails />
        </div>
        <div>
          <Rating />
          <StyleSelector />
          <AddCart />
        </div>
      </div>
      <div>
        <Description />
      </div>
    </div>
  );
}

export default Overview;