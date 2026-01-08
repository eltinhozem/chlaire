
import { Outlet, useLocation } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import {
  LayoutContainer,
  Navbar,
  Container,
  Footer,
  Main,
  NavShell,
  BrandRow,
  Brand,
  MenuBar,
  MenuItem,
  NavActions,
  IconButton,
  UserGreeting
} from './styles'

interface LayoutProps {
  toggleTheme: () => void
  theme: string
}

export default function Layout({ toggleTheme, theme }: LayoutProps) {
  const location = useLocation()
  const [displayName, setDisplayName] = useState<string>('')

  const menuItems = [
    { label: 'Início', to: '/search' },
    { label: 'Cadastrar Nova Joia', to: '/register' },
    { label: 'Calcular Joia', to: '/calcular-joia' },
    { label: 'Pedidos', to: '/lista-pedidos', aliases: ['/cadastro-pedidos'] },
    { label: 'Clientes', to: '/cadastro-clientes' },
    { label: 'Usuários', to: '/usuarios' }
  ]

  const isActive = (item: typeof menuItems[number]) =>
    location.pathname === item.to || item.aliases?.includes(location.pathname)

  useEffect(() => {
    const loadDisplayName = async () => {
      const { data } = await supabase.auth.getUser()
      const email = data.user?.email?.trim().toLowerCase()
      if (!email) {
        setDisplayName('')
        return
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('display_name')
        .eq('email', email)
        .maybeSingle()

      const fallback = email.split('@')[0] || ''
      setDisplayName(profile?.display_name || fallback)
    }

    loadDisplayName()
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(() => {
      loadDisplayName()
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <LayoutContainer>
      {/* Navbar */}
      <Navbar>
        <NavShell>
          <BrandRow>
            <Brand to="/search">CHLAIRE</Brand>
            <NavActions>
              {displayName && <UserGreeting>Olá, {displayName}</UserGreeting>}
              <IconButton onClick={toggleTheme} aria-label="Alternar tema">
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </IconButton>
            </NavActions>
          </BrandRow>

          <MenuBar aria-label="Navegação principal">
            {menuItems.map((item) => (
              <MenuItem key={item.label} to={item.to} $active={isActive(item)}>
                {item.label}
              </MenuItem>
            ))}
          </MenuBar>
        </NavShell>
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
