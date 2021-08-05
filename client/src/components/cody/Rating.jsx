import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../context/ProductContext.jsx';
import axios from 'axios';

const Rating = () => {
  const [ratings, setRatings] = useState(0);
  const curProduct = useContext(ProductContext);
  const productId = curProduct.product.id;
  useEffect( () => {
    console.log('useEffect from ratings: ', productId);
    axios.get(`http://localhost:3000/reviews/meta/${productId}`)
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
    })
  }, [productId]);
  return (
      <>
      {/* current css settings: first space 6px, 15px to fill a star, space between next star 17px */}
      <div style={{"position":"relative", "height":"25px", "margin":"1em 0 0.5em 0"}} onClick={ () => {
          console.log('Jump to reviews!');
      }}>
        <div style={{"display":"flex", "width":`${(ratings * 16 + 3)}px`, "overflow":"hidden", "position":"absolute"}}>
            <div style={{"width":"max-content","height":"max-content","marginRight":"5px","fontSize":"1em"}}>★</div>
            <div style={{"width":"max-content","height":"max-content","marginRight":"5px","fontSize":"1em"}}>★</div>
            <div style={{"width":"max-content","height":"max-content","marginRight":"5px","fontSize":"1em"}}>★</div>
            <div style={{"width":"max-content","height":"max-content","marginRight":"5px","fontSize":"1em"}}>★</div>
            <div style={{"width":"max-content","height":"max-content","marginRight":"5px","fontSize":"1em"}}>★</div>
        </div>
        <div style={{"display":"flex", "position":"absolute"}}>
            <div style={{"width":"max-content","height":"max-content","marginRight":"5px","fontSize":"1em"}}>☆</div>
            <div style={{"width":"max-content","height":"max-content","marginRight":"5px","fontSize":"1em"}}>☆</div>
            <div style={{"width":"max-content","height":"max-content","marginRight":"5px","fontSize":"1em"}}>☆</div>
            <div style={{"width":"max-content","height":"max-content","marginRight":"5px","fontSize":"1em"}}>☆</div>
            <div style={{"width":"max-content","height":"max-content","marginRight":"5px","fontSize":"1em"}}>☆</div>
        </div>
      </div>
      </>
  );
};

export default Rating;
