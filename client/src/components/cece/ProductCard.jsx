import React, { useState, useContext } from 'react';
import { FaRegStar } from 'react-icons/fa';
import ProductContext from '../context/ProductContext.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import StylesContext from '../context/StylesContext.jsx';
import StyleContext from '../context/StyleContext.jsx';
import RelatedProductContext from '../context/RelatedProductContext.jsx';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';


const ProductCard = ({item}) => {

  const { style, setStyle } = useContext(StyleContext);
  const [ relatedStyles, setRelatedStyles ] = useContext(RelatedStylesContext);
  const [ relatedProduct, setRelatedProduct] = useContext(RelatedProductContext);
  const product = useContext(ProductContext);
  const [ viewModal, setViewModal ] = useState(false);


  // useEffect(() => {

  // })


  const modalInfoClick = (e) => {
    setViewModal(prevState => !prevState);
    // console.log(e.target.value)
  }


  const navToProduct = (id) => {
    console.log(id);

  }

  // console.log('item', item)
  // console.log('related', relatedProduct)




  return (
    <>

      <div className="column" onClick={() => navToProduct(item.product_id)}>
        {/* <button id="compare" onClick={modalInfoClick}>☆</button>
         */}
         <FaRegStar id="compare" onClick={modalInfoClick}/>
        {viewModal ? <ComparisonModal id={item.product_id} current={product.product} related={relatedProduct}/> : null}
        {item && item.results ? item.results.map((style) => {

          if (style[`default?`]) {
            // console.log(style)
            return (
              <div className="square">
                <img className="relImg" src={style.photos[0].thumbnail_url} />
              </div>
            )
          }
        }) : null}
        {relatedProduct&& relatedProduct[0] ? relatedProduct.map((data) => {
          if (Number(item.product_id) === data.id) {
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
      </div>

    </>
  );





}

export default ProductCard;