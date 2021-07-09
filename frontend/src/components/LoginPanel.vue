<template>
    <div class="login-panel" :zDepth="2">
        <span class="material-icons md-24">chat</span>
        <p class="login-title">Faça seu Login</p>
        <div id="Logininfo" class="login-info">

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
            <a v-on:click="handleComponent" class='signuplink'>Sem conta? Cadastre-se</a>
            <router-link to='/'>
            <button type="submit" label="LOGIN" class="button-login" v-on:click="loginIn()" primary>Entrar</button>
            </router-link>
        </div> 
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import * as cfg from '../config/cfg'
import axios from 'axios';

export default {
    name: 'LoginPanel',
    props: {
        login: {
            type: Boolean
        }
    },
    data() {
        return {
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
    methods: {
        handleComponent: function() {
            this.$emit('handleComponent', false)
        },
        loginIn() {
            /*
            const email = this.email.trim(),
                password = this.password.trim();

            if (email && password) {
                this.$http.post(cfg.url + 'login', {
                        email: email,
                        password: password
                    })
                    .then((res) => {
                        this.$store.dispatch('loginIn', { email });
                        localStorage.setItem('token', res.body.token);
                    }, (res) => {
                        this.$router.push({ path: '/push' });
                    });
                    */

            axios.post(cfg.url + 'user/login', {
                email: this.email,
                password: this.password
            }).then((response) => {
                this.makeToast("success", response.data.message)
                //console.log(response.data.message)
                localStorage.setItem('token', response.data.token)
                console.log("Token: " + localStorage.token)
                this.$router.push({path: '/dashboard'})
                
            }).catch(err => {
                this.makeToast("error", err.response.data.message)
                //console.log(err.response.data.message)
            })
        },
        makeToast(type, msg) {
            this.Toast.fire({
                icon: type,
                title: msg,
            });
        },     
    }
}
</script>

<style lang="scss">
* {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.material-icons.md-24 {
    position: relative;
    margin-top: 20px;
    padding-bottom: 0;
    text-align: left;
    font-size: 24px;
    color: #1976d2;
}

.login-panel {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0em auto;
    position: relative;
    background-color: #ffffff;
    top: calc(50% - 18em);
    text-indent: 2em;
    border-radius: 8px;
    animation: animate 2s linear forwards;

    @media screen and (max-width: 768px) {
      width: 80%;      
    }
    
}

.login-panel .login-title {
    width: 100%;
    text-align: left;
    padding-top: 4em;
    font-size: 2em;
    line-height: 4em;
    color: #ffffff;
    background-color: #1976d2;

    @media screen and (max-width: 768px) {
      font-size: 1.5em;      
    }
    
}

.login-panel .login-info {
    padding: 2em 2em 0 2em;
    text-indent: 0em;
}

.login-panel .login-info .input {
    display: flex;
    position: relative;
    width: 50%;
    height: 2rem;
    overflow: visible;
    margin-bottom: 15px;
    transition: 0.5s;
    border: hidden;
    border-block-end-style: inset;
    border-color: #1976D2;
    outline: none;
}

.login-panel .login-info .input:focus {
  transform: scale(1.05);
  opacity: 0.8;
}
.login-panel .login-submit {
    padding: 2em;
}

.signuplink {
    margin-right: 10px;
    color: #1976D2;
}

button.button-login {
    width: 70px;
    border-radius: 6px;
    background: #1976d2;
    color: #ffffff;
    transition: 0.1s ease-in-out;
}

button:hover {
  transform: scale(1.2);
  opacity: 0.8;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: rotateY(90deg);
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: (0deg);
    filter: blur(0px);
  }
}

</style>
