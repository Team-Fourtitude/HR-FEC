import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductContext from '../context/ProductContext.jsx';
import RelatedProductContext from '../context/RelatedProductContext.jsx';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';
import RelatedProductList from './RelatedProductList.jsx';
import OutfitList from './OutfitList.jsx';


const RelatedProducts = () => {
  const { product, setProduct } = useContext(ProductContext);
  const [relatedIds, setRelatedIds] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([])
  const [relatedStyles, setRelatedStyles] = useState([]);


  //initial Data
  const getInitialData = () => {
    if (product.id) {
      let id = product.id;
      let relatedUrl = `http://localhost:3000/products/${id}/related`;
      const relatedInfo = axios.get(relatedUrl)

      axios.all([relatedInfo]).then(axios.spread((responses) => {
        // console.log('IDS', responses);
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
        // console.log(res)
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


  return(
    <div className="related" style={{"position":"relative", "height": "1000px"}}>
      <RelatedProductContext.Provider value={[relatedProduct, setRelatedProduct]}>
        <RelatedStylesContext.Provider value={[relatedStyles, setRelatedStyles]}>
          <RelatedProductList initData={getInitialData}/>
          <OutfitList />
        </RelatedStylesContext.Provider>
      </RelatedProductContext.Provider>

    </div>
  )
}

export default RelatedProducts;