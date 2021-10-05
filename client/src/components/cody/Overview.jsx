import React from 'react';
import AddCart from './AddCart.jsx';
import Thumbnails from './Thumbnails.jsx';
import Rating from './Rating.jsx';
import Description from './Description.jsx';
import StyleSelector from './StyleSelector.jsx';
import {
  Container1,
  Container2,
  Container3,
  Container4,
  OverviewMain,
  OverviewDescription,
} from './StyleHelpers';

const Overview = () => {
  return (
    <OverviewMain>
      <Container1>
        <Container2>
          <Thumbnails />
        </Container2>
        <Container3>
          <Container4>
            <Rating />
            <StyleSelector />
            <AddCart />
          </Container4>
        </Container3>
      </Container1>
      <OverviewDescription>
        <Description />
      </OverviewDescription>
    </OverviewMain>
  );
}

export default Overview;
