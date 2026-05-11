import pb from '@/lib/pocketbase/client'

export interface Servico {
  id: string
  titulo: string
  descricao: string
  icone: string
  ordem: number
}

export const getServicos = () => pb.collection<Servico>('servicos').getFullList({ sort: 'ordem' })
