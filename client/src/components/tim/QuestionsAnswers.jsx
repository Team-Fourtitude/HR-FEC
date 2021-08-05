import React from 'react';
import QuestionsList from './QuestionsList.jsx';
import { QuestionsProvider } from './QuestionsContext.jsx'
import { QuestionsAnswersWrapper, ModuleWrapper } from './StyleHelpers.jsx'

// Main
const QuestionsAnswers = () => {

  return (
    <ModuleWrapper>
      <QuestionsAnswersWrapper>
          <QuestionsProvider>
            <QuestionsList />
          </QuestionsProvider>
      </QuestionsAnswersWrapper>
    </ModuleWrapper>
  )
}

export default QuestionsAnswers;

