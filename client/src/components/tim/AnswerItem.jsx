import React, { useState, useEffect, useContext } from 'react';
import PictureGallery from './PictureGallery.jsx';
import { useAnswers, useAnswersUpdate } from './AnswersContext.jsx';
import axios from 'axios';
import QuestionContext from './QuestionContext.jsx';
import { useQuestionsUpdate } from './QuestionsContext.jsx';

//import { useQuestions } from './QuestionsContext.jsx';
/* eslint react/prop-types: 0 */

const AnswerItem = (props) => {
  const [answer, setAnswer] = useState({});
  const [isHelpful, setHelped] = useState(false);
  const [willReport, setWillReport] = useState(false);
  const { isLoaded, sortedAnswers } = useAnswers();
  const { reportAnswer, markAnswerHelpful } = useAnswersUpdate();
  const currentQuestionId = useContext(QuestionContext).question_id;
  const answersByQuestion = useQuestionsUpdate().getAnswersByQuestion;


  useEffect(() => {
    let answers = answersByQuestion(currentQuestionId);
    setAnswer(answers[props.answer.id])
  }, [isLoaded])

  const convertDate = (date) => {
    const dateFormat = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
     }

    let newdate = new Date(date).toLocaleDateString('en-gb', dateFormat).split(' ')
    return `${newdate[1]} ${newdate[0]} ${newdate[2]}`;
  }

  // const reportAnswer = (answer_id) => {
  //   // PUT reported question
  //   axios.put(`/qa/answers/${answer_id}/report`)
  //     .then(() => console.log(`Reported Answer: ${answer_id}`))
  //     .catch(error => console.log(error));
  // }

  // const markAnswerHelpful = (answer_id) => {
  //   // PUT upvoted answer
  //   axios.put(`/qa/answers/${answer_id}/helpful`)
  //     .then(() => console.log(`Marked Answer Helpful: ${answer_id}`))
  //     .catch(error => console.log(error));
  // }

  return (
    <div className="answer-item">
      <div className={`answer-container${willReport && !isHelpful ? "-reportable" : "" || isHelpful ? "-helpful" : ""}`}>
        <div className="answer-body">
          <strong>A:</strong> {answer.body}
        </div>
        <div
          className="answer-sub-text"
          style={{margin: 10}}>
          by {answer.answerer_name}, {convertDate(answer.date)} | <span>Helpful? </span>
          <u
            onClick={(e) => {
              markAnswerHelpful(answer.id, isHelpful)
              setHelped(true);
            }}
            style={{cursor: !isHelpful && 'pointer'}}>
            Yes
          </u> {' '}
          ({answer.helpfulness})
          <span> | </span>
          <u
            style={{cursor: 'pointer'}}
            onMouseEnter={() => {setWillReport(true)}}
            onMouseLeave={() => {setWillReport(false)}}
            onClick={() => {reportAnswer(answer.id)}}>
            Report
          </u>
        </div>
        <PictureGallery photos={answer.photos ? answer.photos : []}/>
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