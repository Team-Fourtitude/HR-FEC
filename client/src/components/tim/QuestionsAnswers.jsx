import React from 'react';
import QuestionsList from './QuestionsList.jsx';
import { QuestionsProvider } from './QuestionsContext.jsx'

// Main
const QuestionsAnswers = () => {

  return (
    <div style={
      {"paddingTop": "2vh",
      "paddingBottom": "1vh",
      "position": "relative",
      "margin": "auto",
      "width": "100%",
      "maxWidth": "1800px",
      "display": "grid",
      "gridTemplateColumns": "repeat(5, 1fr)","gridTemplateRows": "auto",}
    }>
      <div className="questions-answers-module" style={{
        "gridColumn": "3 / 4",
        "display": "grid",
        "width": "100%",
        }}>
          <QuestionsProvider>
            <QuestionsList />
          </QuestionsProvider>
      </div>
    </div>
  )
}

export default QuestionsAnswers;

