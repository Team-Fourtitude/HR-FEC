import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductContext from './context/ProductContext.jsx';
import RelatedProductContext from './context/RelatedProductContext.jsx';
import RelatedStylesContext from './context/RelatedStylesContext.jsx';
import StylesContext from './context/StylesContext.jsx';
import StyleContext from './context/StyleContext.jsx';
import QuestionsAnswers from './tim/QuestionsAnswers.jsx'
import RelatedProductList from './cece/RelatedProductList.jsx';
import OutfitList from './cece/OutfitList.jsx';


// this file shows how to use context in your component
import Overview from './cody/Overview.jsx';

const App = () => {
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState({});
  const [style, setStyle] = useState({});
  const [relatedIds, setRelatedIds] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([])
  const [relatedStyles, setRelatedStyles] = useState([]);

  //initial Data
  const getInitialData = () => {


    let productUrl = `http://localhost:3000/products/25171`;
    const productInfo = axios.get(productUrl)
    .then( (data) => {
        if (product.id !== data.data.id) {
          setProduct(data.data);
          return data.data;
        } else {
          console.log('same product');
        }
      });

    let relatedUrl = `http://localhost:3000/products/25171/related`;
    const relatedInfo = axios.get(relatedUrl)

    axios.all([productInfo, relatedInfo]).then(axios.spread((...responses) => {
      setProduct(responses[0]);
      const relatedSet = [...new Set(responses[1].data)]
      setRelatedIds(relatedSet);
    }))
    .catch(err => console.log(err))
  }

  //related Data
  const getRelatedData = () => {
    if (relatedIds.length) {
      const relUrl = relatedIds.map((id) => {
        let url = `http://localhost:3000/products/${id}`;
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
        console.log(res)
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
  }, [])

  useEffect( () => {
    getInitialData();
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
          // console.log(data.data);
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
      <RelatedProductContext.Provider value={[relatedProduct, setRelatedProduct]}>
        <RelatedStylesContext.Provider value={[relatedStyles, setRelatedStyles]}>
          <StylesContext.Provider value={{styles, setStyles}}>
            <StyleContext.Provider value={{style, setStyle}}>
              <Overview />
              <div className="related" style={{"position":"relative", "height": "800"}}>
                <RelatedProductList />
                <OutfitList />
              </div>
              <div>
                <QuestionsAnswers />
              </div>
            </StyleContext.Provider>
          </StylesContext.Provider>
        </RelatedStylesContext.Provider>
      </RelatedProductContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;