import React, { useState, useContext } from 'react';
import StyleContext from '../context/StyleContext.jsx';

const AddCart = () => {
  const curStyle = useContext(StyleContext);
  const [fav, setFav] = useState(false);
  const [currentSize, setCurrentSize] = useState(null);
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
      quantity = <select className='quantity' style={{"fontSize": "1em", "height":"50px", "color":"#333", "marginBottom":"1.5rem", "fontWeight":"bold", "padding":"0.5em", "width":"30%"}}>{options}</select>;
    } else if (max > 0) {
      let options = [];
      for (let i = 1; i < max + 1; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
      }
      quantity = <select className='quantity' style={{"fontSize": "1em", "height":"50px", "color":"#333", "marginBottom":"1.5rem", "fontWeight":"bold", "padding":"0.5em", "width":"30%"}}>{options}</select>;
    } else {
      let options = [<option key='0' value='0'>-</option>];
      quantity = <select className='quantity' style={{"fontSize": "1em", "height":"50px", "color":"#333", "marginBottom":"1.5rem", "fontWeight":"bold", "padding":"0.5em", "width":"30%"}} disabled>{options}</select>;
    }
  } else {
    quantity = (
      <select className='quantity' value='null' style={{"fontSize": "1em", "height":"50px", "color":"#333", "marginBottom":"1.5rem", "fontWeight":"bold", "padding":"0.5em", "width":"30%"}} disabled>
      <option value='null'>-</option>
    </select>
    );
    if (currentSize) {
      setCurrentSize(null);
    }
  }
  return (
    <div style={{"width":"100%"}}>
      <form id='cartData' style={{"display":"flex", "flexDirection":"column"}}>
        <div style={{"display":"flex", "justifyContent":"space-between"}}>
          {(() => {
            if (styleSizes) {
              if (styleSizes[0] !== 'null') {
                return (
                  <select style={{"fontSize": "1em", "height":"50px", "color":"#333", "marginBottom":"1.5rem", "fontWeight":"bold", "padding":"0.5em", "width":"60%"}} className='size' value={currentSize ? currentSize : 'null'} onChange={(ev) => {
                    setCurrentSize(ev.target.value);
                    ev.target.parentElement.children[1].value = 1;
                  }}>
                    {<option value='null'>SELECT SIZE</option>}
                    {styleSizes ? styleSizes.map( (sizeID) => {
                      return (
                        <option key={sizeID} value={sizeID}>{curStyle.style.skus[sizeID].size}</option>
                        );
                      }) : null}
                  </select>
                );
              } else {
                return <select style={{"fontSize": "1em", "height":"50px", "color":"#333", "marginBottom":"1.5rem", "fontWeight":"bold", "padding":"0.5em", "width":"60%"}} className='size' value='null' disabled><option value='null'>OUT OF STOCK</option></select>;
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
                <button type='submit' style={{"fontSize": "1em", "height":"50px", "color":"#333", "marginBottom":"1.5rem", "fontWeight":"bold", "padding":"0.5em", "width":"75%", "backgroundColor":"transparent"}} onClick={ (ev) => {
                  ev.preventDefault();
                  let size = ev.target.parentElement.parentElement.children[0].children[0].value;
                  if (size !== 'null') {
                    console.log(ev.target.parentElement.parentElement.children[0].children[0].value);
                    console.log(ev.target.parentElement.parentElement.children[0].children[1].value);
                  } else {
                    console.log('please select a size');
                  }
                }}>ADD TO BAG</button>
                <button type='submit'style={{"fontSize": "2em", "height":"50px", "color":"#333", "marginBottom":"1.5rem", "fontWeight":"bold", "padding":"0em", "width":"15%", "backgroundColor":"transparent"}}  onClick={ (ev) => {
                  ev.preventDefault();
                  if (fav) {
                    setFav(false);
                  } else {
                    setFav(true);
                  }
                  console.log(curStyle.style.name);
                }}>{ fav ? '★' : '☆'}</button>
                </div>
              );
            } else {
              return (
                <div style={{"display":"flex", "justifyContent":"space-between"}}>
                <button type='submit' style={{"fontSize": "1em", "height":"50px", "color":"#333", "marginBottom":"1.5rem", "fontWeight":"bold", "padding":"0.5em", "width":"75%", "backgroundColor":"transparent"}} disabled>ADD TO BAG</button>
                <button type='submit' style={{"fontSize": "2em", "height":"50px", "color":"#333", "marginBottom":"1.5rem", "fontWeight":"bold", "padding":"0em", "width":"15%", "backgroundColor":"transparent"}}disabled>☆</button>
                </div>
              );
              }
            }})()}
      </form>
    </div>
  );
};

export default AddCart;