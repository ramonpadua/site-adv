import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createContato } from '@/services/contatos'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

export default function ContatoPage() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    try {
      await createContato({
        nome: formData.get('nome') as string,
        email: formData.get('email') as string,
        telefone: formData.get('telefone') as string,
        mensagem: formData.get('mensagem') as string,
        lido: false,
      })
      toast({
        title: 'Mensagem enviada com sucesso',
        description: 'Entraremos em contato em breve.',
      })
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      toast({
        title: 'Erro ao enviar',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-foreground">Entre em Contato</h1>
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input id="nome" name="nome" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" name="telefone" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem</Label>
              <Textarea id="mensagem" name="mensagem" required rows={5} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
