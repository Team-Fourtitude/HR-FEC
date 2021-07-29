// import useContext method from react
import React, { useContext } from 'react';

// import the context files for the context you want to use
import ProductContext from '../context/ProductContext.jsx';
import StylesContext from '../context/StylesContext.jsx';
import StyleContext from '../context/StyleContext.jsx';

const Test = () => {
  // create a variable using 'useContext' that will represent the 'value' of the context.Provider
  const product = useContext(ProductContext); // Here, product = { product, setProduct }; as defined in App.jsx
  const styles = useContext(StylesContext);
  const style = useContext(StyleContext);

  return (
  <div>
    {/* Use ternary operators to prevent errors on render for moments when context our state is not yet defined */}
    {product.product ? product.product.id : null}
    {styles.styles ? styles.styles.product_id : null}
    {style.style ? style.style.style_id : null}
    test that wont break
  </div>
  );
}

export default Test;