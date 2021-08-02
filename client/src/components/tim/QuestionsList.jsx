import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

import Modal from './Modal.jsx';
import AddQuestion from './AddQuestion.jsx';
import QuestionItem from './QuestionItem.jsx';
import QuestionSearch from './QuestionSearch.jsx'
import QuestionContext from './QuestionContext.jsx';

import { useQuestions } from './QuestionsContext.jsx';
import { AnswersProvider } from './AnswersContext.jsx';
import { QuestionAnimationButton } from './StyleHelpers.jsx';


const QuestionsList = () => {
  const [questionsList, setQuestionsList] = useState([]);
  const [maxListCount, setMaxListCount] = useState(4);
  const [isOpen, setOpen] = useState(false);

  const { filteredQuestions } = useQuestions();

  useEffect(() => {
    setQuestionsList(filteredQuestions);
    setMaxListCount(4);
  }, [filteredQuestions])


  // Loads two additional questions at a time up to
  const loadMoreQuestions = () => {
    const newMax = maxListCount + 2;
    newMax < questionsList.length ? setMaxListCount(newMax) : setMaxListCount(questionsList.length);
  }
  //Needs Stylizing
// questions-list
// need a wrapper around items

  return (
    <div className="questions-list"
      style={{
        "gridColumn": "2",
        "verticalAlign" : "center",
        "width": "100%",
        "height": "90vh"
    }}>
      <h3>QUESTIONS & ANSWERS</h3>
      <QuestionSearch style={{
        "display": "flex",
        "alignItems": "center",
    }}/><div style={{
      "overflowY": "auto",
      "height": "100%",
      "display": "grid",
  }}>
      { questionsList &&
         questionsList.slice(0, maxListCount).map((item) =>
          <QuestionContext.Provider value={item} key={item.question_id}>
            <AnswersProvider value={item} key={item.question_id}>
              <QuestionItem question={item} key={item.question_id}/>
            </AnswersProvider>
          </QuestionContext.Provider>
      )}</div>
      <QuestionAnimationButton
          className="more-question-btn"
          onClick={ () => loadMoreQuestions() }>
          <FaPlus style={{
            "position": "relative",
             "marginRight" : "7px",
            }}/>
            MORE ANSWERED QUESTIONS
      </QuestionAnimationButton>
      <QuestionAnimationButton
        className="add-question-btn"
        onClick={ () => setOpen(true) }>
          <FaPlus style={{
          "position": "relative",
           "marginRight" : "7px",
          }}/>
          ADD A QUESTION
      </QuestionAnimationButton>
      <div className="add-question-modal">
        <Modal
          isOpen={ isOpen }
          close={ () => setOpen(false) }>
            <AddQuestion close={ () => setOpen(false) }/>
        </Modal>
      </div>
    </div>
  );
}

export default QuestionsList;