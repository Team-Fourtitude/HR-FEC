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

  // On question load should should sort and fetch answers
  // useEffect(() => {
  //   if (questionLoad) getAnswers();
  //   //console.log(`Current answers are: ${JSON.stringify(answers)}`)
  // }, [questionLoad, question])


  // const sortAnswers = (newAnswers) => {
  //   const target = 'seller';
  //   let sellers = [];
  //   let buyers = [];

  //   const sortByHelpful = (unsortedAns) => {
  //     const result = unsortedAns.sort((a, b) => {
  //       return b.helpfulness - a.helpfulness;
  //     })
  //     return result;
  //   }

  //   newAnswers.forEach((answer) => {
  //     (answer.answerer_name.toLowerCase().includes(target)) ? sellers.push(answer) : buyers.push(answer);
  //   })

  //   sellers = sortByHelpful(sellers);
  //   buyers = sortByHelpful(buyers);
  //   console.log(JSON.stringify(sellers))
  //   setAnswers(sellers.concat(buyers));
  // }

  // const getAnswers = () => {
  //   axios.get(`/qa/questions/${question_id}/answers`)
  //     .then(data => {
  //       sortAnswers(data.data.results)
  //     })
  //     .catch(error => console.log(error))
  // }

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
      getAnswers();
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
          markAnswerHelpful,
          submitAnswer,
        }}>
          {children}
        </AnswersUpdateContext.Provider>
      </AnswersContext.Provider>
  )
}