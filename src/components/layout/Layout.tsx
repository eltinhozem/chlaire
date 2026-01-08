
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, LogOut } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
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
  UserGreeting,
  LogoutButton,
  LogoutLabel
} from './styles'

interface LayoutProps {
  toggleTheme: () => void
  theme: string
}

export default function Layout({ toggleTheme, theme }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState(false)

  const menuItems = useMemo(() => {
    const items = [
      { label: 'Lista Clientes', to: '/cadastro-clientes' },
      { label: 'Pedidos', to: '/lista-pedidos', aliases: ['/cadastro-pedidos'] },
      { label: 'Cadastrar Joias', to: '/register' },
      { label: 'Calcular Joias', to: '/calcular-joia' },
      { label: 'Lista Joias', to: '/search' }
    ]

    if (isAdmin) {
      items.push({ label: 'Usuários', to: '/usuarios' })
    }

    return items
  }, [isAdmin])

  const isActive = (item: typeof menuItems[number]) =>
    location.pathname === item.to || item.aliases?.includes(location.pathname)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Erro ao sair:', error)
      return
    }
    navigate('/')
  }

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
      const resolvedName = profile?.display_name || fallback
      setDisplayName(resolvedName)
      setIsAdmin(resolvedName === 'Elton')
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
              <LogoutButton type="button" onClick={handleLogout}>
                <LogOut size={16} />
                <LogoutLabel>Sair</LogoutLabel>
              </LogoutButton>
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
