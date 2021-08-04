import React, { useState, useEffect, useContext } from 'react';
import { ModalInput, ModalForm, ModalTextArea ,ModalErrorText, SecurityAdvisory, ModalFormWrapper, ModalFormSubmit } from './StyleHelpers.jsx';
import QuestionContext from './QuestionContext.jsx';
import ProductContext from '../context/ProductContext.jsx';
import PictureGallery from './PictureGallery.jsx';
import { useAnswersUpdate } from './AnswersContext.jsx'
import axios from 'axios';

/* eslint react/prop-types: 0 */

const AddAnswer = ({ close }) => {
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [nickname, setNickname] = useState('');
  const [previews, setPreviews] = useState([]);
  const [filesData, setFilesData] = useState(null);
  const [canSubmit, setCanSubmit] = useState(true);
  const [hasMaxUploads, setHasMaxUploads] = useState(false);
  const [badInputResponse, setBadInputResponse] = useState({});

  const [badUploadTypes, setBadUploadTypes] = useState({
    size: true,
    type: true,
    amount: true,
  });

  const product = useContext(ProductContext).product;
  const question = useContext(QuestionContext);

  const MAX_UPLOAD_SIZE = 2000000;

  const answerUpdaters = useAnswersUpdate();

  useEffect(() => {
    setCanSubmit(true);
    setBadInputResponse({});
  }, [body, nickname, email])

  // on state change of previews,
  // check to make sure that the number of uploaded items does not exceed 5
  useEffect(() => {
    setPhotos(previews);
    if (previews.length >= 5) setHasMaxUploads(true);
  }, [previews])

  // User uploads images
  // uploads are validated
  // blobs are created for thumbnails
  // When user submits, the previews should be sent to cloud
  // urls are then recieved and should be sent with submit ansewr
  // Dont need photos state

  const handleSubmit = (e) => {
    e.preventDefault();
    const validAnswer = {};

    if (isValid()) {
      getCloudinaryUrl(filesData)
        .then(data => {
          console.log(`Success, got cloudy with a chance of urls: ${JSON.stringify(data.data)}`)
          validAnswer.body = body;
          validAnswer.name = nickname;
          validAnswer.email = email;
          validAnswer.photos = data.data;
          answerUpdaters.submitAnswer(validAnswer)
        })
        .then(() => {
          terminate();
        })
        .catch(e => console.log(e));


    } else {
      console.log(`Not Valid`)
      setCanSubmit(false);
    }
  }

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

  // image form handler event
  const handleUpload = (event) => {
    Object.keys(badUploadTypes).map(cond => badUploadTypes[cond] = true)
    const files = event.target.files
    const uploads = []
    const formData = new FormData();
    // URL.revokeObjectURL() On succesful upload

    const readImage = (file) => {
      //const reader = new FileReader();
      if (file.size > MAX_UPLOAD_SIZE) {
        let size = false;
        setBadUploadTypes({...badUploadTypes, size})
        console.log(`bad file size at :${file.size}`)
      } else {
        uploads.push(URL.createObjectURL(file))
        console.log(`Good file ${file}`)
        formData.append('validPics', file, `preview_${uploads.length}_${file.name}`)
        //console.log(`This is the form data: ${JSON.stringify(formData)}`)
      }
    }
    // available images
    if (files.length + previews.length < 6) {
      [].forEach.call(files, readImage);
      // setfiledata here, then use a hook on completeion to submit final
      setFilesData(formData)
    } else {
      let amount = false;
      setBadUploadTypes({...badUploadTypes, amount})
      console.log(`Too many files attempted ${files.length + previews.length}`)
    }

    console.log(uploads);
    setPreviews(previews.concat(uploads));
    return badUploadTypes.amount;
  }

  const getCloudinaryUrl = (imageData) => {
    return axios.post(`/upload`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // function passed down to release blob
  const removeThumbnail = (src) => {
    //previews.filter(src => src !== e.src)
    const toRemoveIndex = previews.indexOf(src);
    setPreviews([...previews.slice(0, toRemoveIndex), ...previews.slice(toRemoveIndex + 1, previews.length)]);
    URL.revokeObjectURL(src);
    console.log(`Removed At ${toRemoveIndex}: ${src}`);
  }

  const terminate = () => {
    previews.map(src => URL.revokeObjectURL(src));
    close();
  }


  return (
    <ModalFormWrapper >
      <div className='add-answer-header' >
        <h2>Submit Your Answer</h2>
        <h3>{`${product.name}: ${question.question_body}`}</h3>
      </div>
      { !canSubmit && <ModalErrorText>Current Submission Is Not Valid...</ModalErrorText> }
      <span>Mandatory Fields Are Indicated With A (*)</span>
      <ModalForm onSubmit={e => handleSubmit(e)}>
        <span>Your Answer* :</span>
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
      <SecurityAdvisory>
        For privacy reasons, do not use your full name or email address
      </SecurityAdvisory>
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
      <SecurityAdvisory>
        For authentication reasons, you will not be emailed
      </SecurityAdvisory>
      { !hasMaxUploads ? <label> Images (Max: 2MB) {' '}
        <input
          type="file"
          accept="image/png, image/jpeg, image/gif"
          onChange={(event) => {handleUpload(event)}}
          multiple/>
        </label> : <p style={{ color: 'red' }}>Max Images Uploaded</p>}

        {!badUploadTypes.size && <p style={{ color: 'red' }}>An Item was too large</p>}
        {!badUploadTypes.type && <p style={{ color: 'red' }}>An item not an accepted image type</p>}
        {!badUploadTypes.amount && <p style={{ color: 'red' }}>Too many pictures for this submission</p>}

      <PictureGallery photos={previews} remove={removeThumbnail} />
      <ModalFormSubmit
      onClick={e => handleSubmit(e)}>
        SUBMIT
      </ModalFormSubmit>
    </ModalForm>
  </ModalFormWrapper>
  )
}

export default AddAnswer;