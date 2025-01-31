import styled, { css } from 'styled-components'
import { LogoProps } from '.'
import media from 'styled-media-query'

// Modificadores de tamanho e responsividade
const wrapperModifiers = {
  small: () => css`
    width: 6rem;
    height: 2rem;
  `,
  medium: () => css`
    width: 10rem;
    height: 3rem;
  `,
  large: () => css`
    width: 18rem;
    height: 5rem;
  `,
  hideOnMobile: () => css`
    ${media.lessThan('medium')`
      width: 5rem;
      height: 4rem;
      
      svg {
        height: 4rem;
        pointer-events: none;
      }

      .text {
        display: none;
      }
    `}
  `
}

// Aqui está a correção para evitar que `hideOnMobile` seja passado diretamente para o HTML
export const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'hideOnMobile'
})<LogoProps>`
  ${({ theme, color, size, hideOnMobile }) => css`
    color: ${theme.colors[color!]};

    ${size && wrapperModifiers[size]()}
    ${hideOnMobile && wrapperModifiers.hideOnMobile()}
  `}
`
