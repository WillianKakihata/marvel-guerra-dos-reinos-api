import {Schema, model} from 'mongoose'

const CriadoresSchema = new Schema({
    nome: String,
    funcao:String,
    contribuicao: String
}, {
    timestamps: true
})

export default model('Criadores', CriadoresSchema)