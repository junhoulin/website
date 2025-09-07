<template>
  <div>
    <Header />
    <div class="shop-content">
      <h1>商品頁面</h1>
      <p>歡迎來到我們的商品頁面！</p>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'

// 商品頁面邏輯
</script>

<style lang="scss" scoped>
@use '../assets/styles/_variables.scss' as *;

.shop-content {
  padding-top: 100px; // 為固定header留出空間
  
  h1 {
    color: $text-dark;
    text-align: center;
    margin-top: $spacing-xl;
  }

  p {
    text-align: center;
    color: $text-light;
    font-size: 1.1rem;
  }
}
</style>
