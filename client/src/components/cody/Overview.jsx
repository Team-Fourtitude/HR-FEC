import React, { useContext } from 'react';
import DarkModeContext from '../context/DarkModeContext.jsx';
import AddCart from './AddCart.jsx';
import Thumbnails from './Thumbnails.jsx';
import Rating from './Rating.jsx';
import Description from './Description.jsx';
import StyleSelector from './StyleSelector.jsx';


const Overview = () => {
  const {darkMode} = useContext(DarkModeContext);
  return (
    <div style={{"display":"flex", "flexDirection":"column", "maxWidth":"1250px", "overflowX":"hidden", "margin":"0 auto", "backgroundColor": `${darkMode ? '#333' : 'whitesmoke'}`}}>
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
      <div style={{"backgroundColor":`${darkMode ? '#222' : 'whitesmoke'}`, "color":`${darkMode ? '#eee' : '#111'}`, "borderRadius":"5px", "padding":"1em", "border": `${darkMode ? "1px solid #111" : "1px solid #ddd"}`}}>
        <Description />
      </div>
    </div>
  );
}

export default Overview;