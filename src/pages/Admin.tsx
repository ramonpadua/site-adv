import { useEffect, useState } from 'react'
import { useRealtime } from '@/hooks/use-realtime'
import { getContatos, updateContato, type Contato } from '@/services/contatos'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function AdminPage() {
  const [contatos, setContatos] = useState<Contato[]>([])

  const loadData = async () => {
    try {
      const data = await getContatos()
      setContatos(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('contatos', () => {
    loadData()
  })

  const markAsRead = async (id: string) => {
    await updateContato(id, { lido: true })
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard Admin - Contatos</h1>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Mensagem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contatos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhum contato recebido.
                  </TableCell>
                </TableRow>
              ) : (
                contatos.map((contato) => (
                  <TableRow
                    key={contato.id}
                    className={contato.lido ? 'opacity-60' : 'font-medium'}
                  >
                    <TableCell>{format(new Date(contato.created), 'dd/MM/yyyy HH:mm')}</TableCell>
                    <TableCell>{contato.nome}</TableCell>
                    <TableCell>{contato.email}</TableCell>
                    <TableCell>{contato.telefone}</TableCell>
                    <TableCell className="max-w-xs truncate" title={contato.mensagem}>
                      {contato.mensagem}
                    </TableCell>
                    <TableCell>
                      {contato.lido ? <Badge variant="secondary">Lido</Badge> : <Badge>Novo</Badge>}
                    </TableCell>
                    <TableCell>
                      {!contato.lido && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(contato.id)}>
                          <Check className="w-4 h-4 mr-1" /> Marcar Lido
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
