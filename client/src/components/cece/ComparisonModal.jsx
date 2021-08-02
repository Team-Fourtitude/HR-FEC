import React, {useState, useEffect} from 'react';
// import ProductContext from '../context/ProductContext.jsx';
import { FaCheck } from 'react-icons/fa';


const ComparisonModal = (props) => {
  const [compare] = useState(props);
  const [compareFeature, setCompareFeature] = useState([]);
  // console.log(compare)


  useEffect( () => {
    getFeatures();
  }, [compare])

  const getRelatedStyle = (relProducts) => {
    let relatedStyle = relProducts.find((style) => {
      let result = Number(compare.id) === style.id;
      return result;
    });
    return relatedStyle;
  }

  //local variable for related style
  const style = getRelatedStyle(compare.related);


  const getFeatures = () => {
    if (style.features) {
      let values = new Set(compare.current.features.map(feat => feat.value));
      let combined = [...compare.current.features, ...style.features.filter(feat => !values.has(feat.value))];
      console.log('combined', combined);
      setCompareFeature(combined)
    }
  }

  //renders body of table
  const renderComparison = (feature) => {
    let currentFeat = compare.current.features.find(({ value }) => {return value === feature.value});
    let relatedFeat = style.features.find(({ value }) => {return value === feature.value});
    return(
      <tr>
      {relatedFeat ?
          <td><FaCheck style={{color: 'green'}}/></td> : <td></td>}
        <td>{`${feature.feature}: ${feature.value}`}</td>
      {currentFeat ?
        <td><FaCheck style={{color: 'green'}}/>  </td> : <td></td>}
      </tr>
    )
  }



  return (
    <div className="tbl-container" >
      <table>
      <caption>Comparing</caption>
      <thead>
        <tr>
          <th>{style.name}</th>
          <th>Features</th>
          <th>{compare.current.name}</th>
        </tr>
      </thead>
      <tbody>
        {compareFeature.map(renderComparison)}
      </tbody>
      </table>
    </div>
  );
}

export default ComparisonModal;