import {Request, Response} from 'express'
import personagemService from '../Service/personagemService'
import { personagensType

 } from '../Type/personagens'
class PersonagemController {
    async dataB(req:Request, res: Response){
        const fetchApi = fetch(`https://gateway.marvel.com:443/v1/public/series/25991/characters?apikey=18b25173360477d84467b3bc73165d23&ts=123&hash=4c158d886216558ba939fa1095139b51`)
        .then((response) => {
        return response.json()
        })
        .then((data) => {
            const aApi = data.data.results
            for(var i=0;i<aApi.length;i++){
                
                const nome = aApi[i].name
                const descricao = aApi[i].description
                const imagemUrl = aApi[i].thumbnail.path

                const newPersonagens : personagensType = {
                    nome: nome,
                    descricao:descricao,
                    imagemUrl: imagemUrl

                }
                personagemService.create(newPersonagens);
            }
            
        }
    
    )
    }
    async create(req: Request, res: Response){
        const personagem = await personagemService.create(req.body)
        res.status(201)
        return res.json(personagem)
    }

    async findById(req: Request,res: Response ){
        const personagem = await personagemService.findById(req.params.id)
        return res.json(personagem)
    }

    async find(req: Request, res: Response) {
        const personagem = await personagemService.findAll()
        return res.json(personagem)
    }

    async update(req:Request,res:Response){
        const updatePersonagem = await personagemService.update(req.params.id, req.body)
        return res.json(updatePersonagem)
    }

    async delete(req:Request,res:Response){
        const deleteReturn = await personagemService.delete(req.params.id)
        return res.json(deleteReturn)
    }
    async findByName(req: Request,res: Response ){
        const personagem = await personagemService.findByName(req.params.nome)
        return res.json(personagem)
    }
    async totalRegisters(req:Request,res:Response){
        const total = await personagemService.registrosAtuais()
        return res.json({totalRegistros: total})
    }
}

export default new PersonagemController()