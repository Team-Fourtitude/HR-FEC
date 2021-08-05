import React, { useState, useEffect, useContext } from 'react';
import { ImArrowUp } from 'react-icons/im';

import PictureGallery from './PictureGallery.jsx';

import { useAnswersUpdate } from './AnswersContext.jsx'
import QuestionContext from './QuestionContext.jsx';
import { useQuestionsUpdate } from './QuestionsContext.jsx';
import AnswerItemContext from './AnswerItemContext.jsx';


/* eslint react/prop-types: 0 */

const AnswerItem = () => {
  const [currentAnswer, setCurrentAnswer] = useState({});
  const [isHelpful, setHelped] = useState(false);
  const [reported, setReported] = useState(false);
  const [willReport, setWillReport] = useState(false);

  const answer = useContext(AnswerItemContext);
  const { markAnswerHelpful } = useAnswersUpdate();
  const currentQuestion = useContext(QuestionContext);
  const reportCurrentAnswer = useQuestionsUpdate().reportAnswer;


  // on context change I need to update local answer state
  useEffect(() => {
    if (answer !== undefined) {
      console.log(`This Answer is loaded!!! ${answer}`);
      setCurrentAnswer(answer);
    }
  }, [answer])

  useEffect(() => {
    if (isHelpful) {
      setCurrentAnswer({...currentAnswer, helpfulness: answer.helpfulness++})
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
    let newdate = new Date(date).toLocaleDateString('en-gb', dateFormat).split(' ')
    return `${newdate[1]} ${newdate[0]} ${newdate[2]}`;
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
    <div className="answer-item"> {!reported &&
      <div className={`answer-container${willReport && !isHelpful ? "-reportable" : "" || isHelpful ? "-helpful" : ""}`}>
        <div className="answer-body">
          <strong>A:</strong> {answer.body}
        </div>
        <div
          className="answer-sub-text"
          style={{margin: 10}}>
          by {answer.answerer_name}, {convertDate(answer.date)} | Helpful? {!isHelpful ? ' ' : <ImArrowUp style={{fill: "orange"}}/>}
          <u
            onClick={() => { markHelpful() }}
            style={{cursor: !isHelpful && 'pointer'}}>
            Yes
          </u> {' '}
          ({answer.helpfulness})
          {' | '}
          <u
            style={{cursor: 'pointer'}}
            onMouseEnter={() => {setWillReport(true)}}
            onMouseLeave={() => {setWillReport(false)}}
            onClick={() => { markReported() }}>
            Report
          </u>
        </div>
        <PictureGallery photos={answer.photos ? answer.photos : []}/>
      </div> }
    </div>
  )
}

export default AnswerItem;
