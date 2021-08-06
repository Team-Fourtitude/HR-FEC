import React, { useState, useEffect } from 'react'
import { HelpfulFeedbackWrapper, ActionLink, DividerBar } from './StyleHelpers.jsx'
import { ImArrowUp } from 'react-icons/im';
/* eslint react/prop-types: 0 */

const HelpfulFeedback = ({ help, helpCount, action, actionType }) => {
  const [hasHelped, setHelped] = useState(false);
  const [hasActed, setActed] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(helpCount);
  }, [helpCount])

  useEffect(() => {
    if (hasHelped) {
      setCount((count + 1));
      help();
    }
    if (hasActed) {
      action(true);
    }

  }, [hasHelped, hasActed])

  return (
      <HelpfulFeedbackWrapper>
        {' Helpful? '} &nbsp;
        { !hasHelped ? ' ' : <ImArrowUp style={{fill: "orange"}}/>}
        <ActionLink
          enabled={!hasHelped}
          onClick={() => { setHelped(true) }}>
          Yes
        </ActionLink> {`(${count}) `}
        <DividerBar>
          &nbsp; | &nbsp;
        </DividerBar>
        <ActionLink
          enabled={ !hasActed }
          onClick={() => { setActed(true) }}>
          { actionType }
        </ActionLink>
      </HelpfulFeedbackWrapper>
  )
}

export default HelpfulFeedback;



{/* <div className="question-sub-text">
          by {question.asker_name} | Helpful?  {!hasHelped ? ' ' : <ImArrowUp style={{fill: "orange"}}/>}<u
          onClick={() => { markHelpful() }}
          style={{cursor: !hasHelped && 'pointer'}}>
          Yes</u>
            {' '} ({currentQuestion.question_helpfulness}) | {' '}
          <u className="add-answer-link"
            style={{cursor: "pointer"}}
            onClick={ () => setOpen(true) }
          >Add Answer</u> */}