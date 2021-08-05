import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import PictureGallery from './PictureGallery.jsx';
import ProductContext from '../context/ProductContext.jsx';

import {
  ModalInput,
  ModalForm,
  ModalTextArea,
  ModalErrorText,
  SecurityAdvisory,
  ModalFormWrapper,
  ModalFormSubmit,
} from './StyleHelpers.jsx';

/* eslint react/prop-types: 0 */
// Passes type and associated action through post object as {action, product, type, question_id, question_body}
// if qid is -1, then post as a question

const SubmissionPost = ({ close, submitAction, question_body }) => {
  const [previews, setPreviews] = useState([]);
  const [filesData, setFilesData] = useState(null);
  const [inputs, setInputs] = useState({});

  const [canSubmit, setCanSubmit] = useState(true);
  const [hasMaxUploads, setHasMaxUploads] = useState(false);
  const [badInputResponse, setBadInputResponse] = useState({});

  const [badUploadTypes, setBadUploadTypes] = useState({
    size: true,
    type: true,
    amount: true,
  });

  const product = useContext(ProductContext).product;
  //const question = useContext(QuestionContext);

  const MAX_UPLOAD_SIZE = 2000000;
  // notate
  const isPostAns = (question_body) ? true : false;

  useEffect(() => {
    setCanSubmit(true);
    setBadInputResponse({});
  }, [inputs])

  // useEffect(() => {
  //   setBadUploadTypes()
  // }, [filesData])

  // on state change of previews,
  // check to make sure that the number of uploaded items does not exceed 5
  useEffect(() => {
    if (previews.length >= 5) setHasMaxUploads(true);
  }, [previews])

  // User uploads images
  // uploads are validated
  // blobs are created for thumbnails
  // When user submits, the previews should be sent to cloud
  // urls are then recieved and should be sent with submit ansewr
  // Dont need photos state

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs({...inputs, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid()) {
      // Answer submission
      if (filesData && isPostAns) {
        getCloudinaryUrl(filesData)
          .then(data => {
            submitAction({...inputs, photos: data.data})
            console.log(`Success, got cloudy with a chance of urls: ${JSON.stringify(data.data)}`)
            close();
          })
          .then(() => {
            // Revoke all URLobject srcs on post completion
            terminate();
          })
          .catch(e => console.log(e));
      } else if (isPostAns) {
        submitAction({...inputs, photos: []})
        close();
      } else {
        // question submission
        submitAction(inputs);
      }
    } else {
      console.log(`Not Valid`)
      setCanSubmit(false);
    }
  }

  // input field validation
  const isValid = () => {
    let valid = true;
    const currentResponse = badInputResponse;

    // Email regex formatting
    if (!/^[^@]+@\w+(\.\w+)+\w$/.test(inputs.email)) {
      console.log(inputs.email);
      currentResponse.email = `Bad email: Format should be aaa@bbb.ccc`;
      setBadInputResponse(currentResponse)
      valid = false;
    } else if (inputs.email.length > 60) {
      currentResponse.email = `Bad email: Must be under 60 characters`;
      setBadInputResponse(currentResponse)
      valid = false;
    }

    // Name formating
    if (inputs.name.length > 60) {
      currentResponse.name = `Bad Nickname: Must be under 60 characters`;
      setBadInputResponse(currentResponse)
      valid = false;
    } else if (!inputs.name.length) {
      currentResponse.name = `Nickname is a mandatory field`;
      setBadInputResponse(currentResponse)
      valid = false;
    }

    // Body formatting
    if (inputs.body.length > 1000 && inputs.body.length ) {
      currentResponse.body = `Bad Body Length: Must be under 1000 characters`;
      setBadInputResponse(currentResponse)
      valid = false;
    } else if (!inputs.body.length) {
      currentResponse.body = `Body is a mandatory field`;
      setBadInputResponse(currentResponse)
      valid = false;
    }

    if (valid) {
      setBadInputResponse({});
    }
    return valid;
  }

  // image form handler
  const handleUpload = (event) => {
    Object.keys(badUploadTypes).map(cond => badUploadTypes[cond] = true)
    // for (let condition in badUploadTypes) {}
    const files = event.target.files;
    const uploads = [];
    const formData = new FormData();

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
        <h2>{ isPostAns ? `Submit Your Answer` : `Ask Your Question` }</h2>
        <h3>{isPostAns ? `${product.name}: ${question_body}` : `About the ${product.name}`}</h3>
      </div>
      { !canSubmit && <ModalErrorText>Current Submission Is Not Valid...</ModalErrorText> }
      <span>Mandatory Fields Are Indicated With A (*)</span>
      <ModalForm onSubmit={e => handleSubmit(e)}>
        <span>Your Post* :</span>
        <ModalTextArea
            type='text'
            name='body'
            value={inputs.body || ''}
            rows='10'
            onChange={e => handleInputs(e)}
          />
          {badInputResponse.body &&
          <ModalErrorText>{badInputResponse.body}</ModalErrorText>
          }
        <label>Your Nickname* :
        <ModalInput
          type='text'
          maxlength='60'
          name='name'
          value={inputs.name || ''}
          placeholder='jack543!'
          onChange={e => handleInputs(e)}
        />
        {badInputResponse.name &&
        <ModalErrorText>{badInputResponse.name}</ModalErrorText>
        }
      </label>
      <SecurityAdvisory>
        For privacy reasons, do not use your full name or email address
      </SecurityAdvisory>
      <label>Your Email* :
        <ModalInput
          type='text'
          name='email'
          maxlength='60'
          value={inputs.email || ''}
          placeholder='Example: jack@email.com'
          onChange={e => handleInputs(e)}
        />
        {badInputResponse.email &&
        <ModalErrorText>{badInputResponse.email}</ModalErrorText>
        }
      </label>
      <SecurityAdvisory>
        For authentication reasons, you will not be emailed
      </SecurityAdvisory>

      {/* For answers only */}
      { isPostAns && <div>
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
      </div>}

      <ModalFormSubmit
      onClick={e => handleSubmit(e)}>
        SUBMIT
      </ModalFormSubmit>
    </ModalForm>
  </ModalFormWrapper>
  )
}

export default SubmissionPost;