import React, {useState} from 'react';

const ComparisonModal = (props) => {
const [canSee, setToggle] = useState(true);
const [compare, setCompare] = useState(props)
console.log(compare)


  return (
    <>
      <div>

      </div>

    <div className="tbl-container">
    {canSee ?
      <>
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
          <th>{compare.related[0].name}</th>
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
        {compare ? compare.related[0].features.map((feat, i) => {
          return(
          <tr key={i}>
            <td>CheckBox</td>
            <td>{`${feat.feature}: ${feat.value}`}</td>
            <td>CheckBox</td>
          </tr>)
        }
        ) : null}
      </tbody>
      </table></>
      : null}
    </div>
    </>
  );
}

export default ComparisonModal;