
import styled from 'styled-components';

// Special login button with gold gradient
export const LoginButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 15px;
  font-size: 14px;
  color: #ffffff;
  background: #c29b62;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(194, 155, 98, 0.35);
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    transform: skewX(-45deg);
    transition: left 0.5s ease;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);
    background: #b39549;
    box-shadow: 0 15px 40px rgba(194, 155, 98, 0.45);
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(194, 155, 98, 0.45);
  }
`;
