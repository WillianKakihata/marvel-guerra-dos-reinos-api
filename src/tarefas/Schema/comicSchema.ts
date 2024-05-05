import {Schema, model} from 'mongoose'

const ComicSchema = new Schema({
    titulo: String,
    descricao:String,
    dataPublicacao: String,
    capa: String
}, {
    timestamps: true
})

export default model('Comic', ComicSchema)