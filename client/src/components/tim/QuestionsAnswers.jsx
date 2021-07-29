import React from 'react';

import QuestionSearch from './QuestionSearch.jsx'
import QuestionsList from './QuestionsList.jsx';
import { QuestionsProvider } from './QuestionsContext.jsx'

// Main
const QuestionsAnswers = () => {
  return (
    <div className="questions-answers-module" >
        <QuestionsProvider>
          <QuestionSearch />
          <QuestionsList />
        </QuestionsProvider>
    </div>
  )
}

export default QuestionsAnswers;