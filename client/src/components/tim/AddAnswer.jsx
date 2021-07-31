import React, { useState, useEffect } from 'react';
import { ModalInput, ModalForm, ModalTextArea } from './StyleHelpers.jsx';
import PictureGallery from './PictureGallery.jsx';
import { useAnswersUpdate } from './AnswersContext.jsx'

const AddAnswer = () => {
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [canSubmit, setCanSubmit] = useState(true);
  const [badUploadTypes, setBadUploadTypes] = useState({
    size: true,
    type: true,
    amount: true,
  });

  const MAX_UPLOAD_SIZE = 1000000;

  const answerUpdaters = useAnswersUpdate();

  const validAnswer = {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidBody() && isValidName() && isValidEmail()) {
      validAnswer.body = body;
      validAnswer.name = nickname;
      validAnswer.email = email;
      validAnswer.photos = photos;
      answerUpdaters.submitAnswer(validAnswer)
    } else {
      console.log(`Not Valid`)
      setCanSubmit(false);
    }
    console.log(validAnswer)
  }

  useEffect(() => {
    setPhotos(previews);
  }, [previews])

  // I: file
  // O: Thumbnail
  // C: Up to Five valid files, save src to pass along to serv
  // E: Validation: aka bad filename, too large

  const handleUpload = (event) => {
    Object.keys(badUploadTypes).map(cond => badUploadTypes[cond] = true)
    const files = event.target.files
    const uploads = []

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

  const isValidBody = () => {
    console.log('Good body')
    return (body.length <= 1000);
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