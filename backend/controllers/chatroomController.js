const mongoose = require('mongoose')
const Chatroom = mongoose.model('Chatroom')

exports.createChatroom = async (req, res) => {
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) throw 'O nome da sala só pode conter letras'

    const chatroomExists = await Chatroom.findOne({ name })

    if (chatroomExists) throw 'O nome da sala já existe'

    const chatroom = new Chatroom ({
        name,
    })

    await chatroom.save();

    res.json ({
        message: 'Sala criada'
    })
}

exports.getChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find({})

    res.json(chatrooms)
}

exports.getChatroomById = async (req, res) => {
    try {
        const chatroom = await Chatroom.findOne({ _id: req.params.id })

        res.json({
            success: true,
            _id: chatroom
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}