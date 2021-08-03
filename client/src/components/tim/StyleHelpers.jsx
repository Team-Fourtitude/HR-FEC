import styled from 'styled-components';


// Modal Screen
export const ModalInput = styled.input`
  position: relative;
  width: 100%;
`;

export const ModalTextArea = styled.textarea`
  resize: vertical;
  position: relative;
  width: 100%;
`;

export const ModalForm = styled.form`
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 20px;
`;

export const ModalErrorText = styled.div`
  color: red;
  position: relative;
  max-width: 100%;
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
  background-color: rgb(228, 222, 222, 0.8);
  padding: 30px;
  border-radius: 30px;
  max-width: 90vw;
  max-height: 90vw;
  margin: auto;
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

// Buttons
export const LoadMoreAnswersButton = styled.button`
  background:transparent;
  border: none;
  margin: auto;
  outline:none;
  position:relative;
`;

export const QuestionAnimationButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px;
  border: .1rem solid;
  display: inline-block;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
    border: .1rem solid;
  }
`;

export const UploadThumbnailImage = styled.image`
  height: auto;
  width: 100;
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid gray;
  padding: 5px;
  opacity: .5;
  &:hover {
    width: 125%;
    opacity: 1;
  }
`;

// Divs and Wrappers

export const QuestionsList = styled.div`
  grid-column: 2;
  vertical-align: center;
  width: 100%;
  overflow: auto;
  height: 90vh
`;

export const QuestionsListHeader = styled.div`
  margin: 1%;
  margin-top: none;
`;

export const QuestionList = styled.div`
  background: rgba(167, 167, 167, 0.4);
  padding: 2.5%;
  min-height: 60vh;
  min-width: 60vw;
`;
