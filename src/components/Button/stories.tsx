import { Meta, StoryObj } from '@storybook/react'
import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart'
import Button from '.'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
      description: 'Texto a ser exibido no botão',
      type: { name: 'string', required: false }
    },
    icon: {
      control: false, // Use "false" para desabilitar o controle
      description: 'Ícone opcional ao lado do texto'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Define o tamanho do botão'
    }
  }
} as Meta<typeof Button>

export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'Buy now'
  }
}

export const withIcon: StoryObj<typeof Button> = {
  args: {
    size: 'small',
    children: 'Buy now',
    icon: <AddShoppingCart />
  }
}
