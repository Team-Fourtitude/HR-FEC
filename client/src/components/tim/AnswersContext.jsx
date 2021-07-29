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
  const [sortedAnswers, setSortedAnswers] = useState([]);

  const currentQuestion = useContext(QuestionContext);
  const currentQuestionId = currentQuestion.question_id;

  // API fetch current answers for question
  const getAnswers = () => {
    console.log(`Current Question Id: ${currentQuestionId}`);
    axios.get(`/qa/questions/${currentQuestionId}/answers`, {
        params: {
          question_id: currentQuestionId,
        },
      })
    .then(data => {
      setAnswers(data.data.results)
    })
    .catch(error => console.log(error));
  }

  const sortAnswers = () => {
    const sortedByHelp = answers.sort((a, b) => {
      return [b].helpfulness - [a].helpfulness
    })
    setSortedAnswers(sortedByHelp);
  }

  const markAnswerHelpful = (answer_id, hasHelped) => {
    // PUT upvoteed question
    if (hasHelped) return;
    axios.put(`/qa/answers/${answer_id}/helpful`)
      .then(() => {
        console.log(`Marked Answer Helpful: ${answer_id}`)
        getAnswers()
      })
      .catch(error => console.log(error));
  }

  const reportAnswer = (answer_id) => {
    // PUT reported question
    axios.put(`/qa/answers/${answer_id}/report`)
      .then(() => {
        console.log(`Reported Answer: ${answer_id}`)
        getAnswers()
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getAnswers()
  }, [currentQuestionId])

  return (
    <AnswersContext.Provider value={
      {answers,
      sortedAnswers}}>
        <AnswersUpdateContext.Provider value={{
          getAnswers,
          sortAnswers,
          reportAnswer,
          markAnswerHelpful,
        }}>
          {children}
        </AnswersUpdateContext.Provider>
      </AnswersContext.Provider>
  )
}