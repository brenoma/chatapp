<template>
  <div id="content">
    <chat-panel2 v-if="dashboard2" v-bind:dashboard2="dashboard2" v-on:handleComponent='updateComponent($event)' />
    <chat-box v-else v-bind:dashboard="dashboard2" v-on:handleComponent='updateComponent($event)'/>
  </div>
</template>

<script>
  import ChatPanel2 from "../../components/ChatPanel2";
  import ChatBox from '../../components/ChatBox.vue'
  
  export default {
    components: { ChatPanel2, ChatBox },
    name: 'Dashboard2',
    data() {
      return {
        dashboard2: true
      }
    },
    methods: {
      updateComponent: function(updatedDashboard2) {
        console.log(this.dashboard2)
        this.dashboard2 = updatedDashboard2
        console.log(this.dashboard2)
      }
    }
  }
</script>

<style src='./style.scss' lang='scss' scoped />