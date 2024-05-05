TECNOLOGIAS UTILIZADAS:
   
   - VS CODE
   - MOONGOSE
   - EXPRESS
   - TYPESCRIPT
   - API MARVEL
   - JEST

ATRIBUTOS DE CADA CLASSE:

//personagem
    - nome: String,
    - descricao:String,
    - imagemUrl: String

//criadores
   - nome: String,
   - funcao:String,
   - contribuicao: String

//comics
    - titulo: String,
    - descricao:String,
    - dataPublicacao: String,
    - capa: String

AS ROTAS (CRUD) DE CADA CLASSE: 

//personagem

routes.post('/personagem', personagemController.create)
routes.get('/personagem/:id', personagemController.findById)
routes.get('personagem/',personagemController.find)
routes.put('/personagem/:id', personagemController.update)
routes.delete('personagem/:id',personagemController.delete)
routes.get('/personagem-carregados',personagemController.dataB)

//criadores
routes.post('/criadores', criadoresController.create)
routes.get('/criadores/:id', criadoresController.findById)
routes.get('criadores/', criadoresController.find)
routes.put('/criadores/:id', criadoresController.update)
routes.delete('criadores/:id', criadoresController.delete)
routes.get('/criadores-carregados',criadoresController.dataB)

//comics
routes.post('/comic', comicController.create)
routes.get('/comic/:id', comicController.findById)
routes.get('comic/', comicController.find)
routes.put('/comic/:id', comicController.update)
routes.delete('comic/:id', comicController.delete)
routes.get('/comic-carregados',comicController.dataB)

Auxiliares:

routes.get('/personagens/:nome',personagemController.findByName)
routes.get('/comic/:titulo',comicController.findByName)
routes.get('/criadores/:nome',criadoresController.findByName)
routes.get('/personagens-registros',personagemController.totalRegisters)
routes.get('/criadores-registros',criadoresController.totalRegisters)
routes.get('/comic-registros',comicController.totalRegisters)
