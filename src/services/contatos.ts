import pb from '@/lib/pocketbase/client'

export interface Contato {
  id: string
  nome: string
  email: string
  telefone: string
  mensagem: string
  data_contato: string
  lido: boolean
  created: string
}

export const createContato = (data: Partial<Contato>) => pb.collection('contatos').create(data)
export const getContatos = () =>
  pb.collection<Contato>('contatos').getFullList({ sort: '-created' })
export const updateContato = (id: string, data: Partial<Contato>) =>
  pb.collection('contatos').update(id, data)
