import React, {useState} from 'react';
import ProductContext from '../context/ProductContext.jsx';


const ComparisonModal = (props) => {
const [canSee, setToggle] = useState(true);
const [compare, setCompare] = useState(props)
console.log(compare)


// const sorter = (current, related) => {
//   console.log('sorter', current, related)
//   for (var i = 0; i < current.features.length; i++) {
//     let currFeat = current.features[i];
//     related.forEach((style) => {
//       console.log('sorterStyle', style)
//       for (var j = 0; j < style.features.length; j++) {
//         let relFeat = related.features[j];
//         if (currFeat.feat === relFeat.feature && currFeat.value === relFeat.value) {
//           console.log('HECK YEAH')
//         }
//       }
//     })

//     }

// }

  return (
    <>
    {/* {sorter(compare.current, compare.related)} */}
    {canSee ?
      <>
      {compare ? compare.related.map((style, i) => {
        console.log('comp', compare.current)
        console.log('style', style)
        if (Number(compare.id) === style.id) {
        return (
          <div className="tbl-container" key={i}>
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