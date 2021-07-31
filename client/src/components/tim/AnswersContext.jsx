import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import QuestionContext from './QuestionContext.jsx';
import { useQuestionsUpdate } from './QuestionsContext.jsx'
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

  const currentQuestion = useContext(QuestionContext);
  const currentQuestionId = currentQuestion.question_id;
  const getQuestions = useQuestionsUpdate().getQuestions;

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
      .then(getQuestions())
      .catch(error => console.log(error));
  }

  const submitAnswer = (newAnswer) => {
    axios.post(`/qa/questions/${currentQuestionId}/answers`, {
      body: newAnswer,
    })
    .then(() => {
      console.log(`Added Answer from ${newAnswer.name}`)
    })
    .catch(error => console.log(error));

    //setAnswers(newAnswer)
  }

  return (
    <AnswersContext.Provider value={
      {answers,
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