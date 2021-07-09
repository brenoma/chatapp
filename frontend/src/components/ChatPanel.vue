<template>
    <div class="login-panel" :zDepth="2">
        <span class="material-icons md-24">chat</span>
        <ul>
            <li v-for="item in items" :key="item.message">{ item.message }</li>
        </ul>
    </div>
</template>

<script>
import * as cfg from '../config/cfg.js'
import axios from 'axios'

export default {
    name: 'ChatPanel',
        data() {
            return {
                activeNameClass: false,
                name: '',
                items: [
                    {message: 'Chat 1'},
                    {message: 'Chat 2'},
                ],
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
                    setChatrooms(response.data);
                }).catch(err => {
                    setTimeout(this.getChatrooms, 3000)
                })
            }
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