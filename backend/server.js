require('dotenv').config();

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

mongoose.connection.on('error', (err) => {
    console.log("Erro na conexão com o MongoDB: " + err.message)
})

mongoose.connection.once('open', () => {
    console.log("MongoDB conectado!")
})

// Importando os Models
require('./models/User')
require('./models/Chatroom')
require('./models/Message')

const app = require('./app')

const server = app.listen(8000, () => {
    console.log("Alo? Alo? Eco? Escutando servidor na porta 8000")
})

const io = require('socket.io')(server)
const jwt = require('jwt-then')

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token
        const payload = await jwt.verify(token, process.env.SECRET)
        socket.userId = payload.id
        next()
    } catch (err) {

    }
})

io.on('connection', (socket) => {
    console.log('Connected: ' + socket.userId)

    socket.on('disconnect', () => {
        console.log('Disconnected: ' + socker.userId)
    })
})