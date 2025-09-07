<script setup>
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style lang="scss">
// 全域 CSS 重置
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

#app {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
