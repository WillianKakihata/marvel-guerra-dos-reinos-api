import {Schema, model} from 'mongoose'

const PersonagemSchema = new Schema({
    nome: String,
    descricao:String,
    imagemUrl: String
}, {
    timestamps: true
})

export default model('Personagem', PersonagemSchema)