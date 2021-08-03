import React, { useState, useContext } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import ProductContext from '../context/ProductContext.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import StylesContext from '../context/StylesContext.jsx';
import StyleContext from '../context/StyleContext.jsx';
import RelatedProductContext from '../context/RelatedProductContext.jsx';
import RelatedStylesContext from '../context/RelatedStylesContext.jsx';
import Modal from '../Tim/Modal.jsx';


const ProductCard = ({ item, initData }) => {

  const { style, setStyle } = useContext(StyleContext);
  const [ relatedStyles, setRelatedStyles ] = useContext(RelatedStylesContext);
  const [ relatedProduct, setRelatedProduct] = useContext(RelatedProductContext);
  const { product, setProduct } = useContext(ProductContext);
  const [ viewModal, setViewModal ] = useState(false);
  const [isOpen, setOpen] = useState(false);



  const modalInfoClick = () => {
    setViewModal(prevState => !prevState);
    setOpen(true);
  }


  const navToProduct = (clickedId) => {
    let result = relatedProduct.find( ({ id }) => id === Number(clickedId));
    setProduct(result);
  }


  return (
    <>
      <div className="column">
         <FaStar className="compare" onClick={modalInfoClick}/>
         <Modal isOpen={isOpen} close={() => {setOpen(false)}}>
           <ComparisonModal id={item.product_id} current={product} related={relatedProduct}/>
         </Modal>
        {item && item.results ? item.results.map((style, index) => {
          if (style[`default?`]) {
            return (
              <div className="square" onClick={() => navToProduct(item.product_id)}>
                <img className="relImg" key={index} src={style.photos[0].thumbnail_url} />
              </div>
            )
          }
        }) : null}
        <p className="info" onClick={() => navToProduct(item.product_id)}>
          {relatedProduct&& relatedProduct[0] ? relatedProduct.map((data, index) => {
            if (Number(item.product_id) === data.id) {
              return (
                <>
                  <span className="cat" key={index}>[ {data.category} ]</span><br /><br />
                  {data.name}<br />
                </>
              )
            }
          }) : null}
          {item && item.results ? item.results.map((style, index) => {
            if (style[`default?`] && !style.sale_price) {
              return (
                <>
                  <span className="price" key={index}>{style.original_price}</span>
                </>
              )
            } else if (style[`default?`] && style.sale_price) {
              return (
                <>
                  <span className="price" style={{'text-decoration': 'line-through', 'text-decoration-color': 'red'}}>{style.original_price}</span><br/>
                  <span className="price" style={{'color': 'red'}}>SALE: $100</span>
                </>
              )
            }
          }) : null}
        </p>
        <div className="starRating">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
          <FaRegStar />
        </div>
      </div>
    </>
  );
}

export default ProductCard;