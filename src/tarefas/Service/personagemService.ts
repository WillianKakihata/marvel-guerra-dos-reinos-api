import personagemSchema from '../Schema/personagemSchema'
import personagemModel from '../Schema/personagemSchema'

class PersonagemService{
    async create(personagem:any){
        const createdPersonagem = await personagemModel.create(personagem)

        return createdPersonagem
    }

    async findById(id:String){
        const findedPersonagem = await personagemModel.findById(id)
        return findedPersonagem
    }

    async findAll(){
        const findedPersonagem = await personagemModel.find()
        return findedPersonagem
    }

    async update(id: string, personagem:any){
        const updatePersonagem = await personagemModel.findByIdAndUpdate(id, {
            nome: personagem.nome,
            descricao: personagem.descricao,
            imagemUrl: personagem.imagemUrl
        },{new:true})

        return updatePersonagem
    }

    async delete(id:string) {
        await personagemModel.findByIdAndDelete(id)
        return 'Tarefa Removida com sucesso'
    }
    async findByName(nome:String){
        const findedPersonagem = await personagemModel.find({nome})
        return findedPersonagem
    }
    async registrosAtuais(){
        const totalRegisters = await personagemModel.countDocuments()
        return totalRegisters
    }
}

export default new PersonagemService()