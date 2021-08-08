import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
 font-family: 'Roboto', sans-serif;
 width: 100%;
 background-image: ${({ theme }) => theme.bkgImg}
};
background-color: ${({ theme }) => theme.bg};
color: ${({ theme }) => theme.text};
border: ${({ theme }) => theme.border};

`;
