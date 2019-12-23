<template>
  <div id="app">
    <div id="nav" />
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Courier+Prime&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
#app {
  font-family: 'Courier Prime', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
