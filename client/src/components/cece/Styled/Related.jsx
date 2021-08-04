import styled from 'styled-components';

export const RelatedCard = styled.div`
  width: 275px;
  height: 400px;
  background-color: whitesmoke;
  text-align: justify;
  margin: 20px;
  /* border: 2px solid lightgrey; */
  box-sizing: border-box;
`;

export const RelatedImg = styled.img`
  position: absolute;
  max-width: 100%;
  width: auto;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate( -50%, -50%);
`;

export const RelatedContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
  padding: 20px;
  position: relative;
  left: 10%;
  right:10%;
  overflow-x: scroll;
  scroll-behavior: smooth;
`;

export const RelatedBody = styled.div`
  position: relative;
  height: 1000px;
`;