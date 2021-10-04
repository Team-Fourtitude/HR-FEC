import React, { useState, useContext } from 'react';
import StyleContext from '../context/StyleContext.jsx';
import QuantityButton from './QuantityButton.jsx';
import SizeSelector from './SizeSelector.jsx';
import {
  CartButtonWrapper15,
  CartButtonWrapper30,
  CartButtonWrapper60,
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
          {(() => {
            if (styleSizes && styleSizes[0] !== 'null') {
              return (
                <>
                  <SizeSelector
                    functions={{setCurrentSize, setPrompt}}
                    data={{currentSize, styleSizes, currentStyle: curStyle}} />
                  <PopUp prompt={prompt}><b>Please select size</b></PopUp>
                </>
              );
            }
          })()}
          <QuantityButton currentSize={currentSize} currentStyle={curStyle} />
        </SizeSelectionBox>
        {(() => {
            if (styleSizes && styleSizes[0] !== 'null') {
              return (
                <div style={{"display":"flex", "justifyContent":"space-between"}}>
                <CartButtonWrapper75 as='button' type='submit' dark={darkMode} onClick={(ev) => {
                  ev.preventDefault();
                  const selectDropdown = document.getElementById('size');
                  const size = selectDropdown.value;
                  if (size !== 'null') {
                    // add functionality to submit information into user cart
                    console.log(ev.target.parentElement.parentElement.children[0].children[0].value);
                    console.log(ev.target.parentElement.parentElement.children[0].children[2].value); // children[1].value returns <PopUp>
                    console.log(document.getElementById('quantity').value);
                  } else {
                    promptSelectSize(setPrompt);
                  }
                }}>ADD TO BAG</CartButtonWrapper75>
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
                  <CartButtonWrapper75 as='button' type='submit' dark={darkMode} disabled>ADD TO BAG</CartButtonWrapper75>
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