import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signUp, user } = useAuth()

  if (user) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Senhas não conferem')
      return
    }
    if (password.length < 8) {
      setError('Senha deve ter no mínimo 8 caracteres')
      return
    }
    setLoading(true)
    setError('')
    const { error: signUpError } = await signUp(email, password)
    if (signUpError) {
      setError('Email já cadastrado ou formato inválido')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 pt-20">
      <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>
        {error && <div className="mb-4 text-sm text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Criar conta
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  )
}
