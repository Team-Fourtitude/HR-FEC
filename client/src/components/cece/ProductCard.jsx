import React, { useState, useContext } from 'react';
import { RelatedCard, RelatedImg } from './Styled/Related.jsx';
import { FaStar } from 'react-icons/fa';
import { ImageView, OutFitInfo, CatAndPrice, StarRating } from './Styled/Outfit.jsx';
import ProductContext from '../context/ProductContext.jsx';
import RelatedProductContext from '../context/RelatedProductContext.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import Modal from '../tim/Modal.jsx';
import { v1 as uuidv1 } from 'uuid';
import Rating from './RelatedRatings.jsx';



const ProductCard = ({ item }) => {
  const [ relatedProduct ] = useContext(RelatedProductContext);
  const { product, setProduct } = useContext(ProductContext);
  const [ viewModal, setViewModal ] = useState(false);
  const [isOpen, setOpen] = useState(false);
  let key = uuidv1();



  const modalInfoClick = () => {
    setViewModal(prevState => !prevState);
    setOpen(true);
  }

  const navToProduct = (clickedId) => {
    let result = relatedProduct.find( ({ id }) => id === Number(clickedId));
    setProduct(result);
  }

  const findDefault = () => {
    let defStyle = item.results.find((style) => style[`default?`])
    return defStyle;
  }

  let styleDefault = findDefault();
  return (
    <>
      <RelatedCard>
         <FaStar className="compare" onClick={modalInfoClick}/>
         <Modal isOpen={isOpen} close={() => {setOpen(false)}}>
           <ComparisonModal
            id={item.product_id}
            current={product}
            related={relatedProduct}/>
         </Modal>

         <ImageView onClick={() => navToProduct(item.product_id)}>
          {item && styleDefault ?
            <RelatedImg src={styleDefault.photos[0].thumbnail_url} alt="related"/>
            : <RelatedImg src={item.results[0].photos[0].thumbnail_url} alt="related" />}
          </ImageView>

        <OutFitInfo onClick={() => navToProduct(item.product_id)}>
          {relatedProduct&& relatedProduct[0] ? relatedProduct.map((data, index) => {
            if (Number(item.product_id) === data.id) {
              return (
                <span key={key}>
                <CatAndPrice >
                  [ {data.category} ]
                </CatAndPrice><br /><br />
                {data.name}<br />
                </span>
              )
            }
          }) : null}
          {styleDefault && !styleDefault.sale_price ? <CatAndPrice>{styleDefault.original_price}</CatAndPrice> : null}
          {styleDefault && styleDefault.sale_price ?
            <>
            <CatAndPrice style={{'text-decoration': 'line-through', 'text-decoration-color': 'red'}}>
              {styleDefault.original_price}
            </CatAndPrice><br/>
            <CatAndPrice style={{'color': 'red'}}>
              {styleDefault.sale_price}
            </CatAndPrice>
            </>
          : null}
          {!styleDefault ? <CatAndPrice>{item.results[0].original_price}</CatAndPrice> : null}
        </OutFitInfo>
        <StarRating>
          <Rating item={item}/>
        </StarRating>
      </RelatedCard>
    </>
  );
}

export default ProductCard;