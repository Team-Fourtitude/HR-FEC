import React, {useState} from 'react';
import QuestionsList from './QuestionsList.jsx';
import { QuestionsProvider } from './QuestionsContext.jsx'
import { ModuleBackground, QuestionsAnswersWrapper, ModuleWrapper } from './StyleHelpers.jsx'

// Main
const QuestionsAnswers = () => {

  return (
    <ModuleBackground>
      <ModuleWrapper>
        <QuestionsAnswersWrapper>
            <QuestionsProvider>
              <QuestionsList />
            </QuestionsProvider>
        </QuestionsAnswersWrapper>
      </ModuleWrapper>
    </ModuleBackground>
  )
}

export default QuestionsAnswers;

