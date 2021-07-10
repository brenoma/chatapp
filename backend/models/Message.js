const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Sala necessária',
        ref: 'Chatroom'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Usuário necessário',
        ref: 'User'
    },
    message: {
        type: String,
        required: 'Digite uma mensagem'
    }
})

module.exports = mongoose.model('Message', messageSchema)