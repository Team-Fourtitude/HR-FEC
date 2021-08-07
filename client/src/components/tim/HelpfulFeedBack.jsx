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
          <span>{hasUserInfo} &nbsp;</span>
        }
        { !hasHelped ? '  ' : <Upvote />}
        {' Helpful? '}
        &nbsp;
        <ActionLink
          enabled={!hasHelped}
          onClick={() => { setHelped(true) }}>
          Yes
        </ActionLink> {' '} {`(${count}) `}
        <DividerBar>
          &nbsp; {' | '} &nbsp;
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
