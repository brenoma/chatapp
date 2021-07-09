<template>
  <div id="content">
    <login-panel v-if="login" v-bind:login="login" v-on:handleComponent='updateComponent($event)' />
    <register-panel v-else v-bind:login="login" v-on:handleComponent='updateComponent($event)'/>
  </div>
</template>


<script>
  import LoginPanel from "../components/LoginPanel";
  import RegisterPanel from '../components/RegisterPanel.vue'

  export default {
    components: { LoginPanel, RegisterPanel },
    name: 'Login',
    data() {
      return {
        login: true
      }
    },
    methods: {
      updateComponent: function(updatedLogin) {
        console.log(this.login)
        this.login = updatedLogin
        console.log(this.login)
      }
    }
  }
</script>
