migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'ramon.padua@adapta.org')
    } catch (_) {
      const record = new Record(users)
      record.setEmail('ramon.padua@adapta.org')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Admin')
      app.save(record)
    }

    const servicosCol = app.findCollectionByNameOrId('servicos')
    const seedServicos = [
      {
        titulo: 'Consultoria Trabalhista',
        descricao: 'Assessoria completa em questões trabalhistas, desde contratação até rescisão',
        icone: 'briefcase',
        ordem: 1,
      },
      {
        titulo: 'Compliance Trabalhista',
        descricao:
          'Implementação de processos internos para aplicação da NR1 e conformidade regulatória',
        icone: 'shield-check',
        ordem: 2,
      },
      {
        titulo: 'Gestão Empresarial',
        descricao:
          'Visão cognitiva da empresa com correções nas áreas contábil, jurídica e de gestão',
        icone: 'cog',
        ordem: 3,
      },
    ]

    for (const s of seedServicos) {
      try {
        app.findFirstRecordByData('servicos', 'titulo', s.titulo)
      } catch (_) {
        const rec = new Record(servicosCol)
        rec.set('titulo', s.titulo)
        rec.set('descricao', s.descricao)
        rec.set('icone', s.icone)
        rec.set('ordem', s.ordem)
        app.save(rec)
      }
    }
  },
  (app) => {},
)
