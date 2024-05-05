import {Request, Response} from 'express'
import criadoresService from '../Service/criadoresService'
import { criadoresType } from '../Type/criadores'

class CriadoresController {
    async dataB(req:Request, res: Response){
        const fetchApi = fetch(`https://gateway.marvel.com:443/v1/public/series/25991/creators?apikey=18b25173360477d84467b3bc73165d23&ts=123&hash=4c158d886216558ba939fa1095139b51`)
        .then((response) => {
        return response.json()
        })
        .then((data) => {
            const aApi = data.data.results
            for(var i=0;i<aApi.length;i++){
                
                const nome = aApi[i].fullname
                const funcao = 'Autor'
                const contribuicao = aApi[i].thumbnail.path

                const newCriadores : criadoresType = {
                    nome: nome,
                    funcao: funcao,
                    contribuicao: contribuicao

                }
                criadoresService.create(newCriadores);
            }
            
        }
    
    )
    }
    async create(req: Request, res: Response){
        const criadores = await criadoresService.create(req.body)
        res.status(201)
        return res.json(criadores)
    }

    async findById(req: Request,res: Response ){
        const criadores = await criadoresService.findById(req.params.id)
        return res.json(criadores)
    }

    async find(req: Request, res: Response) {
        const criadores = await criadoresService.findAll()
        return res.json(criadores)
    }

    async update(req:Request,res:Response){
        const updateCriadores = await criadoresService.update(req.params.id, req.body)
        return res.json(updateCriadores)
    }

    async delete(req:Request,res:Response){
        const deleteReturn = await criadoresService.delete(req.params.id)
        return res.json(deleteReturn)
    }

    async findByName(req: Request,res: Response ){
        const criadores = await criadoresService.findByName(req.params.nome)
        return res.json(criadores)
    }
    async totalRegisters(req:Request,res:Response){
        const total = await criadoresService.registrosAtuais()
        return res.json({totalRegistros: total})
    }
}

export default new CriadoresController()