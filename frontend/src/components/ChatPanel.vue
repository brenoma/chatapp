<template>
    <div class="login-panel">
        <span class="material-icons md-24">chat</span>
        <p class="login-title">Chatrooms</p>
        
        <tr class="chatrooms-container" v-for="chatroom in chatrooms" :key="chatroom._id">
            <td>{{ chatroom.name }}</td>
            <td><router-link :to="{ name: 'Chatroom', params: {id: chatroom._id}}">
                <button class="button-login">Entrar</button>
            </router-link></td>
        </tr>
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
                this.$emit('handleComponent', false)
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
    width: 70%;

    @media screen and (max-width: 769px) {
        font-size: 12px;
    }
}
.chatrooms-header {
    text-align: center;
    margin-bottom: 20px;
}
tr {
    padding-bottom: 10px;
}
</style>