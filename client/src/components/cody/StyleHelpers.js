import styled from 'styled-components';

export const LightMode = styled.button`
  position: fixed;
  top: 1%;
  right: 5%;
  width: 25px;
  height: 25px;
  border: 1px solid transparent;
  background-color: transparent;
  background-image: url(${props => props.darkMode ? 'assets/sun-warm.png' : 'assets/moon-black.png'});
  background-size: cover;
  background-position: center;
  z-index: 100;
`;

export const MainBackground = styled.div`
  width: 100%;
  background-image: ${props => props.darkMode ? 'linear-gradient(229deg, rgba(41,41,41,1) 0%, rgba(77,34,34,1) 59%, rgba(47,47,47,1) 100%);' : ''};
`;

export const OverviewMain = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1250px;
  overflow-x: hidden;
  margin: 0 auto;
  background-color: ${props => props.theme.bg};
`;

export const OverviewDescription = styled.div`
  background-color: ${props => props.theme.fg};
  color: ${props => props.theme.text};
  border-radius: 5px;
  padding: 1em;
  border: ${props => props.theme.border};
`;

export const StyleSelectorP = styled.p`
  padding: 0;
  margin: 1em 0;
  color: ${props => props.theme.text};
`;

export const StyleSelectorContainer = styled.div`
  width: 100%;
  margin-bottom: 1.5em;
  color: ${props => props.theme.text};
`;

export const StyleSelectorDiv= styled.div`
  margin-bottom: 1em;
  color: ${props => props.theme.text};
`;

export const StyleSelectorName = styled.h1`
  margin: 0;
  padding: 0;
  color: ${props => props.theme.text};
`;

export const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`;

export const DescriptionSplit = styled.div`
  border: ${props => props.theme.border};
  margin: 0 1em;
  height: 100px;
  align-self: center;
`;

export const DescriptionShareBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
`;

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
  background-color: ${props => props.dark ? '#444' : '#ddd'};
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
  transition: opacity 0.2s;

  &:hover {
    cursor: ${props => props.noClick ? "default" : "pointer"};
    opacity: ${props => props.noClick ? props.faded ? "0.2" : "1" : "0.3"};
  }
`;

export const ThumbnailsButton = styled.button`
  visibility: ${props => props.disabled ? 'hidden' : 'visible'};
  position: absolute;
  padding: 0;
  border: 1px solid transparent;
  background-color: transparent;
  transition: transform 0.2s;

  mix-blend-mode: difference;
  filter: invert(1);
  font-size: 2em;

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

export const ThumbnailsButtonUp = styled(ThumbnailsButton)`
  top: 1%;
  left: 30%;
  height: max-content;
  width: max-content;
`;

export const ThumbnailsButtonDown = styled(ThumbnailsButton)`
  bottom: -1%;
  left: 30%;
  height: max-content;
  width: max-content;
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

export const ImageContainerMin = styled.div`
  width: 65%;
  position: relative;
  max-height: 600px;
  overflow: hidden;
  cursor: zoom-in;
`;

export const ImageContainerMax = styled(ImageContainerMin)`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: black;
  overflow: hidden;
  cursor: ${props => props.zoom ? "url(\"assets/minusCursor.png\"), auto" : 'crosshair'};
  z-index: 100;
`;

export const MainImageWrapper = styled.div`
  width: 100%;
  height: 600px;
  object-fit: contain;
  background-color: grey;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: ${props => props.zoom ? '250%' : '100%'};
  background-position: center;
`;

export const ImageButton = styled(ThumbnailsButton)`
  top: 0;
  right: 0;
  background-color: transparent;
  height: max-content;
  width: max-content;
  padding: 0.2em;
  border-radius: 5px;
`;

export const ImageButtonLeft = styled(ThumbnailsButton)`
  top: 50%;
  left: 17%;
  height: max-content;
  width: max-content;
`;

export const ImageButtonRight = styled(ThumbnailsButton)`
  top: 50%;
  right: 0;
  height: max-content;
  width: max-content;
`;


export const CartButtonWrapper = styled.div`
  height: 50px;
  width: 15%;
  margin-bottom: 1.5rem;
  padding: 0.5em

  color: #333;
  font-size: 1em;
  font-weight: bold;

  &:hover {
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
  }
`;

export const CartButtonWrapper15 = styled(CartButtonWrapper)`
  display: ${props => props.disabled ? 'none' : 'inline-block'};
  background-color: ${props => props.theme.fg};
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.dark ? '#555' : '#ddd'};

  &:hover {
    box-shadow: inset 0 0 5px rgba(100,100,100,0.2);
  }
`;

export const CartButtonWrapper30 = styled(CartButtonWrapper)`
  width: 30%;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.fg};
  position: absolute;
  right: 0;
`;

export const CartButtonWrapper60 = styled(CartButtonWrapper)`
width: 60%;
z-index: 15;
color: ${props => props.theme.text};
background-color: ${props => props.theme.fg};
&::-webkit-scrollbar {
  display: none;
}
`;

export const CartButtonWrapper75 = styled(CartButtonWrapper)`
  display: ${props => props.disabled ? 'none' : 'block'};
  color: white;
  border: 1px solid FireBrick;
  background-color: crimson;
  opacity: 0.9;
  width: 75%;

  &:hover {
    box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
  }
`;

export const ShareIconWrapper = styled.div`
  display: block;
  width: 40px;
  height: max-content;
  transition: transform 0.2s;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

export const Star = styled.div`
  display: inline-block;
  width: max-content;
  height: max-content;
`;

export const RatingContainer = styled.div`
  position: relative;
  display: inline-block;
  height: 25px;
  margin: 1em 0 0.5em 0;
`;

export const StarContainer = styled.div`
  display: flex;
  position: absolute;
`;

export const ColoredStarContainer = styled(StarContainer)`
  overflow: hidden;
  width: ${props => (props.rating || 0) + 'px;'}
`;

export const PopUp = styled.p`
  position: absolute;
  top: -100%;
  left: 0;
  padding: 0.5em;
  margin: 0;
  display: ${props => props.prompt === 'true' ? 'block' : 'none'};
  color: crimson;
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

export const StylesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  width: 60%;
`;
