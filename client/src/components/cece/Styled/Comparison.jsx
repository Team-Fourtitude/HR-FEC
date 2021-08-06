import styled from 'styled-components';


export const Caption = styled.caption`
position: relative;
padding-bottom: 5%;
font-size: 30px;
font-weight: bold;
`;

export const TblContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.884);
  position: relative;
  align-content: center;
  width: 75%;
  left: 10%;
  padding: 15px;
  border: 1px solid white;
  border-radius: 5px;
  opacity: 5;
  pointer-events: auto;
  transition: 0.4s;
  overflow-y: scroll;
`;

export const Table = styled.table`
  position:static;
  overflow-y: scroll;
  max-width: 100%;
  font-size: small;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: 15px;
`;



