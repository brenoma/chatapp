const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Nome da sala obrigatório'
    }
})

module.exports = mongoose.model('Chatroom', chatroomSchema)