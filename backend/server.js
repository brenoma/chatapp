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

const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.on("connection", (socket) => {
    console.log("Conectado: " + socket.userId);
  
    socket.on("disconnect", () => {
      console.log("Disconectado: " + socket.userId);
    });
  
    socket.on("joinRoom", ({ chatroomId }) => {
      socket.join(chatroomId);
      console.log("Um usuário entrou na sala: " + chatroomId);
    });
  
    socket.on("leaveRoom", ({ chatroomId }) => {
      socket.leave(chatroomId);
      console.log("Um usuário saiu da sala: " + chatroomId);
    });
  
    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
      if (message.trim().length > 0) {
        const user = await User.findOne({ _id: socket.userId });
        const newMessage = new Message({
          chatroom: chatroomId,
          user: socket.userId,
          message,
        });
        io.to(chatroomId).emit("newMessage", {
          message,
          name: user.name,
          userId: socket.userId,
        });
        await newMessage.save();
      }
    });
  });