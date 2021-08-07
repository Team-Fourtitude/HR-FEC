import styled from 'styled-components';

export const Next = styled.div`
  padding: 15px;
  font-size: 16px;
  width: 30px;
  height: 20px;
  margin: auto 15px;
  border-radius: 50%;
  background-color: whitesmoke;
  transition-duration: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: rgba(2, 2, 2, 0.473);
  }
`;

export const Prev = styled.div`
  padding: 15px;
  font-size: 16px;
  width: 30px;
  height: 20px;
  margin: auto 15px;
  border-radius: 50%;
  background-color: whitesmoke;
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

