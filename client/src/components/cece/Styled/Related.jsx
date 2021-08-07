import styled from 'styled-components';



export const RelatedCard = styled.div`
  width: 275px;
  height: 400px;
  border-radius: 5px;
  /* background-color: whitesmoke; */
  text-align: justify;
  margin: 20px;
  /* border: 2px solid lightgrey; */
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
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
  background-color: ${props => props.theme.main};
  color: ${props => props.theme.text};
`;


//maroon
// export const theme = {
//   dark: {
//     bg: `#734046`,
//     text: `#dd715c`,
//     main: '#321F28',
//   },
//   light: {
//     bg: `whitesmoke`,
//     text: `black`,
//     main: 'white',
//   }
// }

//dark blue
// export const theme = {
//   dark: {
//     bg: `#3C415C`,
//     text: `#B4A5A5`,
//     main: '#151515',
//   },
//   light: {
//     bg: `whitesmoke`,
//     text: `black`,
//     main: 'white',
//   }
// }

//brown
// export const theme = {
//   dark: {
//     bg: `#5C3D2E`,
//     text: `#E0C097`,
//     main: '#2D2424',
//   },
//   light: {
//     bg: `whitesmoke`,
//     text: `black`,
//     main: 'white',
//   }
// }

//black
export const theme = {
    dark: {
      bg: `grey`,
      text: `whitesmoke`,
      main: 'black',
    },
    light: {
      bg: `whitesmoke`,
      text: `black`,
      main: 'white',
    }
  }