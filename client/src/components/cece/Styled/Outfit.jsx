import styled, { css } from 'styled-components';

export const OFCard = styled.div`
  min-width: 275px;
  height: 300px;
  text-align: justify;
  margin: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: ${props => props.theme.fg};
  color: ${props => props.theme.text};
`;

export const ImageView = styled.div`
  position: relative;
  top: 1%;
  width: 270px;
  height: 183px;
  overflow: hidden;
`;

export const OutFitImg = styled.img`
  position: absolute;
  max-width: 100%;
  width: auto;
  height: auto;
  top: 50%;
  left: 52%;
  transform: translate( -50%, -50%);
`;

export const OutFitInfo = styled.p`
  position: relative;
  padding-left: 2%;
  bottom: 5%;
`;

export const CatAndPrice = styled.span`
  font-size: xx-small;
  ${props => props.sale && css`
   text-decoration: line-through;
   text-decoration-color: red; `}
`;

export const StarRating = styled.div`
  position: relative;
  padding-left: 2%;
  bottom: 3%;
`;

export const OutFitTitle = styled.h4`
  position: relative;
  align-self: flex-start;
  margin: 0;
  left: 3%;
  ${props => props.relP && css`
    padding-top: 5%;` }
`;

export const OutFitCarousel = styled.div`
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

export const OutfitRoot = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  max-width: 80%;
`;

export const OutfitCarouselContainer = styled.div`
  position:relative;
  display:flex;
  align-items:center;
  max-width:100%;
  margin: auto;
  overflow:hidden;
`;

export const AddCard = styled.div`
  position: relative;
  min-width: 200px;
  height: 200px;
  text-align: justify;
  margin: 45px 20px 20px 20px;
  border: 2px solid darkgrey;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
`;

export const AddText = styled.div`
  position: relative;
  left: 19%;
  top: 30%;
`;