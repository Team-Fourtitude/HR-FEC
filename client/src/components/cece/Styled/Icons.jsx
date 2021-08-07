import styled from 'styled-components';

export const Next = styled.div`
  padding: 15px;
  font-size: 16px;
  text-align: center;
  margin: auto 15px;
  border-radius: 50%;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  transition-duration: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: rgba(2, 2, 2, 0.473);
  }
  visibility: ${({ children }) => children.props.id === 'disabled' ? `hidden` : null};
`;

export const Prev = styled.div`
  padding: 15px;
  font-size: 16px;
  width: 30px;
  height: 20px;
  margin: auto 15px;
  border-radius: 50%;
  background-color: ${props => props.theme.bg};
  color: ${props => props.theme.text};
  transition-duration: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: rgba(2, 2, 2, 0.473);
  }
  visibility: ${({ children }) => children.props.id === 'disabled' ? `hidden` : null};
`;

export const StarsContainer = styled.div`
  position: relative;
  display: inline-block;
  /* height: 25px; */
  margin: 1em 0 0.5em 0;
`;

export const StarOverlay = styled.div`
  display: flex;
  overflow: hidden;
  position: absolute;
  color: goldenrod;
`;

export const Compare = styled.div`
  position: relative;
  top: 2%;
  left: 89%;
  color: rgb(167, 167, 167);
  transition-duration: 0.2s;
  &:hover {
    color: goldenrod;
    cursor: pointer;
  }
`;

export const Delete = styled.div`
  position: relative;
  left: 89%;
  top: 3%;
  color: darkgray;
  &:hover {
    color: black;
    cursor: pointer;
  }
`;

export const Add = styled.div`
  position: relative;
  padding: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 30%;
  left: 37%;
  &:hover {
    color: grey;
    cursor: pointer;
  }
`;

