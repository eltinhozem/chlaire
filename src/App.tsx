import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import JewelryForm from './components/form/Form'
import Layout from './components/Layout'
import Info from './components/info'
import Login from './components/login/login'
import JewelrySearch from './components/search/Search'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
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
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <JewelrySearch />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PrivateRoute>
                <JewelryForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/info"
            element={
              <PrivateRoute>
                <Info />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
