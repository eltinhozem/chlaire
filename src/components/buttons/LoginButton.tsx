
import styled from 'styled-components';

// Special login button with gold gradient
export const LoginButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 15px;
  font-size: 14px;
  color: brown;
  background: linear-gradient(to right, #fad2a4, #f6cda0, #ca9674);
  border: none;
  border-radius: 7px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(250, 210, 164, 0.5);
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
    box-shadow: 0 15px 40px rgba(250, 210, 164, 0.7);
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(202, 150, 116, 0.5);
  }
`;
