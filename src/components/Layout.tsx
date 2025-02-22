import { Outlet, Link, useLocation } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import  Logo, { CadastrosJoia }  from './Logo'


export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-9">
          <div className="flex justify-between items-center py-9">
            {/* Logo */}
            <Link to="/search" className="flex items-center">
              {' '}
             
              <Logo size="medium" color="url(#dDourado)" className="max-h-16" />
            </Link>

            {/* Botão de Cadastro (exibido apenas fora da página de registro) */}
      {location.pathname !== '/register' && (
        <Link to="/register" className="inline-block">
          <CadastrosJoia type="button" >
            <PlusCircle className="h-4 w-4 mr-2" />
            Cadastrar Nova Joia
          </CadastrosJoia>
        </Link>
      )}

          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        <Outlet />
      </main>

      {/* Footer (opcional) */}
      <footer className="bg-white shadow-sm mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Joalheria. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
