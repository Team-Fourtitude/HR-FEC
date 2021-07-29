import React from 'react';
import QuestionsList from './QuestionsList.jsx';
import { QuestionsProvider } from './QuestionsContext.jsx'

// Main
const QuestionsAnswers = () => {

  return (
    <div className="questions-answers-module" style={{
      "display": "grid",
      "gridTemplateColumns": "repeat (5, 1fr)",
      "gridTemplateRows": "auto",
      "width": "80%",
      "margin": "50px",
      }}>
        <QuestionsProvider>
          <QuestionsList />
        </QuestionsProvider>
    </div>
  )
}

export default QuestionsAnswers;