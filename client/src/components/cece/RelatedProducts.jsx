import React, { useState, useEffect, useContext } from 'react';
import { RelatedBody, theme } from './Styled/Related.jsx';
import { GlobalStyles } from './Styled/global.jsx';
import axios from 'axios';
import ProductContext from '../context/ProductContext.jsx';
import StylesContext from '../context/StylesContext.jsx';
import StyleContext from '../context/StyleContext.jsx';
import RelatedProductContext from '../context/RelatedProductContext.jsx';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';
import RelatedProductList from './RelatedProductList.jsx';
import OutfitList from './OutfitList.jsx';
import { ThemeProvider } from 'styled-components';


const RelatedProducts = () => {
  const { product } = useContext(ProductContext);
  const [relatedIds, setRelatedIds] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [relatedStyles, setRelatedStyles] = useState([]);
  const { styles, setStyles } = useContext(StylesContext);
  const { setStyle } = useContext(StyleContext);
  const [dark, setDarkTheme] = useState(false);


  //initial Data
  const getInitialData = () => {
    if (product.id) {
      let id = product.id;

      //re-renders styles
      axios.get(`/products/${id}/styles`)
      .then( (data) => {
        if (styles.product_id !== data.data.product_id) {
          setStyles(data.data);
          return data.data.results[0];
        } else {
          console.log('same product/styles');
        }
      })
      .then( (firstStyle) => setStyle(firstStyle) )
      .catch( (e) => console.error(e) );


      let relatedUrl = `/products/${id}/related`;
      const relatedInfo = axios.get(relatedUrl)
      axios.all([relatedInfo]).then(axios.spread((responses) => {
        const relatedSet = [...new Set(responses.data)]
        setRelatedIds(relatedSet);
      }))
      .catch(err => console.log(err))
    }
  }

  //related Data
  const getRelatedData = () => {
    if (relatedIds.length) {
      const relUrl = relatedIds.map((id) => {
        let url = `/products/${id}`;
        return url;
      })

      const relatedData = relUrl.map((url) => {
        let productInfo = axios.get(url);
        return productInfo;
      })

      const relatedStyles = relUrl.map((url) => {
        let productStyles = axios.get(`${url}/styles`)
        return productStyles;
      })


      axios.all(relatedData).then(axios.spread((...res) => {
        let relatedDataMap = res.map((data) => {
          return data.data;
        })
        setRelatedProduct(relatedDataMap)
      }))
      .catch(err => console.log(err))


      axios.all(relatedStyles).then(axios.spread((...res) => {
        let relatedStylesMap = res.map((data) => {
          return data.data;
        })


        let defaultStyleMap = res.flatMap((data) => {
          let defaultStyle = data.data.results.filter((style) => {
            return style[`default?`];
            })
          return defaultStyle;
        })
        return setRelatedStyles({related: relatedStylesMap, defaults: defaultStyleMap})
      }))
      .catch(err => console.log(err))
    }
  }

    useEffect( () => {
      getRelatedData();
    }, [relatedIds])

    useEffect( () => {
      getInitialData();
    }, [product])

    const toggleTheme = () => {
      setDarkTheme(dark => !dark)
    }


  return(
    <ThemeProvider theme={dark ? theme.dark : theme.light} >
      <>
      <RelatedBody>
        <RelatedProductContext.Provider value={[relatedProduct, setRelatedProduct]}>
          <RelatedStylesContext.Provider value={[relatedStyles, setRelatedStyles]}>
            <button onClick={toggleTheme}>DarkMode</button>
            <RelatedProductList />
            <OutfitList />
          </RelatedStylesContext.Provider>
        </RelatedProductContext.Provider>
      </RelatedBody>
    </>
    </ThemeProvider>
  )
}

export default RelatedProducts;