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
  const [hasProductLoaded, setProductLoaded] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [fetching, setFetched] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [query, setQuery] = useState('');
  const [reported, setReported] = useState(false);

  const currentProduct = useContext(ProductContext);
  const product = currentProduct.product;

  useEffect(() => {
    if (product.id) {
      setProductLoaded(true);
    }
  }, [product])

  // get new set of questions
  // filter results if local state query is met
  useEffect(() => {
    getQuestions(product.id)
  }, [hasProductLoaded, fetching])

  useEffect(() => {
    queryQuestions(query)
  }, [questions])

  useEffect(() => {
    if(reported) {
      console.log('Bad to the Bone!')
      getQuestions();
      setReported(false);
    }
  }, [reported])

  const getQuestions = (product_id = product.id) => {
    console.log(`This is the current pid: ${product_id}`)
    if (hasProductLoaded) {
      axios.get(`/qa/questions/${product_id}`, {
        params: {
          id: product_id,
        },
      })
      .then(data => {
        setQuestions(data.data.results)
      })
      .catch(error => console.log(error));
    }
  }

  const addQuestion = (newQuestion) => {
    axios.post(`/qa/questions/`, {
      body: {
        product_id: product.id,
        body: newQuestion.body,
        email: newQuestion.email,
        name: newQuestion.name,
      }
    })
    .then(() => {
      console.log(`Added Question from ${newQuestion.name}`)
      setFetched(true);
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
    // Check the length of the passed target or the current local query

    // Are target conditions correct? ie filter for input > 3
    // make a copy of immutable current questions
    // flatten target to lowcase and set current target to local query state
    // set a soln array to results of filtering current Questions on
    // each items lower cased body including the target
    // SHOULD BE setfiltered question to soln
    // therefore filteredQuestions should be ssoT ie only one passed to context provider

    if (target.length > 2) {
      target = target.toLowerCase();
      setQuery(target);
      const results = questions.filter(questionItem => {
        return questionItem.question_body.toLowerCase().includes(target);
      })
      console.log(`\n These are the reg questions:\n${JSON.stringify(questions)}\n`)
      console.log(`These are the filtered questions:\n${JSON.stringify(filteredQuestions)}\n`)

      setFilteredQuestions(results);
    } else {
      setFilteredQuestions(questions);
    }

  }

  const getAnswersByQuestion = (qid) => {
    for (let question of questions ){
      if (question.question_id === qid) return question.answers;
    }
  }

  const reportAnswer = (answer_id) => {
    axios.put(`/qa/answers/${answer_id}/report`)
      .then(() => {
        setReported(true);
        console.log(`Reported Answer in Qcontext: ${answer_id}`)
      })
      .catch(error => console.log(error));
  }

  return (
    <QuestionsContext.Provider value={{questions, filteredQuestions}}>
      <QuestionsUpdateContext.Provider value={{
        getQuestions,
        addQuestion,
        reportQuestion,
        queryQuestions,
        markQuestionHelpful,
        getAnswersByQuestion,
        reportAnswer,
        }}>
      {children}
      </QuestionsUpdateContext.Provider>
    </QuestionsContext.Provider>
  )
}