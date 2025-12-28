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

function App() {
  const [theme, setTheme] = useState('light')

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
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
