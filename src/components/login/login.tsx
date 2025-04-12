
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, isLoginAllowed, trackLoginAttempt } from '../../lib/supabase'
import { loginSchema } from '../../lib/validation'
import Logo from '../logo/Logo'
import { Loginbutton } from './styles'
import { Eye, EyeOff, Lock, Mail, AlertTriangle } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [locked, setLocked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [lastAttempt, setLastAttempt] = useState<Date | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if login is allowed
    const loginStatus = isLoginAllowed()
    setLocked(!loginStatus.allowed)
    
    if (!loginStatus.allowed && loginStatus.lastAttempt) {
      setLastAttempt(new Date(loginStatus.lastAttempt))
    }

    // Check if user is already logged in
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) navigate('/search')
    }
    
    checkSession()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (locked) {
      const waitTime = lastAttempt ? Math.ceil((15 * 60 * 1000 - (Date.now() - lastAttempt.getTime())) / 60000) : 15
      setError(`Conta temporariamente bloqueada. Tente novamente em aproximadamente ${waitTime} minutos.`)
      return
    }

    const trackingResult = trackLoginAttempt()
    if (!trackingResult.allowed) {
      setLocked(true)
      setLastAttempt(new Date())
      setError('Muitas tentativas de login. Tente novamente mais tarde.')
      return
    }

    setLoading(true)

    try {
      // Validate form data
      loginSchema.parse({ email, password })

      // Sanitize input
      const sanitizedEmail = email.trim().toLowerCase()
      
      const { error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password
      })

      if (error) throw error

      // Reset login attempts on successful login
      navigate('/search')
    } catch (err: any) {
      console.error('Login error:', err.message)
      setError('Email ou senha inválidos')
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo size="large" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Entre na sua conta
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-md">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            <div>
              <Loginbutton
                type="submit"
                disabled={loading || locked}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Entrando...' : locked ? 'Conta bloqueada' : 'Entrar'}
              </Loginbutton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
