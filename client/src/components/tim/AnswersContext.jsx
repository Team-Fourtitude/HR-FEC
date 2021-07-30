import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import QuestionContext from './QuestionContext.jsx';
/* eslint react/prop-types: 0 */

const AnswersContext = createContext(null);
const AnswersUpdateContext = createContext();

export const useAnswers = () => {
  return useContext(AnswersContext);
}

export const useAnswersUpdate = () => {
  return useContext(AnswersUpdateContext);
}

export const AnswersProvider = ({children}) => {
  const [answers, setAnswers] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const currentQuestion = useContext(QuestionContext);
  const currentQuestionId = currentQuestion.question_id;

  const markAnswerHelpful = (answer_id, hasHelped) => {
    // PUT upvoteed question
    if (hasHelped) return;
    axios.put(`/qa/answers/${answer_id}/helpful`)
      .then(() => {
        console.log(`Marked Answer Helpful: ${answer_id}`)
      })
      .catch(error => console.log(error));
  }

  const reportAnswer = (answer_id) => {
    // PUT reported question
    axios.put(`/qa/answers/${answer_id}/report`)
      .then(() => {
        console.log(`Reported Answer: ${answer_id}`)
      })
      .catch(error => console.log(error));
  }

  const submitAnswer = (newAnswer) => {
    axios.post(`/qa/questions/${currentQuestionId}/answers`, {
      body: {
        answerBody: newAnswer.answerBody,
        photos: newAnswer.photos,
        email: newAnswer.email,
        name: newAnswer.name,
      }
    })
    .then(() => {
      console.log(`Added Answer from ${newAnswer.name}`)
    })
    .catch(error => console.log(error));
  }

  // /qa/questions/:question_id/answers
  return (
    <AnswersContext.Provider value={
      {answers,
      isLoaded,
      }}>
        <AnswersUpdateContext.Provider value={{
          reportAnswer,
          markAnswerHelpful,
          submitAnswer,
        }}>
          {children}
        </AnswersUpdateContext.Provider>
      </AnswersContext.Provider>
  )
}