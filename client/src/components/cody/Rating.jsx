import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../context/ProductContext.jsx';
import { FaStar, FaRegStar } from 'react-icons/fa';
import {Star} from './StyleHelpers.js';
import axios from 'axios';
import { averageRating } from './utilFunctions';

const Rating = () => {
  const [ratings, setRatings] = useState(0);
  const curProduct = useContext(ProductContext);
  const productId = curProduct.product.id;
  useEffect( () => {
    if (typeof productId === 'number') {
      axios.get(`/reviews/meta/${productId}`)
      .then( (data) => {
        const scores = data.data.ratings;
        return averageRating(scores);
      })
      .then( (avgRating) => {
        setRatings(avgRating);
      })
      .catch( () => {
        setRatings(0);
      });
    }
  }, [productId]);
  return (
      <>
      <div style={{"position":"relative", "display":"inline-block", "height":"25px", "margin":"1em 0 0.5em 0"}}>
        <div style={{"display":"flex", "overflow":"hidden", "position":"absolute", "width":`${ Math.floor(ratings) * 16 + 2 + (ratings - Math.floor(ratings)) * 12}px`}}>
          {[1,2,3,4,5].map(num => (
            <Star key={num}>
              <FaStar style={{'color': 'goldenrod'}} />
            </Star>
          ))}
        </div>
        <div style={{"display":"flex", "position":"absolute"}}>
          {[6,7,8,9,10].map(num => (
            <Star key={num}>
              <FaRegStar style={{"color":"goldenrod"}} />
            </Star>
          ))}
        </div>
      </div>
      </>
  );
};

export default Rating;
