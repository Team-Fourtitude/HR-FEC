import React, { useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { RiCloseCircleFill } from 'react-icons/ri';
import { ModalChildContainer, ModalBackground, ModalContent, ModalHeaderRow, CloseIcon, CloseWrapper } from './StyleHelpers.jsx';
/* eslint react/prop-types: 0 */

const portal = document.getElementById('portal');
const appStyle = document.getElementById('app').style

const Modal = ({isOpen, close, children, title}) => {
  //
  const contentRef = useRef();

  useEffect(() => {
    if (!isOpen) return;

    let listener = (evt) => {
      if (contentRef.current?.contains(evt.target)) return;s
      close();
    }

    appStyle.filter = 'blur(5px)';
    window.addEventListener("click", listener);

    return () => {
      appStyle.filter = 'blur(0px)';
      window.removeEventListener("click", listener);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <ModalBackground>
        <ModalContent ref={contentRef}>
          <ModalHeaderRow>{title ? title: ''}
            <CloseWrapper>
              <CloseIcon onClick={close}/>
            </CloseWrapper>
          </ModalHeaderRow>
          <ModalChildContainer>
            {children}
          </ModalChildContainer>
        </ModalContent>
      </ModalBackground>
    </>,
    portal
  )
}

export default Modal;