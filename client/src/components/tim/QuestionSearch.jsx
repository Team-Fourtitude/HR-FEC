import React, { useState, useEffect } from 'react';
import { useQuestionsUpdate } from './QuestionsContext.jsx'
import { QuestionsSearchBar, QuestionSearchWrapper } from './StyleHelpers.jsx'

const QuestionSearch = () => {
  const [query, setQuery] = useState('');
  const questionUpdaters = useQuestionsUpdate();

  // on query of 2 char, filtered questions reset
  useEffect(() => {
    if (query.length > 1) questionUpdaters.queryQuestions(query)
  }, [query])

  return (
    <div className="question-search">
      <QuestionSearchWrapper>
        <QuestionsSearchBar
          type='text'
          className='question-search-input'
          value={query}
          onChange={e => {setQuery(e.target.value)}}
          placeholder='Have a question? Search for answers…'/>
      </QuestionSearchWrapper>
    </div>
  )
}

export default QuestionSearch;