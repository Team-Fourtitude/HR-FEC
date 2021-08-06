import React, { useState, useEffect, useContext } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import {Star} from '../cody/StyleHelpers.jsx';
import axios from 'axios';

const Rating = ({ item }) => {
  const [ratings, setRatings] = useState(0);
  const productId = item.product_id;


  useEffect( () => {
    // console.log('useEffect from ratings: ', productId);
    axios.get(`http://localhost:3000/reviews/meta/${productId}`)
    .then( (data) => {
      // console.log('axios data for ratings', data.data.ratings);
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
  }, []);
  return (
      <>
      {/* current css settings: each star = 16px with 2px border edges on each side, hence 12px of free space*/}
      <div style={{"position":"relative", "display":"inline-block", "height":"25px", "margin":"1em 0 0.5em 0"}} onClick={ () => {
          console.log('Jump to reviews!');
      }}>
        <div style={{"display":"flex", "overflow":"hidden", "position":"absolute", "width":`${ Math.floor(ratings) * 16 + 2 + (ratings - Math.floor(ratings)) * 12}px`}}>
          {[1,2,3,4,5].map(num => (
            <Star key={num}>
              <FaStar style={{'color': 'goldenrod'}}/>
            </Star>
          ))}
        </div>
        <div style={{"display":"flex", "position":"absolute"}}>
          {[6,7,8,9,10].map(num => (
            <Star key={num}>
              <FaRegStar style={{'color': 'goldenrod'}}/>
            </Star>
          ))}
        </div>
      </div>
      </>
  );
};

export default Rating;