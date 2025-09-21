<template>
  <div class="swiper-container">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :autoplay="{
        delay: 6000,
        disableOnInteraction: false,
      }"
      :pagination="{ clickable: true }"
      :navigation="false"
      class="mySwiper"
    >
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <div class="slide-content">
          <img :src="slide.image" :alt="slide.alt" />
          <div class="slide-overlay">
            <h2 class="slide-title">{{ slide.title }}</h2>
            <p class="slide-description">{{ slide.description }}</p>
            <button class="slide-button">{{ slide.buttonText }}</button>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const modules = [Autoplay, Pagination, Navigation]

// 輪播圖片數據
const slides = ref([
  {
    image: '/src/assets/img/02.banner/banner1.png',
    alt: '珠寶首飾展示',
    title: '精緻珠寶',
    description: '展現您的獨特魅力',
    buttonText: '立即選購'
  },
  {
    image: '/src/assets/img/02.banner/banner1.png',
    alt: '時尚首飾',
    title: '時尚設計',
    description: '引領潮流風尚',
    buttonText: '了解更多'
  },
  {
    image: '/src/assets/img/02.banner/banner1.png',
    alt: '優雅首飾',
    title: '優雅品味',
    description: '彰顯您的優雅氣質',
    buttonText: '查看系列'
  }
])
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.swiper-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.mySwiper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.slide-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slide-content img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.slide-content:hover .slide-overlay {
  opacity: 1;
}

.slide-content:hover img {
  transform: scale(1.05);
}

.slide-title {
  font-family: "Noto Sans TC", "Microsoft JhengHei", "微軟正黑體", "PingFang TC", sans-serif;
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 3px;
  line-height: 1.2;
}

.slide-description {
  font-family: "Noto Serif TC", "新細明體", "PMingLiU", "Times New Roman", serif;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.8;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: 300;
  letter-spacing: 1px;
}

.slide-button {
  font-family: "Noto Sans TC", "Microsoft JhengHei", "微軟正黑體", "PingFang TC", sans-serif;
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  color: white;
  border: none;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.slide-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, $secondary-color, $primary-color);
}

// Swiper 導航按鈕樣式
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 20px;
  font-weight: bold;
}

// Swiper 分頁器樣式
:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  width: 12px;
  height: 12px;
  margin: 0 6px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: white;
  transform: scale(1.2);
}

:deep(.swiper-pagination) {
  bottom: 20px;
}

// 響應式設計
@media (max-width: 768px) {
  .mySwiper {
    height: 100vh;
  }
  
  .slide-title {
    font-size: 2rem;
  }
  
  .slide-description {
    font-size: 1rem;
  }
  
  .slide-button {
    padding: 10px 24px;
    font-size: 1rem;
  }
  
  .slide-overlay {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .mySwiper {
    height: 100vh;
  }
  
  .slide-title {
    font-size: 1.5rem;
  }
  
  .slide-description {
    font-size: 0.9rem;
  }
}
</style>
