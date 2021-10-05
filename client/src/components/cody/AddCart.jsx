import React, { useState, useContext } from 'react';
import StyleContext from '../context/StyleContext.jsx';
import QuantityButton from './QuantityButton.jsx';
import SizeSelector from './SizeSelector.jsx';
import AddBag from './AddBag.jsx';
import AddFavorite from './AddFavorite.jsx';
import {SizeSelectionBox, PopUp} from './StyleHelpers';

const AddCart = () => {
  const currentStyle = useContext(StyleContext);
  const [fav, setFav] = useState(false);
  const [currentSize, setCurrentSize] = useState(null);
  const [prompt, setPrompt] = useState(null);
  let styleSizes;
  if (currentStyle?.style?.skus) {
    styleSizes = Object.keys(currentStyle.style.skus);
  }
  return (
    <div style={{"width":"100%"}}>
      <form id='cartData' style={{"display":"flex", "flexDirection":"column"}}>
        {(styleSizes && styleSizes[0] !== 'null') ?
        <>
          <SizeSelectionBox>
            <SizeSelector
              functions={{setCurrentSize, setPrompt}}
              data={{currentSize, styleSizes, currentStyle}} />
            <PopUp prompt={prompt}><b>Please select size</b></PopUp>
            <QuantityButton currentSize={currentSize} currentStyle={currentStyle} />
          </SizeSelectionBox>
          <div style={{"display":"flex", "justifyContent":"space-between"}}>
            <AddBag setPrompt={setPrompt} />
            <AddFavorite
              currentStyle={currentStyle}
              favorite={{fav, setFav}}
              prompt={prompt}
            />
          </div>
        </> : null}
      </form>
    </div>
  );
};

export default AddCart;
