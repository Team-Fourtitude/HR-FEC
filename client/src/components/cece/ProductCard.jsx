import React, { useState, useContext } from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import ProductContext from '../context/ProductContext.jsx';
import StylesContext from '../context/StylesContext.jsx';
import StyleContext from '../context/StyleContext.jsx';
import RelatedProductContext from '../context/RelatedProductContext.jsx';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';
import CardInfo from './CardInfo.jsx';



const ProductCard = ({item}) => {
  const { product, setProduct } = useContext(ProductContext);
  const { style, setStyle } = useContext(StyleContext);
  const [ relatedStyles, setRelatedStyles ] = useContext(RelatedStylesContext);
  const [ relatedProduct, setRelatedProduct] = useContext(RelatedProductContext);

  const [viewModal, setViewModal] = useState(false);

  console.log('item: ', relatedProduct)




  const modalInfoClick = (e) => {
    setViewModal(prevState => !prevState);
    console.log(e.target.value)
  }



  return (
    <>
      {viewModal ? <ComparisonModal current={product} related={relatedProduct}/> : null}
      <div className="column"  onClick={modalInfoClick}>
        {item && item.results ? item.results.map((style) => {
          if (style[`default?`]) {
            return (
              <img className="relImg" src={style.photos[0].thumbnail_url} />
            )
          }
        }) : null}
        {relatedProduct&& relatedProduct[0] ? relatedProduct.map((data) => {
          if (Number(item.product_id) === data.id) {
            console.log('hi')
            return (
              <>
              {data.category}<br />
              {data.name}<br />
              </>
            )
          }
        }) : null}
        {item && item.results ? item.results.map((style) => {
          if (style[`default?`]) {
            return (
              <>
              {style.original_price}
              </>
            )
          }
        }) : null}



        {/* {item.photos ? <img className="relImg" src={item.photos[0].thumbnail_url} /> : null} */}
        {/* {item && related ? related.flatMap((data) => {
          let results = data.results.map((id) => {
            if (id.style_id === item.style_id) {
              return (

              )
            }
          })

        }) : null} */}

        {item.style_id === relatedProduct.id ? item.category : null} <br />
        {/* {item ? item.name : null} <br /> */}
        {item ? item.original_price : null}
      </div>

    </>
  );





}

export default ProductCard;