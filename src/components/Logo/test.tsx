import { screen } from '@testing-library/react'
import Logo from '.'
import { renderWithTheme } from '@/utils/tests/helpers'

describe('<Logo />', () => {
    it('should render a white label by default', () => {
        renderWithTheme(<Logo />)

        // Verifica se o texto "Chlaire" está presente no documento
        const logoText = screen.getByText(/chlaire/i)
        expect(logoText).toBeInTheDocument()

        // Verifica se a cor aplicada ao texto está correta
        expect(logoText).toHaveAttribute('fill', 'url(#dDourado)')
    })

    it('should render a black label when color is passed', () => {
        renderWithTheme(<Logo color="black" />)

        const logoText = screen.getByText(/chlaire/i)
        expect(logoText).toBeInTheDocument()
        expect(logoText).toHaveAttribute('fill', 'black')
    })

    it('should render a white label when color is passed', () => {
        renderWithTheme(<Logo color="white" />)

        const logoText = screen.getByText(/chlaire/i)
        expect(logoText).toBeInTheDocument()
        expect(logoText).toHaveAttribute('fill', 'white')
    })
})
