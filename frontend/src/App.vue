<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  background-color: #2c3e50;
}

#app {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100vh;
  
  background:url("./assets/bg.jpg") no-repeat fixed center;
}

#content {
    overflow: hidden;
    height: 100%;
    width: 100%;
}  

</style>
