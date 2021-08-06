import styled from 'styled-components';

export const RelatedCard = styled.div`
  width: 275px;
  height: 400px;
  border-radius: 5px;
  background-color: whitesmoke;
  text-align: justify;
  margin: 20px;
  /* border: 2px solid lightgrey; */
  box-sizing: border-box;
  cursor: pointer;
`;

export const RelatedImg = styled.img`
  position: absolute;
  max-width: 100%;
  width: auto;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate( -50%, -50%);
  cursor: pointer;
`;

export const RelatedContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 700px;
  padding: 20px;
  position: relative;
  left: 40px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
  display: hidden;
}
`;

export const RelatedBody = styled.div`
  position: relative;
  height: 1000px;
  /* display:flex;
  flex-direction:column; */
  /* max-width:1250px; */
  /* overflow-x:hidden; */
  /* margin:0 auto; */
`;