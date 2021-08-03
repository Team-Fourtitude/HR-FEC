import React, { useState, useEffect } from 'react';
import { ModalInput, ModalForm, ModalTextArea, ModalErrorText } from './StyleHelpers.jsx';

import { useQuestionsUpdate } from './QuestionsContext.jsx';

/* eslint react/prop-types: 0 */

const AddQuestion = ({ close }) => {
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [badInputResponse, setBadInputResponse] = useState({});
  const [canSubmit, setCanSubmit] = useState(true);

  const questionUpdaters = useQuestionsUpdate();

  const validQuestion = {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid()) {
      validQuestion.body = body;
      validQuestion.name = nickname;
      validQuestion.email = email;
      questionUpdaters.addQuestion(validQuestion);
      close();
    } else {
      console.log(`Not Valid`)
      setCanSubmit(false);
    }
    console.log(validQuestion)
  }

  useEffect(() => {
    setCanSubmit(true);
    setBadInputResponse({});
  }, [body, nickname, email])

  const isValid = () => {
    let valid = true;
    const ampIndex = email.indexOf('@');
    const dotIndex = email.indexOf('.');
    const currentResponse = badInputResponse;
    // Formatting to best reflect server
    if (!email.length) {
      currentResponse.email = `Email is a mandatory field`;
      setBadInputResponse(currentResponse)
      valid = false;
    } else if (ampIndex < 0 || dotIndex < 0 || ampIndex > dotIndex) {
      currentResponse.email = `Bad email: Need special characters in correct placement`;
      setBadInputResponse(currentResponse)
      valid = false;
    } else if (email.substring(0, dotIndex).length < 1 || email.substring(dotIndex).length < 2 || email.substring(ampIndex, dotIndex).length < 2) {
      currentResponse.email = `Bad email: Format should be aaa@bbb.ccc`;
      setBadInputResponse(currentResponse)
      valid = false;
    } else if (email.length > 60) {
      currentResponse.email = `Bad email: Must be under 60 characters`;
      setBadInputResponse(currentResponse)
      valid = false;
    }

    if (nickname.length > 60) {
      currentResponse.nickname = `Bad Nickname: Must be under 60 characters`;
      setBadInputResponse(currentResponse)
      valid = false;
    } else if (!nickname.length) {
      currentResponse.nickname = `Nickname is a mandatory field`;
      setBadInputResponse(currentResponse)
      valid = false;
    }

    if (body.length > 1000 && body.length ) {
      currentResponse.body = `Bad Body Length: Must be under 1000 characters`;
      setBadInputResponse(currentResponse)
      valid = false;
    } else if (!body.length) {
      currentResponse.body = `Body is a mandatory field`;
      setBadInputResponse(currentResponse)
      valid = false;
    }

    if (valid) {
      setBadInputResponse({});
    }
    return valid;
  }

  return (
    <div>
      <div className='add-question-header'>
        <h2>Add a Question</h2>
        {!canSubmit &&
        <p
        style={{color: 'red'}}>
          Current Submission Is Not Valid...
        </p>}
      </div>
      <ModalForm onSubmit={e => handleSubmit(e)}>
        Your Question* :
          <ModalTextArea
            type='text'
            value={body}
            rows='10'
            onChange={e => setBody(e.target.value)}
          />
        {badInputResponse.body &&
        <ModalErrorText>{badInputResponse.body}</ModalErrorText>
        }
      <label>Your Nickname* :
        <ModalInput
          type='text'
          maxlength='60'
          value={nickname}
          placeholder='jack543!'
          onChange={e => setNickname(e.target.value)}
        />
        {badInputResponse.nickname &&
        <ModalErrorText>{badInputResponse.nickname}</ModalErrorText>
        }
      </label>
      <label>Your Email* :
        <ModalInput
          type='text'
          maxlength='60'
          value={email}
          placeholder='Example: jack@email.com'
          onChange={e => setEmail(e.target.value)}
        />
        {badInputResponse.email &&
        <ModalErrorText>{badInputResponse.email}</ModalErrorText>
        }
      </label>
      <h4>
        Mandatory Fields Are Indicated With*
      </h4>
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