import {Router} from 'express'
import comicController from './tarefas/Controller/comicController'
import criadoresController from './tarefas/Controller/criadoresController'
import personagemController from './tarefas/Controller/personagemController'

const routes = Router()
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

//Rota auxiliares
routes.get('/personagens/:nome',personagemController.findByName)
routes.get('/comic/:titulo',comicController.findByName)
routes.get('/criadores/:nome',criadoresController.findByName)
routes.get('/personagens-registros',personagemController.totalRegisters)
routes.get('/criadores-registros',criadoresController.totalRegisters)
routes.get('/comic-registros',comicController.totalRegisters)

export {
    routes
}