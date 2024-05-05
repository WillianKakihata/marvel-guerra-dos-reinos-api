import comicModel from '../Schema/comicSchema'

class ComicService{
    async create(comic:any){
        const createdComic = await comicModel.create(comic)

        return createdComic
    }

    async findById(id:String){
        const findedComic = await comicModel.findById(id)
        return findedComic
    }

    async findAll(){
        const findedComics = await comicModel.find()
        return findedComics
    }

    async update(id: string, comic:any){
        const updateComic = await comicModel.findByIdAndUpdate(id, {
            titulo: comic.titulo,
            descricao: comic.descricao,
            dataPublicacao: comic.dataPublicacao,
            capa: comic.capa

        },{new:true})

        return updateComic
    }

    async delete(id:string) {
        await comicModel.findByIdAndDelete(id)
        return 'Tarefa Removida com sucesso'
    }
    
    async findByName(titulo:String){
        const findedComic = await comicModel.find({titulo})
        return findedComic
    }
    async registrosAtuais(){
        const totalRegisters = await comicModel.countDocuments()
        return totalRegisters
    }
}

export default new ComicService()