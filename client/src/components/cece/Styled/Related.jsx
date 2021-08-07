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

export const RelatedCarousel = styled.div`
  display: flex;
  flex-direction: row;
  max-width: auto 100%;
  padding: 20px;
  left: 40px;
  overflow-x: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
  display: hidden;
}
`;

export const RelatedCarouselContainer = styled.div`
  position:relative;
  display:flex;
  align-items:center;
  max-width:100%;
  margin: auto;
  overflow:hidden;
`;

export const RelatedProductsRoot = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  max-width: 80%;
`;



export const RelatedBody = styled.div`
  position: relative;
  /* height: 1000px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width:1250px;
  overflow-x:hidden;
  margin:0 auto;
`;