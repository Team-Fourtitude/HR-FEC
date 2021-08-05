import React, { useState, useContext } from 'react';
import StyleContext from '../context/StyleContext.jsx';
import { CartButtonWrapper, CartButtonWrapper30, CartButtonWrapper60, CartButtonWrapper75, PopUp } from './StyleHelpers.jsx';

const AddCart = () => {
  const curStyle = useContext(StyleContext);
  const [fav, setFav] = useState(false);
  const [currentSize, setCurrentSize] = useState(null);
  const [prompt, setPrompt] = useState(null);
  let styleSizes;
  if (curStyle.style) {
    if (curStyle.style.skus) {
      styleSizes = Object.keys(curStyle.style.skus);
    }
  }
  let quantity;
  if (currentSize && curStyle.style.skus[currentSize]) {
    const max =  curStyle.style.skus[currentSize].quantity;
    if (max > 15) {
      let options = [];
      for (let i = 1; i < 16; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
      }
      quantity = <CartButtonWrapper30 as='select' id='quantity'>{options}</CartButtonWrapper30>;
    } else if (max > 0) {
      let options = [];
      for (let i = 1; i < max + 1; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
      }
      quantity = <CartButtonWrapper30 as='select' id='quantity'>{options}</CartButtonWrapper30>;
    } else {
      let options = [<option key='0' value='0'>-</option>];
      quantity = <CartButtonWrapper30 as='select' id='quantity' disabled>{options}</CartButtonWrapper30>;
    }
  } else {
    quantity = (
      <CartButtonWrapper30 as='select' id='quantity' value='null' disabled>
      <option value='null'>-</option>
    </CartButtonWrapper30>
    );
    if (currentSize) {
      setCurrentSize(null);
    }
  }
  return (
    <div style={{"width":"100%"}}>
      <form id='cartData' style={{"display":"flex", "flexDirection":"column"}}>
        <div style={{"display":"flex", "justifyContent":"space-between", "position":"relative", "height":"50px", "marginBottom":"0.5em"}}>
          {(() => {
            if (styleSizes) {
              if (styleSizes[0] !== 'null') {
                return (
                  <>
                  <CartButtonWrapper60 as='select' id='size' value={currentSize ? currentSize : 'null'} onChange={(ev) => {
                    setCurrentSize(ev.target.value);
                    setPrompt(null);
                    ev.target.removeAttribute('size');
                    ev.target.style.position = 'static';
                    ev.target.style.height = '50px';
                    ev.target.parentElement.children[1].value = 1;
                  }}
                  onBlur={(ev) => {
                    setPrompt(null);
                    ev.target.removeAttribute('size');
                    ev.target.style.position = 'static';
                    ev.target.style.height = '50px';
                  }}>
                    {<option value='null'>SELECT SIZE</option>}
                    {styleSizes ? styleSizes.map( (sizeID) => {
                      return (
                        <option key={sizeID} value={sizeID}>{curStyle.style.skus[sizeID].size}</option>
                        );
                      }) : null}
                  </CartButtonWrapper60>
                  <PopUp prompt={prompt}><b>Please select size</b></PopUp>
                  </>
                );
              } else {
                return <CartButtonWrapper60 as='select' id='size' value='null' disabled><option value='null'>OUT OF STOCK</option></CartButtonWrapper60>;
              }
            }
          })()}
          {quantity || null}
        </div>
        {(() => {
          if (styleSizes) {
            if (styleSizes[0] !== 'null') {
              return (
                <div style={{"display":"flex", "justifyContent":"space-between"}}>
                <CartButtonWrapper75 as='button' type='submit' onClick={ (ev) => {
                  ev.preventDefault();
                  let size = ev.target.parentElement.parentElement.children[0].children[0].value;
                  if (size !== 'null') {
                    console.log(ev.target.parentElement.parentElement.children[0].children[0].value);
                    console.log(ev.target.parentElement.parentElement.children[0].children[1].value);
                  } else {
                    let sizeSelector = document.getElementById('size');
                    let totalSizes = sizeSelector.children.length;
                    setPrompt('true');
                    sizeSelector.setAttribute('size', totalSizes);
                    sizeSelector.style.position = 'absolute';
                    sizeSelector.style.height = 'max-content';
                    sizeSelector.focus();
                  }
                }}>ADD TO BAG</CartButtonWrapper75>
                <CartButtonWrapper as='button' type='submit' onClick={ (ev) => {
                  ev.preventDefault();
                  if (fav) {
                    setFav(false);
                  } else {
                    setFav(true);
                  }
                  console.log(curStyle.style.name);
                  console.log('prompt: ', prompt);
                }}>{ fav ? '★' : '☆'}</CartButtonWrapper>
                </div>
              );
            } else {
              return (
                <div style={{"display":"flex", "justifyContent":"space-between"}}>
                <CartButtonWrapper75 as='button' type='submit' disabled>ADD TO BAG</CartButtonWrapper75>
                <CartButtonWrapper as='button' type='submit' disabled>☆</CartButtonWrapper>
                </div>
              );
              }
            }})()}
      </form>
    </div>
  );
};

export default AddCart;