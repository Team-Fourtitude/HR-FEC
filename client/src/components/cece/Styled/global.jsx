import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;

`;