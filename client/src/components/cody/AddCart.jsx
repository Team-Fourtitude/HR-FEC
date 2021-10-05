import React, { useState, useContext } from 'react';
import StyleContext from '../context/StyleContext.jsx';
import QuantityButton from './QuantityButton.jsx';
import SizeSelector from './SizeSelector.jsx';
import AddBag from './AddBag.jsx';
import AddFavorite from './AddFavorite.jsx';
import {
  SizeSelectionBox,
  PopUp
} from './StyleHelpers';
import {promptSelectSize} from './utilFunctions';
import {FaStar, FaRegStar} from 'react-icons/fa';
import DarkModeContext from '../context/DarkModeContext.jsx';

const AddCart = () => {
  const curStyle = useContext(StyleContext);
  const { darkMode } = useContext(DarkModeContext);
  const [fav, setFav] = useState(false);
  const [currentSize, setCurrentSize] = useState(null);
  const [prompt, setPrompt] = useState(null);
  let styleSizes;
  if (curStyle?.style?.skus) {
    styleSizes = Object.keys(curStyle.style.skus);
  }
  return (
    <div style={{"width":"100%"}}>
      <form id='cartData' style={{"display":"flex", "flexDirection":"column"}}>
        {(styleSizes && styleSizes[0] !== 'null') ?
        <>
          <SizeSelectionBox>
            <SizeSelector
              functions={{setCurrentSize, setPrompt}}
              data={{currentSize, styleSizes, currentStyle: curStyle}} />
            <PopUp prompt={prompt}><b>Please select size</b></PopUp>
            <QuantityButton currentSize={currentSize} currentStyle={curStyle} />
          </SizeSelectionBox>
          <div style={{"display":"flex", "justifyContent":"space-between"}}>
            <AddBag setPrompt={setPrompt} />
            <AddFavorite
              currentStyle={curStyle}
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
