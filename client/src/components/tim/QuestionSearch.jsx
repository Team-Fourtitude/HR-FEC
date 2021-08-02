import React, {useState} from 'react';
import { useQuestionsUpdate } from './QuestionsContext.jsx'

const QuestionSearch = () => {
  const [query, setQuery] = useState('');
  const questionUpdaters = useQuestionsUpdate();

  const filterQuestions = (q) => {
    // Searches only
    setQuery(q);
    if (q.length > 2 || query.length > 2) questionUpdaters.queryQuestions(q)
  }

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
          onChange={e => {filterQuestions(e.target.value)}}
          placeholder='Have a question? Search for answers…'/>
      </div>
    </div>
  )
}

export default QuestionSearch;