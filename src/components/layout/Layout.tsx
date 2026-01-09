import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Sun,
  Moon,
  LogOut,
  Gem,
  Users,
  ShoppingBag,
  Calculator,
  ClipboardList,
  UserCog
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'
import {
  LayoutContainer,
  Sidebar,
  SidebarLogo,
  SidebarLogoIcon,
  SidebarBrand,
  SidebarNavSection,
  SidebarNav,
  SidebarItem,
  SidebarItemLabel,
  SidebarFooter,
  SidebarFooterRow,
  MainContent,
  UserGreeting,
  LogoutButton,
  LogoutLabel,
  IconButton
} from './styles'

interface LayoutProps {
  toggleTheme: () => void
  theme: string
}

type MenuItem = {
  label: string
  to: string
  aliases?: string[]
  icon: typeof Users
}

export default function Layout({ toggleTheme, theme }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = useMemo<MenuItem[]>(() => {
    const items: MenuItem[] = [
      { label: 'Lista Clientes', to: '/cadastro-clientes', icon: Users },
      {
        label: 'Pedidos',
        to: '/lista-pedidos',
        aliases: ['/cadastro-pedidos'],
        icon: ShoppingBag
      },
      { label: 'Cadastrar Joias', to: '/register', icon: Gem },
      { label: 'Calcular Joias', to: '/calcular-joia', icon: Calculator },
      { label: 'Lista Joias', to: '/search', icon: ClipboardList }
    ]

    if (isAdmin) {
      items.push({ label: 'Usuários', to: '/usuarios', icon: UserCog })
    }

    return items
  }, [isAdmin])

  const isActive = (item: MenuItem) =>
    location.pathname === item.to || item.aliases?.includes(location.pathname)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Erro ao sair:', error)
      return
    }
    navigate('/')
  }

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev)
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

  const isSidebarCollapsed = isCollapsed

  return (
    <LayoutContainer>
      <Sidebar $collapsed={isSidebarCollapsed}>
        <SidebarLogo
          type="button"
          onClick={handleToggleCollapse}
          aria-label={isSidebarCollapsed ? 'Expandir menu' : 'Minimizar menu'}
          title={isSidebarCollapsed ? 'Expandir menu' : 'Minimizar menu'}
          $collapsed={isSidebarCollapsed}
        >
          <SidebarLogoIcon>
            <Gem size={22} />
          </SidebarLogoIcon>
          <SidebarBrand $collapsed={isSidebarCollapsed}>
            CHLAIRE
          </SidebarBrand>
        </SidebarLogo>

        <SidebarNavSection $collapsed={isSidebarCollapsed}>
          <SidebarNav aria-label="Navegação principal" $collapsed={isSidebarCollapsed}>
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <SidebarItem
                  key={item.label}
                  to={item.to}
                  $active={isActive(item)}
                  $collapsed={isSidebarCollapsed}
                >
                  <Icon size={18} />
                  <SidebarItemLabel $collapsed={isSidebarCollapsed}>
                    {item.label}
                  </SidebarItemLabel>
                </SidebarItem>
              )
            })}
          </SidebarNav>
        </SidebarNavSection>

        <SidebarFooter $collapsed={isSidebarCollapsed}>
          {displayName && (
            <UserGreeting $collapsed={isSidebarCollapsed}>
              Olá, {displayName}
            </UserGreeting>
          )}
          <SidebarFooterRow $collapsed={isSidebarCollapsed}>
            <LogoutButton type="button" onClick={handleLogout}>
              <LogOut size={16} />
              <LogoutLabel $collapsed={isSidebarCollapsed}>Sair</LogoutLabel>
            </LogoutButton>
            <IconButton onClick={toggleTheme} aria-label="Alternar tema">
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </IconButton>
          </SidebarFooterRow>
        </SidebarFooter>
      </Sidebar>

      <MainContent $collapsed={isSidebarCollapsed}>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  )
}
