import styled from 'styled-components';


// Modal Screen
export const ModalInput = styled.input`
  resize: vertical;
  position: relative;
`;

export const ModalTextArea = styled.textarea`
  resize: vertical;
  position: relative;
  width: ${props => props.width ? props.width : 'auto'}
`;

export const ModalForm = styled.form`
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 20px;
`;

// Modal Helpers
export const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 30px;
  max-width: 90%;
  max-height: 90%;
  box-shadow: 0 3px 15px -3px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const ModalHeaderRow = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
`;

export const InvisButton = styled.button`
  background:transparent;
  border:none;
  outline:none;
  display:block;
  height:16px;
  width:16px;
  cursor:pointer;
  position:relative
`;

export const LoadMoreAnswersButton = styled.button`
  background:transparent;
  border:none;
  outline:none;
  position:relative;

`;