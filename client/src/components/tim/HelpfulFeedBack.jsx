import React, { useState } from 'react';
/* eslint react/prop-types: 0 */

const HelpfulFeedback = (props) => {
  const [hasHelped, setHelped] = useState(false);

  const style = {
    cursor: 'pointer',
    position: 'relative',
    underline: {textDecorationLine: 'underline'},
  }

  const updateHelpful = (e) => {
    if (!hasHelped) {
      setHelped(true);
      // invoke provider call passed from props
      props.increaseHelp();
      e.target.style({cursor: 'default'})
      console.log('Yes Im helping')
    }
  }

  return (
    <div className="helpful-feedback">
      <span>Helpful? :</span>
      <p
      className="helpful-increase"
      onClick={e => {updateHelpful(e)}}
      style={style}
      >Yes</p>
      <span>({props.helpCount})</span>
    </div>
  )
}

export default HelpfulFeedback;