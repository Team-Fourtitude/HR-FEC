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
  const [isLoaded, setLoaded] = useState(false);

  const currentQuestion = useContext(QuestionContext);
  const currentQuestionId = currentQuestion.question_id;

  // API fetch current answers for question
  const getAnswers = (qid) => {
    axios.get(`/qa/questions/${qid}/answers`, {
        params: {
          question_id: qid,
        },
      })
    .then(data => {
    setAnswers(data.data.results)
    })
    .then(() => {
      sortAnswers()
    })
    .then(() => {
      setLoaded(true);
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

  const submitAnswer = (qid, newAnswer) => {
    axios.post(`/qa/questions/${qid}/answers`, {
      body: {
        answerBody: newAnswer.questionBody,
        email: newAnswer.email,
        photos: newAnswer.photos,
        name: newAnswer.name,
      }
    })
    .then(() => {
      console.log(`Added Answer from ${newAnswer.name}`)
    })
    .catch(error => console.log(error));
  }

  // /qa/questions/:question_id/answers

  useEffect(() => {
    setLoaded(false);
    getAnswers(currentQuestionId);
  }, [currentQuestion])

  return (
    <AnswersContext.Provider value={
      {answers,
      sortedAnswers,
      isLoaded,
      }}>
        <AnswersUpdateContext.Provider value={{
          getAnswers,
          sortAnswers,
          reportAnswer,
          markAnswerHelpful,
          submitAnswer,
        }}>
          {children}
        </AnswersUpdateContext.Provider>
      </AnswersContext.Provider>
  )
}