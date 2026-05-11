export type Service = {
  id: string
  title: string
  description: string
  icon: 'briefcase' | 'shield' | 'settings'
}

export const fetchServicesData = async (
  shouldFail = false,
  isEmpty = false,
): Promise<Service[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to fetch services'))
      } else if (isEmpty) {
        resolve([])
      } else {
        resolve([
          {
            id: '1',
            title: 'Consultoria Trabalhista',
            description:
              'Orientação jurídica completa para relações trabalhistas, mitigando riscos e garantindo conformidade legal.',
            icon: 'briefcase',
          },
          {
            id: '2',
            title: 'Compliance Trabalhista',
            description:
              'Auditoria preventiva, implementação de políticas internas e adequação às normas éticas e regulatórias.',
            icon: 'shield',
          },
          {
            id: '3',
            title: 'Gestão Empresarial e Processos',
            description:
              'Otimização de rotinas, estruturação de departamentos e melhoria contínua da eficiência operacional.',
            icon: 'settings',
          },
        ])
      }
    }, 2000)
  })
}
