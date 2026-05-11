migrate(
  (app) => {
    const servicos = new Collection({
      name: 'servicos',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'titulo', type: 'text', required: true },
        { name: 'descricao', type: 'text', required: true },
        { name: 'icone', type: 'text' },
        { name: 'ordem', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(servicos)

    const portfolio = new Collection({
      name: 'portfolio',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'titulo', type: 'text' },
        { name: 'descricao', type: 'text' },
        { name: 'resultado', type: 'text' },
        { name: 'area_servico', type: 'relation', collectionId: servicos.id, maxSelect: 1 },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(portfolio)

    const blog = new Collection({
      name: 'blog',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'titulo', type: 'text' },
        { name: 'conteudo', type: 'text' },
        { name: 'autor', type: 'text' },
        { name: 'data_publicacao', type: 'date' },
        { name: 'slug', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: ['CREATE UNIQUE INDEX idx_blog_slug ON blog (slug)'],
    })
    app.save(blog)

    const contatos = new Collection({
      name: 'contatos',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: '',
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'nome', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'telefone', type: 'text' },
        { name: 'mensagem', type: 'text' },
        { name: 'data_contato', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'lido', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(contatos)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('contatos'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('blog'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('portfolio'))
    } catch (_) {}
    try {
      app.delete(app.findCollectionByNameOrId('servicos'))
    } catch (_) {}
  },
)
