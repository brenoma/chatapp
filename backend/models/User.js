const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Digite seu nome'
    },
    email: {
        type: String,
        required: 'Digite seu email'
    },
    password: {
        type: String,
        required: 'Digite sua senha'
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)