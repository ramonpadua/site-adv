migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('servicos')

    const seeds = [
      {
        titulo: 'Redação de peças',
        descricao:
          'Elaboração técnica e estratégica de petições, recursos e documentos jurídicos com foco em precisão e resultados.',
        icone: 'file-text',
        ordem: 5,
      },
      {
        titulo: 'Advogado Criminal',
        descricao:
          'Defesa especializada em processos criminais, garantindo a proteção dos direitos fundamentais e o pleno exercício do contraditório.',
        icone: 'gavel',
        ordem: 6,
      },
    ]

    for (const seed of seeds) {
      try {
        app.findFirstRecordByData('servicos', 'titulo', seed.titulo)
      } catch (_) {
        const record = new Record(col)
        record.set('titulo', seed.titulo)
        record.set('descricao', seed.descricao)
        record.set('icone', seed.icone)
        record.set('ordem', seed.ordem)
        app.save(record)
      }
    }
  },
  (app) => {
    const titles = ['Redação de peças', 'Advogado Criminal']
    for (const title of titles) {
      try {
        const record = app.findFirstRecordByData('servicos', 'titulo', title)
        app.delete(record)
      } catch (_) {}
    }
  },
)
