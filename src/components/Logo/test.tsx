import { screen } from '@testing-library/react'
import 'jest-styled-components'
import Logo from '.'
import { renderWithTheme } from '@/utils/tests/helpers'

describe('<Logo />', () => {
  it('should render a white label by default', () => {
    renderWithTheme(<Logo color="white" />)
    const path = screen
      .getByLabelText(/Chlaire/i)
      .closest('svg')
      ?.querySelector('path')

    expect(path).toHaveAttribute('fill', 'white')
  })

  it('should render a black label when color is passed', () => {
    renderWithTheme(<Logo color="black" />)
    const path = screen
      .getByLabelText(/Chlaire/i)
      .closest('svg')
      ?.querySelector('path')

    expect(path).toHaveAttribute('fill', 'black')
  })

  it('should render a small logo', () => {
    const { container } = renderWithTheme(<Logo size="small" />)
    const wrapper = container.firstChild as HTMLElement // S.Wrapper

    expect(wrapper).toHaveStyle({
      width: '6rem',
      height: '2rem'
    })
  })

  it('should render a medium logo by default', () => {
    const { container } = renderWithTheme(<Logo />)
    const wrapper = container.firstChild as HTMLElement // S.Wrapper

    expect(wrapper).toHaveStyle({
      width: '10rem',
      height: '3rem'
    })
  })

  it('should render a large logo', () => {
    const { container } = renderWithTheme(<Logo size="large" />)
    const wrapper = container.firstChild as HTMLElement // S.Wrapper

    expect(wrapper).toHaveStyle({
      width: '18rem',
      height: '5rem'
    })
  })

  it('should render a hidden text logo on mobile when hideOnMobile is passed', () => {
    const { getByTestId } = renderWithTheme(<Logo hideOnMobile />)

    const text = getByTestId('logo-text')

    expect(text).toHaveStyleRule('display', 'none', {
      media: '(max-width: 768px)'
    })
  })
})
