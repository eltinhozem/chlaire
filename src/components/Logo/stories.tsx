import { Meta, StoryObj } from '@storybook/react'
import Logo, { LogoProps } from '.'

export default {
  title: 'Logo',
  component: Logo,
  args: {
    color: 'url(#dDourado)',
    size: 'medium'
  },
  argTypes: {
    color: {
      control: 'select', // Controle para escolher entre opções
      options: ['url(#dDourado)', 'black', 'white'] // Opções disponíveis
    },
    size: {
      control: 'select', // Controle para tamanhos
      options: ['small', 'medium', 'large'] // Tamanhos disponíveis
    }
  }
} as Meta<LogoProps>

export const Default: StoryObj<LogoProps> = {}
