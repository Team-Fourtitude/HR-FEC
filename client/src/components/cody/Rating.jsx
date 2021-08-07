import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../context/ProductContext.jsx';
import { FaStar, FaRegStar } from 'react-icons/fa';
import {Star} from './StyleHelpers.jsx';
import axios from 'axios';

const Rating = () => {
  const [ratings, setRatings] = useState(0);
  const curProduct = useContext(ProductContext);
  const productId = curProduct.product.id;
  useEffect( () => {
    console.log('useEffect from ratings: ', productId);

    if (typeof productId === 'number') {
      axios.get(`/reviews/meta/${productId}`)
      .then( (data) => {
        console.log('axios data for ratings', data.data.ratings);
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
      });
    }
  }, [productId]);
  return (
      <>
      {/* current css settings: each star = 16px with 2px border edges on each side, hence 12px of free space*/}
      <div style={{"position":"relative", "display":"inline-block", "height":"25px", "margin":"1em 0 0.5em 0"}} onClick={ () => {
          console.log('Jump to reviews!');
      }}>
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
