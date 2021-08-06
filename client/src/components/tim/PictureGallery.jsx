import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';

import { ThumbnailImg, ThumbnailContainer, PictureGalleryWrapper } from './StyleHelpers.jsx'

/* eslint react/prop-types: 0 */


const PictureGallery = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [popSrc, setPopped] = useState('');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (!isOpen && popSrc !== '') {
      console.log(`Closed ${popSrc}`)
      setPopped('')
    }
  }, [isOpen])

  useEffect(() => {
    setPhotos([...props.photos])
  }, [props.photos])

  const popImage = (target) => {
    console.log(`Opened ${popSrc}`)
    setPopped(target.src)
    setOpen(true)
  }

  const removeImage = (target) => {
    props.remove(target.src)
    console.log(`Bubbled ${target.src}`)
  }
  // popImage(event.target)

  return (
  <div className='AnsPhotos'>
    <PictureGalleryWrapper>
      {photos.map((link, index) => {
        return (
          <ThumbnailContainer key={index}>
            <ThumbnailImg
              className="AnsPhoto"
              src={link}
              key={index}
              onClick={(event) => {
                props.remove ? removeImage(event.target) : popImage(event.target)
              }}
            ></ThumbnailImg>
          </ThumbnailContainer >
        )}
      )}
    </PictureGalleryWrapper>
    <div>
      <Modal isOpen={isOpen} close={() => {setOpen(false)}}>
        <img
          className="AnsPhoto"
          src={popSrc}
          onClick={() => {setOpen(false)}}
          style={{
            cursor: "pointer",
            maxHeight: "auto",
            maxWidth: 400
          }}
          ></img>
      </Modal>
    </div>
  </div>

  )
}

export default PictureGallery;

// style={{ transform: "translateX(50px)" }}