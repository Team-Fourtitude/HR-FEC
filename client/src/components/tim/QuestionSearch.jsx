import React, { useState, useEffect } from 'react';
import { useQuestionsUpdate } from './QuestionsContext.jsx'

const QuestionSearch = () => {
  const [query, setQuery] = useState('');
  const questionUpdaters = useQuestionsUpdate();

  useEffect(() => {
    if (query.length > 1) questionUpdaters.queryQuestions(query)
  }, [query])

  return (
    <div className="question-search">
      <div className="question-search-bar"
        style={{
          "display": "flex",
          "width": "100%",
          "justifyContent": "center",
      }}>
        <input
          type='text'
          className='question-search-input'
          value={query}
          style={{
            "width": "80%",
          }}
          onChange={e => {setQuery(e.target.value)}}
          placeholder='Have a question? Search for answers…'/>
      </div>
    </div>
  )
}

export default QuestionSearch;