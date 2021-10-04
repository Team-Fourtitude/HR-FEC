import React, { useState, useContext } from 'react';
import StyleContext from '../context/StyleContext.jsx';
import QuantityButton from './QuantityButton.jsx';
import SizeSelector from './SizeSelector.jsx';
import AddBag from './AddBag.jsx';
import {
  CartButtonWrapper15,
  CartButtonWrapper75,
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
        <SizeSelectionBox>
          {(styleSizes && styleSizes[0] !== 'null') ?
            <>
              <SizeSelector
                functions={{setCurrentSize, setPrompt}}
                data={{currentSize, styleSizes, currentStyle: curStyle}} />
              <PopUp prompt={prompt}><b>Please select size</b></PopUp>
            </> : null
          }
          <QuantityButton currentSize={currentSize} currentStyle={curStyle} />
        </SizeSelectionBox>
        {(() => {
            if (styleSizes && styleSizes[0] !== 'null') {
              return (
                <div style={{"display":"flex", "justifyContent":"space-between"}}>
                <AddBag setPrompt={setPrompt} />
                <CartButtonWrapper15 as='button' type='submit' dark={darkMode} onClick={ (ev) => {
                  ev.preventDefault();
                  if (fav) {
                    setFav(false);
                  } else {
                    setFav(true);
                  }
                  // implement logic to add item to favorites
                  console.log(curStyle.style.name);
                  console.log('prompt: ', prompt);
                }}>{ fav ? <FaStar style={{"color":"goldenrod"}} name='star-filled' /> : <FaRegStar style={{"color":"grey"}} name='star-empty' />}</CartButtonWrapper15>
                </div>
              );
            } else {
              return (
                <div style={{"display":"flex", "justifyContent":"space-between"}}>
                  <AddBag disabled />
                  <CartButtonWrapper15 as='button' type='submit' dark={darkMode} disabled></CartButtonWrapper15>
                </div>
              );
              }
            })()}
      </form>
    </div>
  );
};

export default AddCart;
