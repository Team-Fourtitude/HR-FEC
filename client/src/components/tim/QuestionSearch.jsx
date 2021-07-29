import React, {useState} from 'react';
import { BiSearchAlt } from 'react-icons/bi';
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
    <div className="question-search" style={{
      "gridColumn": "2",
      "verticalAlign" : "center",
    }}>
      <div className="question-search-bar">
        <input
          type='text'
          className='question-search-input'
          value={query}
          onChange={e => {filterQuestions(e.target.value)}}
          placeholder='Have a question? Search for answers…'/>
      </div>
    </div>
  )
}

export default QuestionSearch;