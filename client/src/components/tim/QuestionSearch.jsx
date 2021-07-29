import React, {useState} from 'react';
import { useQuestionsUpdate } from './QuestionsContext.jsx'

const QuestionSearch = () => {
  const [query, setQuery] = useState('');
  const questionUpdaters = useQuestionsUpdate();

  const filterQuestions = (q) => {
    // dynamic filter questions after 3rd char
    setQuery(q);
    questionUpdaters.queryQuestions(q)
  }

  return (
    <div className='question-search'>
      <input type='text'
      className='question-search-input'
      value={query}
      onChange={e => {filterQuestions(e.target.value)}}
      placeholder='Have a question? Search for answers…'
    />
    </div>
  )
}

export default QuestionSearch;