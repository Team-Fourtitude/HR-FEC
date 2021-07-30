import React, { useState, useEffect, useContext } from 'react';
import PictureGallery from './PictureGallery.jsx';
import { useAnswersUpdate } from './AnswersContext.jsx';
import AnswerContext from './AnswerContext.jsx';
import { useQuestionsUpdate } from './QuestionsContext.jsx';
import { ImArrowUp } from 'react-icons/im';

//import { useQuestions } from './QuestionsContext.jsx';
/* eslint react/prop-types: 0 */

const AnswerItem = () => {
  const [isHelpful, setHelped] = useState(false);
  const [willReport, setWillReport] = useState(false);
  const { reportAnswer, markAnswerHelpful } = useAnswersUpdate();

  const currentAnswer = useContext(AnswerContext);
  const getQuestions = useQuestionsUpdate().getQuestions;

  useEffect(() => {
    if (isHelpful) getQuestions();
  }, [isHelpful])

  const convertDate = (date) => {
    const dateFormat = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
     }

    let newdate = new Date(date).toLocaleDateString('en-gb', dateFormat).split(' ')
    return `${newdate[1]} ${newdate[0]} ${newdate[2]}`;
  }

  return (
    <div className="answer-item">
      <div className={`answer-container${willReport && !isHelpful ? "-reportable" : "" || isHelpful ? "-helpful" : ""}`}>
        <div className="answer-body">
          <strong>A:</strong> {currentAnswer.body}
        </div>
        <div
          className="answer-sub-text"
          style={{margin: 10}}>
          by {currentAnswer.answerer_name}, {convertDate(currentAnswer.date)} | Helpful? {!isHelpful ? ' ' : <ImArrowUp style={{fill: "orange"}}/>}
          <u
            onClick={() => {
              markAnswerHelpful(currentAnswer.id, isHelpful)
              setHelped(true);
            }}
            style={{cursor: !isHelpful && 'pointer'}}>
            Yes
          </u> {' '}
          ({currentAnswer.helpfulness})
          {' '} | {' '}
          <u
            style={{cursor: 'pointer'}}
            onMouseEnter={() => {setWillReport(true)}}
            onMouseLeave={() => {setWillReport(false)}}
            onClick={() => {reportAnswer(currentAnswer.id)}}>
            Report
          </u>
        </div>
        <PictureGallery photos={currentAnswer.photos ? currentAnswer.photos : []}/>
      </div>
      <hr className="answer-break"></hr>
    </div>
  )
}

export default AnswerItem;

/**
 * "answerer_name": "metslover",
                    "helpfulness": 13,
                    "photos": [

    <div className="question-title">
      <h3>Q: {props.question.question_body}</h3>
      <div className="question-sub-text">
        by {props.question.asker_name} | Helpful?: <u
        onClick={() => {questionUpdaters.markQuestionHelpful(props.question.question_id)}}
        style={{cursor: 'pointer'}}>
           Yes</u>
        ({props.question.question_helpfulness}) | <u
          style={{cursor: 'pointer'}}
          onClick={() => {questionUpdaters.reportQuestion(props.question.question_id)}}
        >Report</u>
      </div>
      </div>
    <span>{' '}</span>
 */