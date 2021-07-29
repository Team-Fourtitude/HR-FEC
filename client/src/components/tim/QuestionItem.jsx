import React, { useState, useEffect, useContext } from 'react';
//import ReactDOM from 'react-dom';

import Modal from './Modal.jsx';
import AnswerItem from './AnswerItem.jsx';
import AddQuestion from './AddQuestion.jsx';
import QuestionContext from './QuestionContext.jsx';
import { useAnswersUpdate } from './AnswersContext.jsx';
import { LoadMoreAnswersButton } from './StyleHelpers.jsx'
import { useQuestionsUpdate } from './QuestionsContext.jsx';


//import {QuestionsProvider} from './QuestionsContext.jsx'

const QuestionItem = (props) => {
  const [allAns, setAllAns] = useState([]);
  const [maxAnsCount, setMaxAnsCount] = useState(2);
  const [hasHelped, setHasHelped] = useState(false);
  const [isBtnHidden, setBtnToHide] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const questionUpdaters = useQuestionsUpdate();
  const answerUpdaters = useAnswersUpdate();
  const currentQuestion = useContext(QuestionContext);

  useEffect(() => {
    answerUpdaters.sortAnswers();
  }, [])

  const loadMoreAnswers = () => {
    const newMax = maxAnsCount + 2;
    if (newMax < allAns.length) {
      setMaxAnsCount(newMax)
    } else {
      setMaxAnsCount(allAns.length);
      setBtnToHide(true);
    }
  }

  const sortAnswers = () => {
    // Need to Update for
    let ansByKeys = Object.keys(props.question.answers);
    const sortedAnswers = ansByKeys.sort((a, b) => {
      return props.question.answers[b].helpfulness - props.question.answers[a].helpfulness
    })
    //console.log(`This is the sorted array ${sortedAnswers}`)
    return sortedAnswers;
  }

  return(<div className="question-item">
    <div className="question-title">
      <h3>Q: {currentQuestion.question_body}</h3>
      <div className="question-sub-text">
        by {currentQuestion.asker_name} | Helpful?  <u
        onClick={() => {
          questionUpdaters.markQuestionHelpful(currentQuestion.question_id, hasHelped);
          setHasHelped(true);
        }}
        style={{cursor: "pointer"}}>
           Yes</u>
        <span> ({currentQuestion.question_helpfulness}) | </span>
        <u className="add-answer-link"
          style={{cursor: "pointer"}}
          onClick={ () => setOpen(true) }
        >Add Answer</u>
      </div>
    </div>
    {' '}
    <div
      className="answer-list"
      style={{margin: 10}}>
        { allAns.slice(0, maxAnsCount).map((id) =>
            <AnswerItem answer={currentQuestion.answers[id]}
            key={id} />
        )}
      {(!isBtnHidden && allAns.length > 2) &&
      <LoadMoreAnswersButton
        onClick={() => loadMoreAnswers()}
        style={{"cursor": "pointer",
        "fontWeight": "bold"}}>
        LOAD MORE ANSWERS
      </LoadMoreAnswersButton>}
    </div>
    <div className="add-answer-modal">
        <Modal
          isOpen={ isOpen }
          close={ () => setOpen(false) }>
            <AddQuestion />
        </Modal>
      </div>
  </div>)
}

export default QuestionItem;

// {props.questions.answers && Object.keys(props.questions.answers).map((answer) => <AnswerItem answer={answer} key={answer.id} />)}

{/* <div style={{ transform: "translateX(50px)" }}>
  <Modal
    isOpen={ isOpen }
    close={ () => setOpen(false) }>
      <AddAnswer />
  </Modal>
</div> */}

{/* <HelpfulFeedback helpCount={props.question.question_helpfulness} increaseHelp={() => {questionUpdaters.markQuestionHelpful(props.question.question_id)}}/> */}
// questionUpdaters.reportQuestion(props.question.question_id)