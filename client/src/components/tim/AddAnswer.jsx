import React, { useState, useEffect } from 'react';
import { ModalInput, ModalForm, ModalTextArea ,ModalErrorText } from './StyleHelpers.jsx';
import PictureGallery from './PictureGallery.jsx';
import { useAnswersUpdate } from './AnswersContext.jsx'

/* eslint react/prop-types: 0 */

const AddAnswer = ({ close }) => {
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [canSubmit, setCanSubmit] = useState(true);
  const [badInputResponse, setBadInputResponse] = useState({});
  const [badUploadTypes, setBadUploadTypes] = useState({
    size: true,
    type: true,
    amount: true,
  });

  const MAX_UPLOAD_SIZE = 2000000;

  const answerUpdaters = useAnswersUpdate();

  const validAnswer = {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid()) {
      validAnswer.body = body;
      validAnswer.name = nickname;
      validAnswer.email = email;
      validAnswer.photos = photos;
      answerUpdaters.submitAnswer(validAnswer)
      close();
    } else {
      console.log(`Not Valid`)
      setCanSubmit(false);
    }
    console.log(validAnswer)
  }

  useEffect(() => {
    setCanSubmit(true);
    setBadInputResponse({});
  }, [body, nickname, email])

  useEffect(() => {
    setPhotos(previews);
  }, [previews])

  const isValid = () => {
    let valid = true;
    const ampIndex = email.indexOf('@');
    const dotIndex = email.indexOf('.');
    const currentResponse = badInputResponse;
    // Email formatting
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
    // Name formating
    if (nickname.length > 60) {
      currentResponse.nickname = `Bad Nickname: Must be under 60 characters`;
      setBadInputResponse(currentResponse)
      valid = false;
    } else if (!nickname.length) {
      currentResponse.nickname = `Nickname is a mandatory field`;
      setBadInputResponse(currentResponse)
      valid = false;
    }
    // Body formatting
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

  const handleUpload = (event) => {
    Object.keys(badUploadTypes).map(cond => badUploadTypes[cond] = true)
    const files = event.target.files
    const uploads = []
    // URL.revokeObjectURL() On succesfull upload

    const readImage = (file) => {
      //const reader = new FileReader();
      if (!fileValidation(file.name) ) {
        let type = false;
        setBadUploadTypes({...badUploadTypes, type})
        console.log(`bad file type at: ${file.name}`)
      } else if (file.size > MAX_UPLOAD_SIZE) {
        let size = false;
        setBadUploadTypes({...badUploadTypes, size})
        console.log(`bad file size at :${file.size}`)
      } else {
        console.log(`Good file`)
        uploads.push(URL.createObjectURL(file))
      }
    }

    if (files.length + previews.length < 6) {
      [].forEach.call(files, readImage);
    } else {
      let amount = false;
      setBadUploadTypes({...badUploadTypes, amount})
      console.log(`Too many files attempted ${files.length + previews.length}`)
    }

    console.log(uploads);
    setPreviews(previews.concat(uploads));
    return badUploadTypes.amount;
  }

  const fileValidation = (name) => {
    // reject any invalid names ie cat.png.gif
    const validExt = ['.jpg', '.png', 'gif', '.jpeg'];
    let result = true;
    validExt.forEach(ext => {
      if (!name.indexOf(ext)) result = false;
    })
    return result;
  }

  return (
    <div>
      <div className='add-answer-header' >
        <h2>Add a Answer</h2>
        <h4>Mandatory Fields Are Indicated With A *</h4>
        {!canSubmit &&
        <p
        style={{color: 'red'}}>
          Current Submission Is Not Valid...
        </p>}
      </div>
      <ModalForm onSubmit={e => handleSubmit(e)}>
        <p>Your Answer* :</p>
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
      <span>
        For authentication reasons, you will not be emailed
      </span>
      <label> Images (Max: 2MB) {' '}
        <input
          type="file"
          accept="image/png, image/jpeg, image/gif"
          onChange={(event) => {handleUpload(event)}}
          multiple/>
        </label>
        {!badUploadTypes.size && <p style={{ color: 'red' }}>An Item was too large</p>}
        {!badUploadTypes.type && <p style={{ color: 'red' }}>An item not an accepted image type</p>}
        {!badUploadTypes.amount && <p style={{ color: 'red' }}>Too many pictures for this submission</p>}
      <div className="uploaded-gallery">
          <PictureGallery photos={previews}/>
      </div>
      <button
      onClick={e => handleSubmit(e)}>
        Submit
      </button>
    </ModalForm>
  </div>
  )
}

export default AddAnswer;