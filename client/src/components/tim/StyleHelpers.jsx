
import styled from 'styled-components';
import { RiCloseFill } from 'react-icons/ri';



/////////////////////////////////////////////////////
// Modal Form
/////////////////////////////////////////////////////
export const ModalInput = styled.input`
  position: relative;
  max-width: 95%;
  border: .15rem solid;
  width: 100%;
`;

export const ModalTextArea = styled.textarea`
  resize: vertical;
  position: relative;
  max-width: 95%;
  border: .15rem solid;
`;

export const ModalForm = styled.form`
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 20px;
`;
//  grid-template-columns: 3fr;

export const ModalErrorText = styled.div`
  color: red;
  position: relative;
  max-width: 100%;
`;

export const ModalFormWrapper = styled.div`
  display: grid;
  overflow-y: scroll;
  max-hieght: 100%;
  &::-webkit-scrollbar {
    background-color: transparent;
  }
`;

export const ModalFormSubmit = styled.button`
background-color: black;
color: white;
padding: 10px;
max-width: 95%;
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

/////////////////////////////////////////////////////
// Modal Screen
/////////////////////////////////////////////////////
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
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: rgb(228, 222, 222, 0.8);
  padding: 30px;
  border-radius: 30px;
  max-width: 90vw;
  max-height: 90vh;
  box-shadow: 0 3px 15px -3px rgba(0, 0, 0, 0.2);
  position: relative;
  display: grid;

`;
//grid-template-rows: repeat(2, minmax(0,5%));
export const ModalHeaderRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`;

export const ModalChildWrapper = styled.div`
  padding: 15px;
  max-height: 50vh;
  display: flex;
`;
/////////////////////////////////////////////////////
// Modal Close Button
/////////////////////////////////////////////////////

export const CloseWrapper = styled.div`
  grid-column: 11;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1%;
  &:hover {
    color: red;
  }
`;

export const InvisButton = styled.button`
  background:transparent;
  border:none;
  outline:none;
  display:block;
  width:30px;
  height:30px;
  cursor:pointer;
  position:absolute;
`;

export const CloseIcon = styled(RiCloseFill)`
  position: absolute;
  width: 30px;
  height: 30px;
  cursor:pointer;
`;

/////////////////////////////////////////////////////
// Helpful FeedBack
/////////////////////////////////////////////////////
export const HelpfulYes = styled.u`
  cursor: $(props => props.helped ? pointer : auto);
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

/////////////////////////////////////////////////////
// Module Headers
/////////////////////////////////////////////////////

export const QuestionsListHeader = styled.div`
  margin: 1%;
  margin-left: 0;
`;

export const QuestionsSearchBar = styled.input`
  width: 90%;
  border: 2px solid black;
`;

export const QuestionSearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  height: 60%;
  max-height: 10vh;
`;


/////////////////////////////////////////////////////
// Wrappers and Divs
/////////////////////////////////////////////////////
export const ModuleWrapper = styled.div`
  padding-top: 2vh;
  padding-bottom: 1vh;
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 1800px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;

`;

export const QuestionsAnswersWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 5;
  display: grid;
  width: 100%;
  background-color: whitesmoke;
  padding: 5%;
`;


export const QuestionsListWrapper = styled.div`
  vertical-align: center;
  width: 100%;
  overflow: auto;
  height: 90vh
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: auto;
`;

export const QuestionList = styled.div`
  background: rgba(167, 167, 167, 0.4);
  padding: 2.5%;
  min-height: 60vh;
  min-width: 60vw;
`;

export const SecurityAdvisory = styled.span`
  font-size: smaller;
`;