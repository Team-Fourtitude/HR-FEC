import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../context/ProductContext.jsx';
import { FaStar, FaRegStar } from 'react-icons/fa';
import {Star, RatingContainer, StarContainer, ColoredStarContainer} from './StyleHelpers.js';
import axios from 'axios';
import { averageRating, ratingWidth } from './utilFunctions';

const Rating = () => {
  const [ratings, setRatings] = useState(0);
  const curProduct = useContext(ProductContext);
  const productId = curProduct.product.id;
  useEffect( () => {
    if (typeof productId === 'number') {
      axios.get(`/reviews/meta/${productId}`)
      .then( (data) => {
        const scores = data.data.ratings;
        let avgRating = averageRating(scores);
        setRatings(avgRating);
      })
      .catch( () => {
        setRatings(0);
      });
    }
  }, [productId]);
  return (
      <>
      <RatingContainer>
        <ColoredStarContainer rating={ratingWidth(ratings)}>
          {[1,2,3,4,5].map(num => (
            <Star key={num}>
              <FaStar style={{'color': 'goldenrod'}} />
            </Star>
          ))}
        </ColoredStarContainer>
        <StarContainer>
          {[6,7,8,9,10].map(num => (
            <Star key={num}>
              <FaRegStar style={{"color":"goldenrod"}} />
            </Star>
          ))}
        </StarContainer>
      </RatingContainer>
      </>
  );
};

export default Rating;
