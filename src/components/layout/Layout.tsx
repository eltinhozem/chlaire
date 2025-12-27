
import  { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { PlusCircle, Sun, Moon, List, Gauge } from 'lucide-react'
import Logo3 from '../logo/logo3.svg'
import {
  LayoutContainer,
  Navbar,
  Container,
  NavContent,
  Footer,
  Main,
  CadastrosJoia,
  NavButtonLabel
} from './styles'
import Logo from '../logo/Logo'

interface LayoutProps {
  toggleTheme: () => void
  theme: string
}

export default function Layout({ toggleTheme, theme }: LayoutProps) {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <LayoutContainer>
      {/* Navbar */}
      <Navbar>
        <Container>
          <NavContent>
            <Link to="/search">
              {isMobile ? (
                <img src={Logo3} alt="Logo" className="max-h-12" />
              ) : (
                <Logo
                  size="medium"
                  color="url(#dDourado)"
                  className="max-h-16"
                />
              )}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {location.pathname !== '/register' && (
                <Link to="/register">
                  <CadastrosJoia type="button" aria-label="Cadastrar nova joia">
                    <PlusCircle className="h-5 w-5" />
                    <NavButtonLabel>Cadastrar Nova Joia</NavButtonLabel>
                  </CadastrosJoia>
                </Link>
              )}
              {location.pathname !== '/calcular-joia' && (
                <Link to="/calcular-joia">
                  <CadastrosJoia type="button" aria-label="Calcular joia">
                    <Gauge className="h-5 w-5" />
                    <NavButtonLabel>Calcular Joia</NavButtonLabel>
                  </CadastrosJoia>
                </Link>
              )}
              {location.pathname !== '/cadastro-pedidos' && (
                <Link to="/cadastro-pedidos">
                  <CadastrosJoia type="button" aria-label="Novo pedido">
                    <PlusCircle className="h-5 w-5" />
                    <NavButtonLabel>Novo Pedido</NavButtonLabel>
                  </CadastrosJoia>
                </Link>
              )}
              {location.pathname !== '/lista-pedidos' && (
                <Link to="/lista-pedidos">
                  <CadastrosJoia type="button" aria-label="Lista de pedidos">
                    <List className="h-5 w-5" />
                    <NavButtonLabel>Lista Pedidos</NavButtonLabel>
                  </CadastrosJoia>
                </Link>
              )}
              {/* Botão de alternância do tema (ícone fixo no canto superior direito) */}
              <button
                onClick={toggleTheme}
                style={{
                  padding: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Alternar Tema"
              >
                {theme === 'light' ? (
                  <Moon className="h-6 w-6" />
                ) : (
                  <Sun className="h-6 w-6" />
                )}
              </button>
            </div>
          </NavContent>
        </Container>
      </Navbar>

      {/* Conteúdo Principal */}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>

      {/* Footer */}
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
