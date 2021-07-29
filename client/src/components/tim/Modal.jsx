import React, { useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { FaWindowClose } from 'react-icons/fa';
import { InvisButton, ModalBackground, ModalContent, ModalHeaderRow } from './StyleHelpers.jsx';
/* eslint react/prop-types: 0 */

const portal = document.getElementById('portal');
const appStyle = document.getElementById('app').style

const Modal = ({isOpen, close, children}) => {
  //
  const contentRef = useRef();

  useEffect(() => {
    if (!isOpen) return;

    let listener = (evt) => {
      if (contentRef.current?.contains(evt.target)) return;
      close();
    }

    appStyle.filter = 'blur(5px)'
    window.addEventListener("click", listener);

    return () => {
      appStyle.filter = 'blur(0px)'
      window.removeEventListener("click", listener);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <ModalBackground>
        <ModalContent ref={contentRef}>
          <ModalHeaderRow>
            <div>
              <FaWindowClose style={{ position: 'absolute', color: 'red'}}/>
              <InvisButton onClick={close}/>
            </div>
          </ModalHeaderRow>
          {children}
        </ModalContent>
      </ModalBackground>
    </>,
    portal
  )
}

export default Modal;