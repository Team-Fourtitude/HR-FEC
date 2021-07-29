import React, { useState } from 'react';
import QuestionContext from './QuestionContext.jsx';
import { AnswersProvider } from './AnswersContext.jsx';
import QuestionItem from './QuestionItem.jsx';
import Modal from './Modal.jsx';
import QuestionSearch from './QuestionSearch.jsx'
import AddQuestion from './AddQuestion.jsx';
import { useQuestions } from './QuestionsContext.jsx';

const QuestionsList = () => {
  const [maxQuestionsCount, setMaxQuestionsCount] = useState(4);
  const [isOpen, setOpen] = useState(false);

  const { questions } = useQuestions();

  const loadMoreQuestions = () => {
    const newMax = maxQuestionsCount + 2;
    newMax < questions.length ? setMaxQuestionsCount(newMax) : setMaxQuestionsCount(questions.length);
  }

  return (
    <div className="questions-list" style={{
      "gridColumn": "2",
      "verticalAlign" : "center",
    }}>
      <h3>QUESTIONS & ANSWERS</h3>
      <QuestionSearch />
      { questions &&
         questions.slice(0, maxQuestionsCount).map((item) =>
          <QuestionContext.Provider value={item} key={item.question_id}>
            <AnswersProvider value={item} key={item.question_id}>
              <QuestionItem question={item} key={item.question_id}/>
            </AnswersProvider>
          </QuestionContext.Provider>
      )}
      <button
        className="more-question-btn"
        onClick={ () => loadMoreQuestions() }>
          MORE ANSWERED QUESTIONS
      </button>
      <button
        className="add-question-btn"
        onClick={ () => setOpen(true) }>
          ADD A QUESTION
      </button>
      <div className="add-question-modal">
        <Modal
          isOpen={ isOpen }
          close={ () => setOpen(false) }>
            <AddQuestion />
        </Modal>
      </div>
    </div>
  );
}

export default QuestionsList;