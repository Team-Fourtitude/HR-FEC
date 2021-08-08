import React from 'react';
import AddCart from './AddCart.jsx';
import Thumbnails from './Thumbnails.jsx';
import Rating from './Rating.jsx';
import Description from './Description.jsx';
import StyleSelector from './StyleSelector.jsx';
import { OverviewMain, OverviewDescription } from './StyleHelpers';

const Overview = () => {
  return (
    <OverviewMain>
      <div style={{"position":"relative", "minHeight":"600px"}}>
        <div style={{"width":"100%"}}>
          <Thumbnails />
        </div>
        <div style={{"position":"absolute","right":"0","top":"0", "width": "35%", "height":"100%"}}>
          <div style={{"width":"90%", "margin":"0 auto"}}>
            <Rating />
            <StyleSelector />
            <AddCart />
          </div>
        </div>
      </div>
      <OverviewDescription>
        <Description />
      </OverviewDescription>
    </OverviewMain>
  );
}

export default Overview;