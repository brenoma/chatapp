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

app.listen(8000, () => {
    console.log("Alo? Alo? Eco? Escutando servidor na porta 8000")
})