import React, { useState } from 'react';

import QuestionItem from './QuestionItem.jsx';
import Modal from './Modal.jsx';
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

  const style = {
    width: '80vw',
    display: 'flex',
    justifyContent: 'center',
  }

  return (
    <div className="QuestionsList" style={{style}}>
      <h2>QUESTIONS & ANSWERS</h2>
      { questions &&
         questions.slice(0, maxQuestionsCount).map((item) =>
          <QuestionItem question={item} key={item.question_id}/>
      )}
      <button
        className="MoreQuestBtn"
        onClick={ () => loadMoreQuestions() }>
          MORE ANSWERED QUESTIONS
      </button>
      <button
        className="AddQuestBtn"
        onClick={ () => setOpen(true) }>
          ADD A QUESTION
      </button>
      <div style={{ transform: "translateX(50px)" }}>
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