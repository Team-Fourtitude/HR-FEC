import React, {useState} from 'react';
import ProductContext from '../context/ProductContext.jsx';


const ComparisonModal = (props) => {
const [canSee, setToggle] = useState(true);
const [compare, setCompare] = useState(props)
console.log(compare)



  return (
    <>
    {canSee ?
      <>
      {compare ? compare.related.map((style, i) => {
        console.log('comp', compare.current)
        console.log('style', style)
        if (Number(compare.id) === style.id) {
        return (
          <div className="tbl-container" key={i}>
            <button
            id="close"
            name="close"
            onClick={() => setToggle(false)}>
              X
            </button>
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
              {compare ? compare.current.features.map((feat, i) => {
                console.log('hello')
                return(
                <tr key={i}>
                  <td>CheckBox</td>
                  <td>{`${feat.feature}: ${feat.value}`}</td>
                  <td>CheckBox</td>
                </tr>)
              }
              ) : null}
              {/* {may have to refactor to compare the two} */}
              {/* {console.log(style)} */}
              {compare && style.features ? style.features.map((feat, i) => {
                console.log('hi')
                return(
                <tr key={i}>
                  <td>CheckBox</td>
                  <td>{`${feat.feature}: ${feat.value}`}</td>
                  <td>CheckBox</td>
                </tr>)
              }
              ) : null}
            </tbody>
            </table>
          </div>
        )
      }
    }) : null}
    </>
    : null}
    </>
  );
}

export default ComparisonModal;