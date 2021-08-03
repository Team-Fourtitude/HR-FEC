import React, { useState, useEffect, useContext } from 'react';
import { ImArrowUp } from 'react-icons/im';

import PictureGallery from './PictureGallery.jsx';

import AnswerContext from './AnswerContext.jsx';
import QuestionContext from './QuestionContext.jsx';
import { useAnswersUpdate } from './AnswersContext.jsx';
import { useQuestionsUpdate } from './QuestionsContext.jsx';


/* eslint react/prop-types: 0 */

const AnswerItem = () => {
  const [answer, setAnswer] = useState({});
  const [isHelpful, setHelped] = useState(false);
  const [reported, setReported] = useState(false);
  const [willReport, setWillReport] = useState(false);

  const currentAnswer = useContext(AnswerContext);
  const { markAnswerHelpful } = useAnswersUpdate();
  const currentQuestion = useContext(QuestionContext);
  const reportCurrentAnswer = useQuestionsUpdate().reportAnswer;


  useEffect(() => {
    if (currentAnswer !== undefined) {
      setAnswer(currentAnswer);
    }
  }, [currentAnswer])

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
    setAnswer({...answer, helpfulness: answer.helpfulness++})
    markAnswerHelpful(currentAnswer.id, isHelpful)
    setHelped(true);
  }

  const markReported = () => {
    reportCurrentAnswer(currentAnswer.id, currentQuestion.id)
    setReported(true);
  }

  return (
    <div className="answer-item"> {!reported &&
      <div className={`answer-container${willReport && !isHelpful ? "-reportable" : "" || isHelpful ? "-helpful" : ""}`}>
        <div className="answer-body">
          <strong>A:</strong> {currentAnswer.body}
        </div>
        <div
          className="answer-sub-text"
          style={{margin: 10}}>
          by {currentAnswer.answerer_name}, {convertDate(currentAnswer.date)} | Helpful? {!isHelpful ? ' ' : <ImArrowUp style={{fill: "orange"}}/>}
          <u
            onClick={() => { markHelpful() }}
            style={{cursor: !isHelpful && 'pointer'}}>
            Yes
          </u> {' '}
          ({currentAnswer.helpfulness})
          {' | '}
          <u
            style={{cursor: 'pointer'}}
            onMouseEnter={() => {setWillReport(true)}}
            onMouseLeave={() => {setWillReport(false)}}
            onClick={() => { markReported() }}>
            Report
          </u>
        </div>
        <PictureGallery photos={currentAnswer.photos ? currentAnswer.photos : []}/>
      </div> }
    </div>
  )
}

export default AnswerItem;
