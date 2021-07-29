import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductContext from './context/ProductContext.jsx';
import StylesContext from './context/StylesContext.jsx';
import StyleContext from './context/StyleContext.jsx';
import QuestionsAnswers from './tim/QuestionsAnswers.jsx'

// this file shows how to use context in your component
import Test from './cody/Test.jsx';

const App = () => {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState({});
  const [style, setStyle] = useState({});

  useEffect( () => {
    axios.get('http://localhost:3000/products/25171')
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
      axios.get(`http://localhost:3000/products/${id}/styles`)
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
    <ProductContext.Provider value={{product, setProduct}}>
      <StylesContext.Provider value={{styles, setStyles}}>
        <StyleContext.Provider value={{style, setStyle}}>
          <QuestionsAnswers />
        </StyleContext.Provider>
      </StylesContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;