import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
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

  // API fetch current answers for question
  const getAnswers = (qid) => {
    console.log(`Current Question: ${qid}`);
    axios.get(`/qa/questions/${qid}/answers`, {
        params: {
          id: qid,
        },
      })
    .then(data => {
      setAnswers(data.data.results)
    })
    .catch(error => console.log(error));
  }

  const sortAnswers = () => {
    // Need to Update for
    const sortedByHelp = answers.sort((a, b) => {
      return [b].helpfulness - [a].helpfulness
    })
    //console.log(`This is the sorted array ${sortedAnswers}`)
    setSortedAnswers(sortedAnswers);
  }

  return (
    <AnswersContext.Provider value={
      {answers,
      sortedAnswers}}>
        <AnswersUpdateContext.Provider value={{
          getAnswers,
        }}>
          {children}
        </AnswersUpdateContext.Provider>
      </AnswersContext.Provider>
  )
}