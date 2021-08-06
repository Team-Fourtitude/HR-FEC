import React, { useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import { ModalChildWrapper, ModalBackground, ModalContent, ModalHeaderRow, CloseIcon, CloseWrapper } from './StyleHelpers.jsx';

const portal = document.getElementById('portal');
const appStyle = document.getElementById('app').style

const Modal = ({isOpen, close, children, title}) => {
  //
  const contentRef = useRef();

  useEffect(() => {
    if (!isOpen) return;

    let listener = (evt) => {
      if (contentRef.current) {
        if (contentRef.current.contains(evt.target)) return;
      }
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
          <ModalChildWrapper>
            {children}
          </ModalChildWrapper>
        </ModalContent>
      </ModalBackground>
    </>,
    portal
  )
}

export default Modal;