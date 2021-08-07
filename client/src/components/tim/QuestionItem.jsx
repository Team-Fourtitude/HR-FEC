import React, { useState, useEffect, useContext } from 'react';
//import ReactDOM from 'react-dom';

import Modal from './Modal.jsx';
import AnswerItem from './AnswerItem.jsx';
import SubmissionPost from './SubmissionPost.jsx';
import HelpfulFeedback from './HelpfulFeedback.jsx'
import { LoadMoreAnswersButton, QuestionTitleWrapper, QuestionHeaderContainer, QuestionHelpfulContainer, QuestionPosterContainer } from './StyleHelpers.jsx'

import QuestionContext from './QuestionContext.jsx';
import AnswerItemContext from './AnswerItemContext.jsx';
import { useQuestionsUpdate } from './QuestionsContext.jsx';
import { useAnswersUpdate } from './AnswersContext.jsx'

//import {QuestionsProvider} from './QuestionsContext.jsx'

const QuestionItem = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [question, setQuestion] = useState({});
  const [allAns, setAllAns] = useState([]);
  const [maxAnsCount, setMaxAnsCount] = useState(2);
  const [hasHelped, setHasHelped] = useState(false);
  const [isBtnHidden, setBtnToHide] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const { markQuestionHelpful } = useQuestionsUpdate();

  const currentQuestion = useContext(QuestionContext);

  const submitAnswer = useAnswersUpdate().submitAnswer;

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
    if (hasHelped) {
      setQuestion({...question, helpfulness: question.question_helpfulness + 1});
      markQuestionHelpful(currentQuestion.question_id, hasHelped);
    }
  }, [hasHelped])

  useEffect(() => {
    if (isBtnHidden && allAns.length !== question.answers.length) setBtnToHide(false);
  }, [allAns.length])

  const loadMoreAnswers = () => {
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
    setHasHelped(true);
  }

  const addAnswer = () => {
    setOpen(true);
  }

  return(
  <div className="question-item">
    <div className={`question-container${ hasHelped ? "-helpful" : ""}`}>
      {isLoaded && <QuestionTitleWrapper>
        <QuestionHeaderContainer>
          <h2>Q: {question.question_body}</h2>
        </QuestionHeaderContainer>
        <QuestionPosterContainer>
          <span>by {question.asker_name}</span>
        </QuestionPosterContainer>
        <QuestionHelpfulContainer>
          <HelpfulFeedback
          help={markHelpful}
          helpCount={question.question_helpfulness}
          action={addAnswer}
          actionType={'Add Answer'} />
        </QuestionHelpfulContainer>
      </QuestionTitleWrapper>}
      {' '}
      <div
        className="answer-list"
        style={{margin: 10}}>
          { allAns.slice(0, maxAnsCount).map((id) =>
          <AnswerItemContext.Provider value={question.answers[id]} key={id}>
              <AnswerItem key={id} />
          </AnswerItemContext.Provider>
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
            <SubmissionPost close={ () => setOpen(false) } submitAction={submitAnswer} question_body={question.question_body}/>
        </Modal>
      </div>
    </div>
  </div>)
}

export default QuestionItem;
