
import styled from 'styled-components';
import { RiCloseFill } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { ImArrowUp } from 'react-icons/im';



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

export const ActionLink = styled.u`
  cursor: ${props => props.enabled ? 'pointer' : 'default'};
`;


export const HelpfulFeedbackWrapper = styled.div`
  display: flex;
  font-size: smaller;
  color: gray;
  padding-top 5%;
`;

export const Upvote = styled(ImArrowUp)`
  fill: orange;
  opacity: 1;
  animation: fade 2s linear;
`;

// Buttons
export const PlusIcon = styled(FaPlus)`
  position: relative;
  vertical-align: middle;
  padding-right: 2%;
`;


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
  text-align: center;
  white-space: nowrap;
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
  border: 2px solid;
  border-color: rgba(228, 222, 222, 0.9);
  height:100%;
  border-radius: 5px;
  outline: none;
  padding: 3%;
`;

export const QuestionSearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
  height: 40%;
  max-height: 15vh;
`;

/////////////////////////////////////////////////////
// Answer
/////////////////////////////////////////////////////

export const AnswerWrapper = styled.div`
  background-color: lightsmoke;
  padding: 15px;
  margin: 1%;
  border-radius: 15px;
`;

// export const AnswerBodyWrapper = styled.div`
//   background-color: lightsmoke;
//   padding: 15px;
//   margin: 1%;
//   border-radius: 15px;

//   &:hover {
//     background-color: rgb(198, 214, 219, 0.5);
//     transform: scale(1.05);
//   }
// `;

// export const AnswerBodyWrapper = styled.div`
//   display: grid;
//   grid-template-columns: repeat(10, 1fr);
//   max-height: 10vh;
//   &:hover {
  // transition: all .1s ease-in-out;
//     background-color: rgb(198, 214, 219, 0.5);
//     transform: scale(1.05);
//   }
// `;

//   &:hover {
//   background-color: rgb(198, 214, 219, 0.5);
// }

export const AnswerBodyText = styled.div`
  grid-column-start: 1;
  grid-column-end: 10;
`;


export const AnswerIcon = styled.button`
  grid-column-start: 1;
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



/////////////////////////////////////////////////////
// Question
/////////////////////////////////////////////////////

// export const QuestionWrapper = styled.div`

// `;

export const DividerBar = styled.div`
  font-size: small;
`;

export const QuestionTitleWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 2fr 1fr;
  max-height: 20%;
`;

export const QuestionHeaderContainer = styled.div`
  grid-column: 1 / 5;
  grid-row: 1;
  text-align: left;
  display: grid;
`;

export const QuestionHelpfulContainer = styled.div`
  grid-row: 1;
  grid-column-start: 6;
  grid-column-end: span 2;
  display: flex;
  vertical-align: middle;
  font-size: smaller;
  font color: gray;
`;

export const QuestionPosterContainer = styled.div`
  grid-column: 1;
  grid-row: 2;
  display: grid;
`;

export const QuestionIcon = styled.div`
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

/////////////////////////////////////////////////////
// Pictures And Icons
/////////////////////////////////////////////////////

export const ThumbnailImg = styled.img`
  cursor: pointer;
  border-radius: 2%;
  width: 100%;
  `;

  export const ThumbnailContainer = styled.div`
  max-width: 100px;
  height: 100%;
  border: 3px solid gray;
  background-color: gray;
  border-radius: 1%;
  display: flex;
  object-fit: contain;
  margin: 2%;
`;

export const PictureGalleryWrapper = styled.div`
  display: flex;
  height: 50%;
`;

export const PreviewImg = styled.img`
  height: auto;
  maxWidth: 500px;
  cursor: pointer;
  $:hover {
    transform: scale(1.05);
  }
`;


// export const SpinnerLoad = styled.img`
// `;

// export const UpvoteWrapper = styled.div`
//   color: orange;
// `;


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