
import styled, { css } from 'styled-components';

// Base button with shine effect used across all pages
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface BaseButtonProps {
  size?: ButtonSize;
}

const sizeStyles = {
  sm: css`
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
  `,
  md: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  lg: css`
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
  `,
  icon: css`
    padding: 0.5rem;
    font-size: 0.875rem;
    width: 2.25rem;
    height: 2.25rem;
  `,
};

export const BaseButton = styled.button<BaseButtonProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${({ size = 'md' }) => sizeStyles[size]}
  font-weight: 500;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
