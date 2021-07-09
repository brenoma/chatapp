<template>
    <div id="LoginPanel" class="login-panel">
        <span class="material-icons md-24">chat</span>
        <p class="login-title">Faça seu cadastro</p>
        <div id="Logininfo" class="login-info">

            <input 
              placeholder="Nome Completo"
              label="NAME"
              class="input"
              v-model="name"
            />

            <input 
              placeholder="E-mail"
              label="EMAIL"
              class="input"
              v-model="email"
            />
      
    
            <input
              placeholder="Senha"
              label="PASSWORD"
              class="input"
              v-model="password"
              type="password"
            />
    
    
    
        </div>
        <div class="login-submit">
            <a v-on:click='handleComponent' class='signuplink'>Voltar para Login</a>
            <button label="LOGIN" class="button-login" v-on:click="signUp()" primary>Cadastrar</button>
        </div> 
    </div>
</template>

<script>
import * as cfg from '../config/cfg'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'RegisterPanel',
    data() {
        return {
            activeNameClass: false,
            name: '',
            email: '',
            password: '',
            Toast: Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,                
            }),
        }
    },
    props: {
        login: {
            type: Boolean
        }
    },
    methods: {
        signUp() {
            axios.post(cfg.url + 'user/register', {
                name: this.name,
                email: this.email,
                password: this.password
            }).then((response) => {
                this.makeToast("success", response.data.message)
                console.log(response.data.message)
            }).catch(err => {
                this.makeToast("error", err.response.data.message)
                console.log(err.response.data.message)
            })
        },
        makeToast(type, msg) {
            this.Toast.fire({
                icon: type,
                title: msg,
            });
        }, 
        handleComponent: function() {
            this.$emit('handleComponent', true)
        },
    }
}
</script>

<style lang="scss">


</style>
