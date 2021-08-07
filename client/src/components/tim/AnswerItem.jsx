import React, { useState, useEffect, useContext } from 'react';

import PictureGallery from './PictureGallery.jsx';

import { AnswerWrapper } from './styleHelpers.jsx';
import HelpfulFeedback from './HelpfulFeedback.jsx';
import { useAnswersUpdate } from './AnswersContext.jsx'
import QuestionContext from './QuestionContext.jsx';
import { useQuestionsUpdate } from './QuestionsContext.jsx';
import AnswerItemContext from './AnswerItemContext.jsx';


/* eslint react/prop-types: 0 */

const AnswerItem = () => {
  const [currentAnswer, setCurrentAnswer] = useState({});
  const [isHelpful, setHelped] = useState(false);
  const [reported, setReported] = useState(false);

  const answer = useContext(AnswerItemContext);
  const { markAnswerHelpful } = useAnswersUpdate();
  const currentQuestion = useContext(QuestionContext);
  const reportCurrentAnswer = useQuestionsUpdate().reportAnswer;


  // on context change I need to update local answer state
  useEffect(() => {
    if (answer !== undefined) {
      console.log(`This Answer is loaded!!! ${answer}`);
      setCurrentAnswer({...answer});
    }
  }, [answer])

  useEffect(() => {
    if (isHelpful) {
      setCurrentAnswer({...currentAnswer, helpfulness: currentAnswer.helpfulness + 1})
      markAnswerHelpful(currentAnswer.id)
    }
  }, [isHelpful])

  useEffect(() => {
    if (reported) {
      reportCurrentAnswer(currentAnswer.id, currentQuestion.id)
    }
  }, [reported])

  const convertDate = (date) => {
    const dateFormat = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
     }
    let newdate = new Date(date).toLocaleDateString('en-us', dateFormat).split(' ').join(' ')
    return `${newdate}`;
  }

  const markHelpful = () => {
    if (!isHelpful) {
      setHelped(true);
    }
  }

  const markReported = () => {
    reportCurrentAnswer(currentAnswer.id, currentQuestion.id)
    setReported(true);
  }

  return (
    <div> {!reported &&
      <AnswerWrapper>
        <div>
          <strong>A:</strong> {answer.body}
        </div>
        <div
          className="answer-sub-text"
          style={{margin: 10}}>
          <HelpfulFeedback
            help={markHelpful}
            helpCount={currentAnswer.helpfulness}
            action={markReported}
            actionType={'Report'}
            name={currentAnswer.answerer_name}
            date={convertDate(currentAnswer.date)}
          />
        </div>
        <PictureGallery photos={answer.photos ? answer.photos : []}/>
      </AnswerWrapper> }
    </div>
  )
}

export default AnswerItem;
