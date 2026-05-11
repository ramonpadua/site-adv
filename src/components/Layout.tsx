import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Início', href: '/#inicio' },
    { name: 'Serviços', href: '/#servicos' },
    { name: 'Sobre', href: '/#sobre' },
    { name: 'Contato', href: '/contato' },
  ]
  if (user) {
    navLinks.push({ name: 'Admin', href: '/admin' })
  }

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false)
    if (href.startsWith('/#')) {
      const id = href.replace('/', '')
      if (location.pathname !== '/') {
        navigate(href)
      } else {
        const el = document.querySelector(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(href)
    }
  }

  const handleLogout = () => {
    signOut()
    navigate('/login')
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled || location.pathname !== '/'
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6',
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('/#inicio')}
          >
            <span
              className={cn(
                'text-2xl font-bold tracking-tight transition-colors duration-300',
                isScrolled || location.pathname !== '/' ? 'text-primary' : 'text-white',
              )}
            >
              Proi Soluções
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  'text-sm font-medium transition-colors hover:opacity-70',
                  isScrolled || location.pathname !== '/' ? 'text-foreground' : 'text-white',
                )}
              >
                {link.name}
              </button>
            ))}
            {user ? (
              <Button
                onClick={handleLogout}
                variant={isScrolled || location.pathname !== '/' ? 'outline' : 'ghost'}
                className={
                  isScrolled || location.pathname !== '/'
                    ? ''
                    : 'text-white hover:text-white/80 hover:bg-white/10'
                }
              >
                Sair
              </Button>
            ) : (
              <Link
                to="/login"
                className={cn(
                  'text-sm font-medium transition-colors hover:opacity-70',
                  isScrolled || location.pathname !== '/' ? 'text-foreground' : 'text-white',
                )}
              >
                Login
              </Link>
            )}
            <Button
              onClick={() => navigate('/contato')}
              variant={isScrolled || location.pathname !== '/' ? 'default' : 'secondary'}
              className={cn(
                'rounded-full px-6',
                !(isScrolled || location.pathname !== '/') &&
                  'bg-white text-primary hover:bg-white/90',
              )}
            >
              Agende uma Consulta
            </Button>
          </nav>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X
                className={cn(
                  'h-6 w-6',
                  isScrolled || location.pathname !== '/' ? 'text-foreground' : 'text-white',
                )}
              />
            ) : (
              <Menu
                className={cn(
                  'h-6 w-6',
                  isScrolled || location.pathname !== '/' ? 'text-foreground' : 'text-white',
                )}
              />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg animate-slide-down">
            <nav className="flex flex-col py-4 px-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-lg font-medium text-foreground py-2 border-b border-gray-100 last:border-0"
                >
                  {link.name}
                </button>
              ))}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-left text-lg font-medium text-destructive py-2 border-b border-gray-100 last:border-0"
                >
                  Sair
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="text-left text-lg font-medium text-foreground py-2 border-b border-gray-100 last:border-0"
                >
                  Login
                </button>
              )}
              <Button onClick={() => navigate('/contato')} className="mt-2 w-full">
                Agende uma Consulta
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Proi Soluções</h3>
            <p className="text-slate-400 text-sm mb-4 max-w-sm">
              35 anos de experiência transformando empresas com visão estratégica em direito,
              contabilidade e gestão.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (11) 99999-9999
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                contato@proisolucoes.com.br
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                São José dos Campos, SP
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => scrollToSection('/#inicio')}
                  className="hover:text-white transition-colors"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('/#servicos')}
                  className="hover:text-white transition-colors"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('/#sobre')}
                  className="hover:text-white transition-colors"
                >
                  Sobre
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Proi Soluções. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}
