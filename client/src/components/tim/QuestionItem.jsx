import React, { useState, useEffect, useContext } from 'react';
//import ReactDOM from 'react-dom';

import Modal from './Modal.jsx';
import AddAnswer from './AddAnswer.jsx';
import AnswerItem from './AnswerItem.jsx';
import { ImArrowUp } from 'react-icons/im';
import { LoadMoreAnswersButton } from './StyleHelpers.jsx'

import AnswerContext from './AnswerContext.jsx';
import QuestionContext from './QuestionContext.jsx';
import { useQuestionsUpdate } from './QuestionsContext.jsx';

//import {QuestionsProvider} from './QuestionsContext.jsx'

const QuestionItem = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [question, setQuestion] = useState({});
  const [allAns, setAllAns] = useState([]);
  const [maxAnsCount, setMaxAnsCount] = useState(2);
  const [hasHelped, setHasHelped] = useState(false);
  const [isBtnHidden, setBtnToHide] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const questionUpdaters = useQuestionsUpdate();

  const currentQuestion = useContext(QuestionContext);

  useEffect(() => {
    if (currentQuestion !== undefined) {
      setLoaded(true);
      setQuestion(currentQuestion);
    }
  }, [currentQuestion])

  useEffect(() => {
    if (isLoaded) {
      sortAnswers();
    }
  }, [question])

  useEffect(() => {
    if (isBtnHidden && allAns.length !== question.answers.length) setBtnToHide(false);
  }, [allAns.length])

  const loadMoreAnswers = () => {
     //console.log(`This is the current question: ${JSON.stringify(question)}`)
    const newMax = maxAnsCount + 2;
    if (newMax < allAns.length) {
      setMaxAnsCount(newMax)
    } else {
      setMaxAnsCount(allAns.length);
      setBtnToHide(true);
    }
  }

  //Split answerers by seller status, then sort seprately, then concat buyers onto sellers
  const sortAnswers = () => {
    let buyers = [];
    let sellers = [];
    const target = 'seller';
    const answers = question.answers;
    let ansByKeys = Object.keys(answers);

    ansByKeys.forEach((id) => {
      (answers[id].answerer_name.toLowerCase() === target) ? sellers.push(id) : buyers.push(id);
    })

    sellers = sortByHelpful(sellers, answers);
    buyers = sortByHelpful(buyers, answers);

    setAllAns(sellers.concat(buyers));
  }

  const sortByHelpful = (idArr, answers) => {
    return idArr.sort((a, b) => {
      return answers[b].helpfulness - answers[a].helpfulness;
    })
  }

  const markHelpful = () => {
    setQuestion({...question, helpfulness: question.question_helpfulness++})
    questionUpdaters.markQuestionHelpful(currentQuestion.question_id, hasHelped);
    setHasHelped(true);
  }

  return(
  <div className="question-item">
    <div className={`question-container${ hasHelped ? "-helpful" : ""}`}>
      <div className="question-title">
        <h3>Q: {question.question_body}</h3>
        <div className="question-sub-text">
          by {question.asker_name} | Helpful?  {!hasHelped ? ' ' : <ImArrowUp style={{fill: "orange"}}/>}<u
          onClick={() => { markHelpful() }}
          style={{cursor: "pointer"}}>
            Yes</u>
            {' '} ({currentQuestion.question_helpfulness}) | {' '}
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
        <AnswerContext.Provider value={question.answers[id]} key={id}>
            <AnswerItem key={id} />
        </AnswerContext.Provider>
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
            <AddAnswer close={ () => setOpen(false) }/>
        </Modal>
      </div>
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