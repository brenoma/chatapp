<template>
  <div id="content">
    <chat-box id='test'/>
  </div>
</template>

<script>
  import ChatBox from '../../components/ChatBox.vue'
  
  export default {
    components: { ChatBox },
    name: 'Chatroom',
    data() {
      return {
        ChatBox: true
      }
    },

  }
</script>
