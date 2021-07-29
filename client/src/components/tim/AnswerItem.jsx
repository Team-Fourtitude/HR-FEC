import React, { useState, useEffect } from 'react';
import PictureGallery from './PictureGallery.jsx';
import axios from 'axios';

import { useQuestions } from './QuestionsContext.jsx';
/* eslint react/prop-types: 0 */

const AnswerItem = (props) => {
  const { questions } = useQuestions();
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    setAnswer(props.answer)
  }, [])

  const convertDate = (date) => {
    const dateFormat = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
     }

    let newdate = new Date(date).toLocaleDateString('en-gb', dateFormat).split(' ')
    return `${newdate[1]} ${newdate[0]} ${newdate[2]}`;
  }

  const reportAnswer = (answer_id) => {
    // PUT reported question
    axios.put(`/qa/answers/${answer_id}/report`)
      .then(() => console.log(`Reported Answer: ${answer_id}`))
      .catch(error => console.log(error));
  }

  const markAnswerHelpful = (answer_id) => {
    // PUT upvoted answer
    axios.put(`/qa/answers/${answer_id}/helpful`)
      .then(() => console.log(`Marked Answer Helpful: ${answer_id}`))
      .catch(error => console.log(error));
  }

  return (
    <div className="AnswerItem">
      <div className="AnsBody">
        <strong>A:</strong> {props.answer.body}
      </div>
      <div
        className="answer-sub-text"
        style={{margin: 10}}>
        by {props.answer.answerer_name}, {convertDate(props.answer.date)} | <span>Helpful? </span>
        <u
          onClick={() => {markAnswerHelpful(props.answer.id)}}
          style={{cursor: 'pointer'}}>
           Yes
        </u> {' '}
        ({props.answer.helpfulness})
        <span> | </span>
        <u
          style={{cursor: 'pointer'}}
          onClick={() => {reportAnswer(props.answer.id)}}>
          Report
        </u>
      </div>
      <PictureGallery photos={props.answer.photos}/>
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