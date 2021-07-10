<template>

        
        <div class="chatroomPage">
            <div class="chatroomSection">
                <div class="chatroomHeader">
                    Chatroom Name
                    <router-link to="/dashboard">
                        <button class="button-login">Sair</button>
                    </router-link>
                </div>
                <div class="chatroomContent">
                        <div class="message">
                            <span class="ownMessage">Breno:</span> Bom dia
                        </div>
                        <div class="message">
                            <span class="otherMessage">Qualquer pessoa:</span> Bom dia
                        </div>
                </div>
                <div class="chatroomActions">
                    <div>
                        <input
                            class="chatroomInput"
                            type="text"
                            name="message"
                            placeholder="Escreva sua mensagem!"
                            ref={messageRef}
                        />
                    </div>
                    <div>
                        <button class="button-login">
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>


</template>

<script>
import * as cfg from '../config/cfg.js'
import io from 'socket.io-client'
import axios from 'axios'

export default {
    name: 'ChatPanel',
        data() {
            return {
                chatroom: { },
                messages: [ ],
                users: [ ],
                
            }
        },
        methods: {
            getChatrooms() {
                axios.get(cfg.url + 'chatroom/' , {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    },
                })
                .then((response) => {
                    this.chatrooms = response.data
                }).catch(err => {
                    setTimeout(this.getChatrooms, 3000)
                })
            },
        },
        mounted() {
            const token = localStorage.getItem('token')
            if(!token) {
                this.$router.push({path: '/'})
            } else {
                this.getChatrooms()
            }
        },
        
}
</script>

<style lang="scss" scoped>
.chatroomHeader {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #1976d2;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    height: 50px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.chatroomHeader button {
    transform: scale(0.8);
}

.chatroomPage {
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  margin: -8px;
}

.chatroomSection {
  background-color: #fff;
  width: 40vw;
  height: 80vh;
  margin: auto;
  border-radius: 10px;
  position: relative;
}

.chatroomContent {
  position: absolute;
  top: 3rem;
  left: 0;
  right: 0;
  bottom: 3.5rem;
  padding: 0.5rem;
  overflow: auto;
}

.chatroomActions {
  position: absolute;
  bottom: 0;
  background-color: #1976d2;
  left: 0;
  right: 0;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 72px;
  grid-gap: 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.chatroomInput {
    width: 90%;
    border-radius: 7px;
}

.message {
  margin-bottom: 0.25rem;
}

.otherMessage {
  color: #0099cc;
  font-weight: bold;
}

.ownMessage {
  color: #00cc00;
  font-weight: bold;
}


</style>