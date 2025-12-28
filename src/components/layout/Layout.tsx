import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import {
  LayoutContainer,
  Navbar,
  Footer,
  HeaderInner,
  BrandLink,
  DesktopBrand,
  MobileBar,
  MenuToggleButton,
  NavMenu,
  NavMenuLink,
  ThemeToggleButton,
  Container,
  Main
} from './styles'

interface LayoutProps {
  toggleTheme: () => void
  theme: string
}

const navItems = [
  { to: '/register', label: 'Cadastrar Nova Joia' },
  { to: '/calcular-joia', label: 'Calcular Joia' },
  { to: '/cadastro-pedidos', label: 'Novo Pedido' },
  { to: '/lista-pedidos', label: 'Lista Pedidos' },
  { to: '/cadastro-clientes', label: 'Clientes' }
]

export default function Layout({ toggleTheme, theme }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <LayoutContainer>
      <Navbar>
        <HeaderInner>
          <ThemeToggleButton onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </ThemeToggleButton>

          <MobileBar>
            <MenuToggleButton
              type="button"
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </MenuToggleButton>
            <BrandLink to="/search">CHLAIRE</BrandLink>
          </MobileBar>

          <DesktopBrand to="/search">CHLAIRE</DesktopBrand>

          <NavMenu $open={menuOpen}>
            {navItems.map((item) => (
              <NavMenuLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavMenuLink>
            ))}
          </NavMenu>
        </HeaderInner>
      </Navbar>

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>

      <Footer>
        <Container>
          <p>
            &copy; {new Date().getFullYear()} Joalheria. Todos os direitos
            reservados.
          </p>
        </Container>
      </Footer>
    </LayoutContainer>
  )
}
