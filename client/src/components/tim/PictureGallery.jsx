import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
//import styled from 'styled'


const PictureGallery = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [popSrc, setPopped] = useState('');

  const style = {
    height: 'auto',
    maxWidth: 100,
    cursor: 'pointer'
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
    <div style={{ transform: 'translateX(50px)' }}>
      <Modal isOpen={isOpen} close={() => {setOpen(false)}}>
        <img
          className='AnsPhoto'
          src={popSrc}
          onClick={() => {setOpen(false)}}
          style={{cursor: 'pointer', height: 'auto', maxWidth: 400}}
          ></img>
      </Modal>
    </div>
  </div>

  )
}

export default PictureGallery;
