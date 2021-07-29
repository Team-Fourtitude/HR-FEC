import React from 'react';

import QuestionSearch from './QuestionSearch.jsx'
import QuestionsList from './QuestionsList.jsx';
import { QuestionsProvider } from './QuestionsContext.jsx'

// Main
const QuestionsAnswers = () => {
  const style = {
    "display": "flex",
    "margin": "auto",
    "maxWidth": "1800px",
    "width": "80%",
    "padding": "20",
  }

  return (
    <div className="questions-answers-module" style={{style}}>
        <QuestionsProvider>
          <QuestionSearch />
          <QuestionsList style={{
            "position": "absolute",
            "align": "center",
          }}/>
        </QuestionsProvider>
    </div>
  )
}

export default QuestionsAnswers;