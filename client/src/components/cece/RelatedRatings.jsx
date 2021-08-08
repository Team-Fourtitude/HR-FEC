import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Star } from '../cody/StyleHelpers.js';
import { StarsContainer, StarOverlay } from './Styled/Icons.jsx';
import axios from 'axios';

const Rating = ({ item }) => {
  const [ratings, setRatings] = useState(0);
  let productId;
  if (item.product_id) {
    productId = item.product_id;
  } else {
    productId = item.id;
  }

  useEffect( () => {
    if (productId) {
      axios.get(`/reviews/meta/${productId}`)
      .then( (data) => {
        const scores = data.data.ratings;
        let total = 0;
        let divider = 0;
        for (let score of Object.keys(scores)) {
          total += Number(score) * Number(scores[score]);
          divider += Number(scores[score]);
        }
        return total/divider;
      })
      .then( (avgRating) => {
        setRatings(avgRating);
      })
      .catch( (e) => {
        console.log('rating fetcher had problems', e);
        setRatings(0);
      })
    }
  }, []);

  return (
      <>
      {/* current css settings: each star = 16px with 2px border edges on each side, hence 12px of free space*/}
      <StarsContainer onClick={ () => {
          console.log('Jump to reviews!');
      }}>
        <StarOverlay style={{"width":`${ Math.floor(ratings) * 16 + 2 + (ratings - Math.floor(ratings)) * 12}px`}}>
          {[1,2,3,4,5].map(num => (
            <Star key={num}>
              <FaStar />
            </Star>
          ))}
        </StarOverlay>
        <StarOverlay >
          {[6,7,8,9,10].map(num => (
            <Star key={num}>
              <FaRegStar />
            </Star>
          ))}
        </StarOverlay>
      </StarsContainer>
      </>
  );
};

export default Rating;