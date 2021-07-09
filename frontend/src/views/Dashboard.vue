<template>
  <div id="content">
    <chat-panel />
  </div>
</template>

<script>
  import ChatPanel from "../components/ChatPanel";
  export default {
    components: { ChatPanel },
    name: 'Dashboard',
  }
</script>