import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import ProductContext from '../context/ProductContext.jsx';
/* eslint react/prop-types: 0 */

const QuestionsContext = createContext(null);
const QuestionsUpdateContext = createContext();

export const useQuestions = () => {
  return useContext(QuestionsContext);
}

export const useQuestionsUpdate = () => {
  return useContext(QuestionsUpdateContext);
}

export const QuestionsProvider = ({children}) => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [query, setQuery] = useState('');

  const currentProduct = useContext(ProductContext);
  const product = currentProduct.product;

  const getQuestions = (product_id = 25171) => {
    axios.get(`/qa/questions/${product_id}`, {
        params: {
          id: product_id,
        },
      })
    .then(data => {
      setQuestions(data.data.results)
      setFilteredQuestions([])
    })
    .catch(error => console.log(error));
  }

  const addQuestion = (newQuestion) => {
    axios.post(`/qa/questions/`, {
      body: {
        product_id: product.id,
        body: newQuestion.questionBody,
        email: newQuestion.email,
        name: newQuestion.name,
      }
    })
    .then(() => {
      console.log(`Added Question from ${newQuestion.name}`)
      getQuestions(product.id)
    })
    .catch(error => console.log(error));
  }

  const markQuestionHelpful = (question_id, hasHelped) => {
    // PUT upvoteed question
    if (hasHelped) return;
    axios.put(`/qa/questions/${question_id}/helpful`)
      .then(() => {
        console.log(`Marked Question Helpful: ${question_id}`)
        getQuestions(product.id)
      })
      .catch(error => console.log(error));
  }

  const reportQuestion = (question_id) => {
    // PUT reported question
    axios.put(`/qa/questions/${question_id}/report`)
      .then(() => {
        console.log(`Reported Question: ${question_id}`)
        getQuestions(product.id)
      })
      .catch(error => console.log(error));
  }

  const queryQuestions = (target) => {
    // Needs Reworking for product change
    if (target.length > 2 || query.length > 2) {

      let currentQuestions = [];

      if (filteredQuestions.length === 0) {
        currentQuestions = questions;
        setFilteredQuestions(questions)
      } else {
        currentQuestions = filteredQuestions;
      }

      // console.log(`These are the filtered questions ${filteredQuestions}`)
      // console.log(`These are the reg questions ${questions}`)

      const searchTerm = target.toLowerCase();
      setQuery(searchTerm)

      const results = currentQuestions.filter(question => {
        return question.question_body.toLowerCase().includes(searchTerm)
      })
      setQuestions(results)
      console.log(results)
    } else {
      if (filteredQuestions.length > 0) setQuestions(filteredQuestions)
    }
  }

  const getAnswersByQuestion = (qid) => {
    for (let question of questions ){
      if (question.question_id === qid) return question.answers;
    }
  }

  useEffect(() => {
    getQuestions(product.id)
    if (query.length > 2) {
      queryQuestions(query)
    }
  }, [product])

  return (
    <QuestionsContext.Provider value={{questions, filteredQuestions}}>
      <QuestionsUpdateContext.Provider value={{
        getQuestions,
        addQuestion,
        reportQuestion,
        queryQuestions,
        markQuestionHelpful,
        getAnswersByQuestion
        }}>
      {children}
      </QuestionsUpdateContext.Provider>
    </QuestionsContext.Provider>
  )
}