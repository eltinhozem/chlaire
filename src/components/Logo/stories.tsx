import { StoryFn, Meta } from '@storybook/react/types-6-0'
import Logo, { LogoProps } from '.'

export default {
  title: 'Logo',
  component: Logo
} as Meta

export const Default: StoryFn<LogoProps> = (args) => <Logo {...args} />
