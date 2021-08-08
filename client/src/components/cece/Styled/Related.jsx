import styled from 'styled-components';

export const RelatedCard = styled.div`
  width: 275px;
  height: 400px;
  border-radius: 5px;
  text-align: justify;
  margin: 20px;
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${props => props.theme.fg};
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
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width:1250px;
  overflow-x:hidden;
  margin:0 auto;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
`;


//maroon
// export const theme = {
//   dark: {
//     fg: `#734046`,
//     text: `#dd715c`,
//     bg: '#321F28',
//     border: '1px solid #111',
//     bkgImg: 'linear-gradient(-60deg, rgba(41,41,41,1) 0%, rgba(147,138,138,1) 49%, rgba(47,47,47,1) 100%)',
//   },
//   light: {
//     fg: `whitesmoke`,
//     text: `black`,
//     bg: 'white',
//     border: '1px solid #ddd',
//     bkgImg: 'white',
//   }
// }

//dark blue
// export const theme = {
//   dark: {
//     fg: `#3C415C`,
//     text: `#B4A5A5`,
//     bg: '#151515',
//     border: '1px solid #111',
//     bkgImg: 'linear-gradient(-60deg, rgba(41,41,41,1) 0%, rgba(147,138,138,1) 49%, rgba(47,47,47,1) 100%)',
//   },
//   light: {
//     fg: `whitesmoke`,
//     text: `black`,
//     bg: 'white',
//     border: '1px solid #ddd',
//     bkgImg: 'white',
//   }
// }

//brown
export const theme = {
  dark: {
    fg: `#5C3D2E`,
    text: `#E0C097`,
    bg: '#2D2424',
    border: '1px solid #111',
    bkgImg: 'linear-gradient(-60deg, #221818 0%, #866f6f 49%, #412f2f 100%)',
  },
  light: {
    fg: `whitesmoke`,
    text: `black`,
    bg: 'white',
    border: '1px solid #ddd',
    bkgImg: 'white',
  }
}

//black
// export const theme = {
//     dark: {
//       fg: `grey`,
//       text: `whitesmoke`,
//       bg: 'black',
//       border: '1px solid #111',
//       bkgImg: 'linear-gradient(-60deg, rgba(41,41,41,1) 0%, rgba(147,138,138,1) 49%, rgba(47,47,47,1) 100%)',
//     },
//     light: {
//       fg: `whitesmoke`,
//       text: `black`,
  //     bg: 'white',
  //     border: '1px solid #ddd',
  //     bkgImg: 'white',
  //   }
  // }