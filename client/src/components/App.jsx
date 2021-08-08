import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DarkModeContext from './context/DarkModeContext.jsx';
import ProductContext from './context/ProductContext.jsx';
import StylesContext from './context/StylesContext.jsx';
import StyleContext from './context/StyleContext.jsx';
import QuestionsAnswers from './tim/QuestionsAnswers.jsx'
import RelatedProducts from './cece/RelatedProducts.jsx';
import { GlobalStyle } from './GlobalStyle.jsx';
import { ThemeProvider } from 'styled-components';
import { theme } from './cece/Styled/Related.jsx';



// this file shows how to use context in your component
import Overview from './cody/Overview.jsx';

const App = () => {
  const [darkMode, setDarkMode] = useState(null);
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState({});
  const [style, setStyle] = useState({});


  useEffect( () => {
    axios.get('/products/25171')
    .then( (data) => {
      if (product.id !== data.data.id) {
        console.log(data.data);
        setProduct(data.data);
        return data.data.id;
      } else {
        console.log('same product');
      }
    })
    .then( (id) => {
      axios.get(`/products/${id}/styles`)
      .then( (data) => {
        if (styles.product_id !== data.data.product_id) {
          console.log(data.data);
          setStyles(data.data);
          return data.data.results[0];
        } else {
          console.log('same product/styles');
        }
      })
      .then( (firstStyle) => setStyle(firstStyle) )
      .catch( (e) => console.error(e) );
    })
    .catch( (e) => console.error(e) );
  }, []); // An empty array as the second argument of useEffect makes this function run only once on startup, feel free to edit this for your purposes



  return (
    // Our context.Providers 'values' are linked to an object that contains our state hooks.
    // Thus when the state changes, all children using that context value will rerender with the newly set state value.
    <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
      <ThemeProvider theme={darkMode ? theme.dark : theme.light}>
        <>
        <GlobalStyle />
      <ProductContext.Provider value={{product, setProduct}}>
        <StylesContext.Provider value={{styles, setStyles}}>
          <StyleContext.Provider value={{style, setStyle}}>
            {/* <div style={{"width": "100%", "backgroundImage":`${darkMode ? 'linear-gradient(-60deg, rgba(41,41,41,1) 0%, rgba(147,138,138,1) 49%, rgba(47,47,47,1) 100%)' : ''}`}}> */}
              <button type='button' style={{
                "position": "fixed",
                "top":"1%",
                "right":"5%",
              }} onClick={ () => {
                if (darkMode) {
                  setDarkMode(null);
                } else {
                  setDarkMode(true);
                }
              }}>mysterious button</button>
              <Overview />
              <RelatedProducts />
              <div>
                <QuestionsAnswers />
              </div>
            {/* </div> */}
          </StyleContext.Provider>
        </StylesContext.Provider>
      </ProductContext.Provider>
      </>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}

export default App;