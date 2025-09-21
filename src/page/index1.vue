<template>
  <div class="homepage">
    <!-- Header -->
    <Header />
    <Swiper />
    <GridShowcase />
    <RecommendedProducts />
    <BrandStory />
    <!-- 頁腳 -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Swiper from '../components/swiper.vue'
import GridShowcase from '../components/GridShowcase.vue'
import BrandStory from '../components/BrandStory.vue'
import RecommendedProducts from '../components/RecommendedProducts.vue'

</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

</style>
