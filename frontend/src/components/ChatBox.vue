<template>
    <div id='chat-panel' class="login-panel">
        <tr class='chatrooms-header'>
        <span class="material-icons md-24">chat</span>
        <h2>ChatBox</h2>
      
        </tr>
        
        <button v-on:click="handleComponent" class="button-login" id='button-chatbox'>Voltar</button>
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
                chatrooms: [ ],
                /*token = io(cfg.url + 'chatroom', {

                }) */
            }
        },
        methods: {
            getChatrooms() {
                axios.get(cfg.url + 'chatroom', {
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
            handleComponent: function() {
                this.$emit('handleComponent', true)
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
.chatrooms-container {
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 90%;

    @media screen and (max-width: 769px) {
        font-size: 12px;
    }
}
.chatrooms-header {
    text-align: center;
    margin-bottom: 20px;
}
#button-chatbox {
    align-self: center;
    width: 50%;
}
#chat-panel {
    position: relative;
    align-self: center;
    justify-self: center;
    display: flex;
    height: 60vh;
    width: 400px;
}
</style>