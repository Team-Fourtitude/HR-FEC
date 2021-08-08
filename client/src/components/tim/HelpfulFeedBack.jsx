import React, { useState, useEffect } from 'react'
import { HelpfulFeedbackWrapper, ActionLink, DividerBar, Upvote } from './StyleHelpers.jsx'

/* eslint react/prop-types: 0 */

const HelpfulFeedback = ({ help, helpCount, action, actionType, name, date }) => {
  const [hasHelped, setHelped] = useState(false);
  const [hasActed, setActed] = useState(false);
  const [count, setCount] = useState(0);
  const [hasUserInfo, setHasUserInfo] = useState('');

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

  useEffect(() => {
    if (name && date) setHasUserInfo(`By ${name}, ${date}`);
  }, [name, date])

  return (
      <HelpfulFeedbackWrapper>
        { (hasUserInfo !== '') &&
          <span>{hasUserInfo} </span>
        }
        { !hasHelped ? <Upvote style={{opacity: 0}}/> : <Upvote />}
        {' Helpful? '}
        &nbsp;
        <ActionLink
          enabled={!hasHelped}
          onClick={() => { setHelped(true) }}>
          {' '} Yes
        </ActionLink> &nbsp; {`(${count}) `}
        <DividerBar>
          &nbsp; {' | '} &nbsp;
        </DividerBar>
        <ActionLink
          enabled={ !hasActed || !name }
          onClick={() => { setActed(true) }}>
          { actionType }
        </ActionLink>
      </HelpfulFeedbackWrapper>
  )
}

export default HelpfulFeedback;
