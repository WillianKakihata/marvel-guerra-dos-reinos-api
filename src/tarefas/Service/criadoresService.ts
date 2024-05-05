import criadoresModel from '../Schema/criadoresSchema'

class CriadoresService{
    async create(criadores:any){
        const createdCriadores = await criadoresModel.create(criadores)

        return createdCriadores
    }

    async findById(id:String){
        const findedCriadores = await criadoresModel.findById(id)
        return findedCriadores
    }

    async findAll(){
        const findedCriadores = await criadoresModel.find()
        return findedCriadores
    }

    async update(id: string, criadores:any){
        const updateCriadores = await criadoresModel.findByIdAndUpdate(id, {
            nome: criadores.nome,
            funcao: criadores.funcao,
            contribuicao: criadores.contribuicao

        },{new:true})

        return updateCriadores
    }

    async delete(id:string) {
        await criadoresModel.findByIdAndDelete(id)
        return 'Tarefa Removida com sucesso'
    }
    async findByName(nome:String){
        const findedCriadores = await criadoresModel.find({nome})
        return findedCriadores
    }
    async registrosAtuais(){
        const totalRegisters = await criadoresModel.countDocuments()
        return totalRegisters
    }
}

export default new CriadoresService()