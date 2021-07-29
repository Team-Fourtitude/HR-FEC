import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';

import Modal from './Modal.jsx';
import AddAnswer from './AddAnswer.jsx';
import AnswerItem from './AnswerItem.jsx';
// import HelpfulFeedback from './HelpfulFeedback.jsx'
import { useQuestionsUpdate } from './QuestionsContext.jsx';


//import {QuestionsProvider} from './QuestionsContext.jsx'

const QuestionItem = (props) => {
  const [allAns, setAllAns] = useState([]);
  const [maxAnsCount, setMaxAnsCount] = useState(2);
  const [isBtnHidden, setBtnToHide] = useState(false);

  const questionUpdaters = useQuestionsUpdate();


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

  const addAnswer = () => {

  }

  useEffect(() => {
    setAllAns(sortAnswers());
  }, [])

  return(<div className="question-item">
    <div className="question-title">
      <h3>Q: {props.question.question_body}</h3>
      <div className="question-sub-text">
        by {props.question.asker_name} | Helpful?  <u
        onClick={() => {questionUpdaters.markQuestionHelpful(props.question.question_id)}}
        style={{cursor: 'pointer'}}>
           Yes</u>
        <span> ({props.question.question_helpfulness}) | </span>
        <u
          style={{cursor: 'pointer'}}
          onClick={() => {console.log(`Add attempt`)}}
        >Add Answer</u>
      </div>
    </div>
    {' '}
    <div
      className='answer-list'
      style={{margin: 10}}>
      {allAns.slice(0, maxAnsCount).map((id) => <AnswerItem answer={props.question.answers[id]}
      key={id} />)}
      {(!isBtnHidden && allAns.length > 2) &&
      <button
      className="LoadMoreAns"
      onClick={() => loadMoreAnswers()}>
        LOAD MORE ANSWERS
      </button>}
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