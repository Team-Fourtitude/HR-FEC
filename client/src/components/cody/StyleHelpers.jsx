import styled from 'styled-components';

export const StyleSelectorTextWrapper = styled.p`
  margin: 1em 0;
  padding: 0;
`;

export const StylesImageWrapper = styled.div.attrs((props) => ({
    key: props.key,
}))`
  width: 75px;
  height: 75px;
  border-radius: 50px;
  overflow: hidden;
`;

export const ThumbnailsImageWrapper = styled.div.attrs((props) => ({
    'key': props.key,
}))`
  width: 100%;
  height: 55px;
  margin-bottom: 1em;
  background-color: #222;
  overflow: hidden;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: ${(props) => props.faded ? '0.2' : '1'};
`;

export const ThumbnailsButton = styled.button`
  visibility: ${props => props.disabled ? 'hidden' : 'visible'};
  position: absolute;
  padding: 0;
  border: 1px solid transparent;
  background-color: transparent;
  transition: color 0.2s transform 0.2s;

  color: #444;
  font-size: 2em;

  &:hover {
    color: #888;
    transform: scale(1.2);
  }
`;

export const ThumbnailsButtonUp = styled(ThumbnailsButton)`
  top: 1%;
  left: 30%;
`;

export const ThumbnailsButtonDown = styled(ThumbnailsButton)`
  bottom: 1%;
  left: 30%;
`;

export const ThumbnailsContainer = styled.div`
  width: 75px;
  max-height: 400px;
  height: 80%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ImageButton = styled(ThumbnailsButton)`
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.2em;
  border-radius: 5px;
`;

export const ImageButtonLeft = styled(ThumbnailsButton)`
  top: 50%;
  left: 17%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.2em;
  border-radius: 5px;
`;

export const ImageButtonRight = styled(ThumbnailsButton)`
  top: 50%;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.2em;
  border-radius: 5px;
`;


export const CartButtonWrapper = styled.div`
  height: 50px;
  width: 15%;
  margin-bottom: 1.5rem;
  padding: 0.5em

  color: #333;
  font-size: 1em;
  font-weight: bold;
`;

export const CartButtonWrapper30 = styled(CartButtonWrapper)`
  width: 30%;
  position: absolute;
  right: 0;
`;

export const CartButtonWrapper60 = styled(CartButtonWrapper)`
width: 60%;
&::-webkit-scrollbar {
  display: none;
}
`;

export const CartButtonWrapper75 = styled(CartButtonWrapper)`
  display: ${props => props.disabled ? 'none' : 'block'};
  width: 75%;
`;

export const PopUp = styled.p`
  position: absolute;
  top: -100%;
  left: 0;
  padding: 0.5em;
  margin: 0;
  display: ${props => props.prompt === 'true' ? 'block' : 'none'};
  color: purple;
  background-color: #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);

  &::before {
    content:'';
    display: block;
    position: absolute;
    bottom: -30%;
    left: 35%;
    width: 0;
    height: 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid #ccc;
  }
`;