import React, { useState } from 'react';
import QuestionContext from './QuestionContext.jsx';
import { AnswersProvider } from './AnswersContext.jsx';
import QuestionItem from './QuestionItem.jsx';
import Modal from './Modal.jsx';
import QuestionSearch from './QuestionSearch.jsx'
import AddQuestion from './AddQuestion.jsx';
import { useQuestions } from './QuestionsContext.jsx';
import { QuestionAnimationButton } from './StyleHelpers.jsx';
import { FaPlus } from 'react-icons/fa';

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
      <QuestionAnimationButton
          className="more-question-btn"
          onClick={ () => loadMoreQuestions() }><FaPlus style={{
            "position": "relative",
             "marginRight" : "7px",
            }}/>
            MORE ANSWERED QUESTIONS
      </QuestionAnimationButton>
      <QuestionAnimationButton
        className="add-question-btn"
        onClick={ () => setOpen(true) }
        ><FaPlus style={{
          "position": "relative",
           "marginRight" : "7px",
          }}/>
          ADD A QUESTION
      </QuestionAnimationButton>
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