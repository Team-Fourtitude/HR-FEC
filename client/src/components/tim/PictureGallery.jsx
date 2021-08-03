import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';

/* eslint react/prop-types: 0 */


const PictureGallery = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [popSrc, setPopped] = useState('');

  const style = {
    height: "auto",
    width: 100,
    cursor: "pointer",
    borderRadius: "5px",
    border: "2px solid gray",
    margin: "5px",
  }

  const popImage = (src) => {
    console.log(`Opened ${popSrc}`)
    setPopped(src)
    setOpen(true)
  }

  useEffect(() => {
    if (!isOpen && popSrc !== '') {
      console.log(`Closed ${popSrc}`)
      setPopped('')
    }
  }, [isOpen])

  // useEffect(() => {
  //   console.log('Popped')
  // }, [popSrc])

  // modal is set to false currently for pictures hard crash
  return (
  <div className='AnsPhotos'>
    {props.photos.map((link, index) => {
      return (
        <img
          className='AnsPhoto'
          src={link}
          key={index}
          style={style}
          onClick={() => {popImage(event.target.src)}}
        ></img>
      )}
    )}
    <div style={{ transform: "translateX(50px)" }}>
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
