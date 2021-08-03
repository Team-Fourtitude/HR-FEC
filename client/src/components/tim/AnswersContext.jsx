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
  const [questionLoad, setQuestionLoaded] = useState(false);

  const question = useContext(QuestionContext);
  const question_id = question.question_id;
  const updateQuestions = useQuestionsUpdate();

  // Verify current Question context
  useEffect(() => {
    question_id ? setQuestionLoaded(true) : setQuestionLoaded(false);
  }, [question_id])

  const markAnswerHelpful = (answer_id, hasHelped) => {
    // PUT upvoteed question
    if (hasHelped) return;
    axios.put(`/qa/answers/${answer_id}/helpful`)
      .then(() => {
        console.log(`Marked Answer Helpful: ${answer_id}`)
      })
      .catch(error => console.log(error));
  }

  const submitAnswer = (newAnswer) => {
    axios.post(`/qa/questions/${question_id}/answers`, {
      body: newAnswer,
    })
    .then(() => {
      updateQuestions.getQuestions();
      console.log(`Added Answer from ${newAnswer.name}`)
    })
    .catch(error => console.log(error));
    //setAnswers(newAnswer)
  }

  return (
    <AnswersContext.Provider value={
      {answers}}>
        <AnswersUpdateContext.Provider value={{
          markAnswerHelpful,
          submitAnswer,
        }}>
          {children}
        </AnswersUpdateContext.Provider>
      </AnswersContext.Provider>
  )
}