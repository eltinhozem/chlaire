import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import JewelryForm from './components/form/Form'
import Layout from './components/layout/Layout'
import Info from './components/info/info'
import Login from './components/login/login'
import JewelrySearch from './components/search/Search'
import CadastroPedidos from './components/pedidos/CadastroPedidos'
import ListaPedidos from './components/pedidos/ListaPedidos'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from './components/Styles'
import CalculadoraJoia from './components/calculadora/CalculadoraJoia'
import CadastroClientes from './components/clientes/CadastroClientes'
import Usuarios from './components/usuarios/Usuarios'
import ClienteInfo from './components/clientes/ClienteInfo'
import PainelGestao from './components/gestao/PainelGestao'

// Rota privada: só permite acesso se houver sessão
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>('loading')

  useEffect(() => {
    let active = true

    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser()
      const email = data.user?.email?.trim().toLowerCase()
      if (!email) {
        if (active) setStatus('denied')
        return
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('display_name')
        .eq('email', email)
        .maybeSingle()

      if (active) {
        setStatus(profile?.display_name === 'Elton' ? 'allowed' : 'denied')
      }
    }

    checkAdmin()

    return () => {
      active = false
    }
  }, [])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'denied') {
    return <Navigate to="/cadastro-clientes" replace />
  }

  return <>{children}</>
}

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  // Função para alternar entre o tema claro e o dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout toggleTheme={toggleTheme} theme={theme} />
              </PrivateRoute>
            }
          >
            <Route
              path="search"
              element={
                <PrivateRoute>
                  <JewelrySearch />
                </PrivateRoute>
              }
            />
            <Route
              path="register"
              element={
                <PrivateRoute>
                  <JewelryForm />
                </PrivateRoute>
              }
            />
            <Route
              path="info"
              element={
                <PrivateRoute>
                  <Info />
                </PrivateRoute>
              }
            />
            <Route
              path="cadastro-pedidos"
              element={
                <PrivateRoute>
                  <CadastroPedidos />
                </PrivateRoute>
              }
            />
            <Route
              path="cadastro-pedidos/:id"
              element={
                <PrivateRoute>
                  <CadastroPedidos />
                </PrivateRoute>
              }
            />
            <Route
              path="lista-pedidos"
              element={
                <PrivateRoute>
                  <ListaPedidos />
                </PrivateRoute>
              }
            />
            <Route
              path="calcular-joia"
              element={
                <PrivateRoute>
                  <CalculadoraJoia />
                </PrivateRoute>
              }
            />
            <Route
              path="cadastro-clientes"
              element={
                <PrivateRoute>
                  <CadastroClientes />
                </PrivateRoute>
              }
            />
            <Route
              path="painel-gestao"
              element={
                <PrivateRoute>
                  <PainelGestao />
                </PrivateRoute>
              }
            />
            <Route
              path="clientes/:id"
              element={
                <PrivateRoute>
                  <ClienteInfo />
                </PrivateRoute>
              }
            />
            <Route
              path="usuarios"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <Usuarios />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
