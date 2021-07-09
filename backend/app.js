const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Routes
app.use('/user', require('./routes/user'))
app.use('/chatroom', require('./routes/chatroom'))

// Error Handlers
const errorHandlers = require('./handlers/errorHandlers')
app.use(errorHandlers.notFound)
app.use(errorHandlers.mongoseErrors)
if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorHandlers.developmentErrors)
} else {
    app.use(errorHandlers.productionErrors)
}

module.exports = app;