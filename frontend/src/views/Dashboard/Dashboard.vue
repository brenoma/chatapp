<template>
  <div id="content">
    <chat-panel v-if="dashboard" v-bind:dashboard="dashboard" v-on:handleComponent='updateComponent($event)' />
    <chat-box v-else v-bind:dashboard="dashboard" v-on:handleComponent='updateComponent($event)'/>
  </div>
</template>

<script>
  import ChatPanel from "../../components/ChatPanel";
  import ChatBox from '../../components/ChatBox.vue'
  
  export default {
    components: { ChatPanel, ChatBox },
    name: 'Dashboard',
    data() {
      return {
        dashboard: true
      }
    },
    methods: {
      updateComponent: function(updatedDashboard) {
        console.log(this.dashboard)
        this.dashboard = updatedDashboard
        console.log(this.dashboard)
      }
    }
  }
</script>

<style src='./style.scss' lang='scss' scoped />