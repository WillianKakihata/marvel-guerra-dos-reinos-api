import {Request, Response, response} from 'express'
import comicService from '../Service/comicService'
import { comicType } from '../Type/comicType'

class ComicController {
    async dataB(req:Request, res: Response){
        const fetchApi = fetch(`https://gateway.marvel.com:443/v1/public/series/25991/comics?apikey=18b25173360477d84467b3bc73165d23&ts=123&hash=4c158d886216558ba939fa1095139b51`)
        .then((response) => {
        return response.json()
        })
        .then((data) => {
            const aApi = data.data.results
            console.log(aApi)
            for(var i=0;i<aApi.length;i++){
                //título, descrição, data de publicação, e capa.
                const title = aApi[i].title
                const descricao = aApi[i].description
                const dataPublicacao = aApi[i].dates[0].date
                const capa = aApi[i].thumbnail.path

                const newComics : comicType = {
                    titulo: title,
                    descricao: descricao,
                    dataPublicacao: dataPublicacao,
                    capa: capa

                }
                comicService.create(newComics);
            }
            
        }
    
    )
    }
    async create(req: Request, res: Response){
        const comic = await comicService.create(req.body)
        res.status(201)
        return res.json(comic)
    }

    async findById(req: Request,res: Response ){
        const comic = await comicService.findById(req.params.id)
        return res.json(comic)
    }

    async find(req: Request, res: Response) {
        const comic = await comicService.findAll()
        return res.json(comic)
    }

    async update(req:Request,res:Response){
        const updateComic = await comicService.update(req.params.id, req.body)
        return res.json(updateComic)
    }

    async delete(req:Request,res:Response){
        const deleteReturn = await comicService.delete(req.params.id)
        return res.json(deleteReturn)
    }
    async findByName(req: Request,res: Response ){
        const comic = await comicService.findByName(req.params.titulo)
        return res.json(comic)
    }
    async totalRegisters(req:Request,res:Response){
        const total = await comicService.registrosAtuais()
        return res.json({totalRegistros: total})
    }
    
}



export default new ComicController()