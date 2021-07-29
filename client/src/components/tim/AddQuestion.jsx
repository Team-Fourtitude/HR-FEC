import React, { useState } from 'react';
import { ModalInput, ModalForm, ModalTextArea } from './StyleHelpers.jsx';

import { useQuestionsUpdate } from './QuestionsContext.jsx';

const AddQuestion = () => {
  const [questionBody, setQuestionBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [canSubmit, setCanSubmit] = useState(true);

  const questionUpdaters = useQuestionsUpdate();

  const validQuestion = {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidBody() && isValidName() && isValidEmail()) {
      validQuestion.questionBody = questionBody;
      validQuestion.name = nickname;
      validQuestion.email = email;
      questionUpdaters.addQuestion(validQuestion)
    } else {
      console.log(`Not Valid`)
      setCanSubmit(false);
    }
    console.log(validQuestion)
  }

  const isValidBody = () => {
    console.log('Good body')
    return (questionBody.length <= 1000);
  }

  const isValidName = () => {
    console.log('Good name')
    return (nickname.length <= 60);
  }

  const isValidEmail = () => {
    console.log('Good email')
    return (email.length <= 60 && email.includes('@'));
  }

  return (
    <div>
      <div className='add-question-header'>
        <h2>Add a Question</h2>
        <h4>Mandatory Fields Are Indicated With A *</h4>
        {!canSubmit &&
        <p
        style={{color: 'red'}}>
          Current Submission Is Not Valid...
        </p>}
      </div>
      <ModalForm onSubmit={e => handleSubmit(e)}>
        <span>Your Question* :</span>
          <ModalTextArea
            type='text'
            value={questionBody}
            rows='10'
            onChange={e => setQuestionBody(e.target.value)}
          />
      <label>Your Nickname* :
        <ModalInput
          type='text'
          maxlength='60'
          value={nickname}
          placeholder='jack543!'
          onChange={e => setNickname(e.target.value)}
        />
      </label>
      <label>Your Email* :
        <ModalInput
          type='text'
          maxlength='60'
          value={email}
          placeholder='Example: jack@email.com'
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <span>
        For authentication reasons, you will not be emailed
      </span>
      <button
      onClick={e => handleSubmit(e)}>
        Submit
      </button>
    </ModalForm>
  </div>
  )
}

export default AddQuestion;