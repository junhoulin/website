<template>
  <section class="jewelry-showcase">
    <!-- 標題區域 -->
    <div class="showcase-header">
      <h2 class="showcase-main-title">精緻珠寶系列</h2>
      <p class="showcase-main-subtitle">探索我們的精選商品種類</p>
    </div>
    
    <!-- 珠寶展示網格區域 -->
    <div class="showcase-grid">
      
      <!-- 項鍊系列 -->
      <div class="showcase-item showcase-item--featured">
        <div class="showcase-card">
          <img :src="necklaceImage" alt="項鍊系列" class="showcase-image">
          <div class="showcase-content">
            <h1 class="showcase-title">項鍊</h1>
          </div>
        </div>
      </div>

      <!-- 手鍊展示 -->
      <div class="showcase-item showcase-item--secondary">
        <div class="showcase-card">
          <img :src="braceletImage" alt="手腳鍊系列" class="showcase-image">
          <div class="showcase-content">
            <h1 class="showcase-title">手腳鍊</h1>
          </div>
        </div>
      </div>

      <!-- 手腳鍊展示 -->
      <div class="showcase-item showcase-item--tertiary">
        <div class="showcase-card">
          <img :src="ankletImage" alt="戒指系列" class="showcase-image">
          <div class="showcase-content">
            <h1 class="showcase-title">戒指</h1>
          </div>
        </div>
      </div>

      <!-- 戒指展示 -->
      <div class="showcase-item showcase-item--quaternary">
        <div class="showcase-card">
          <img :src="ringImage" alt="耳環系列" class="showcase-image">
          <div class="showcase-content">
            <h1 class="showcase-title">耳環</h1>
          </div>
        </div>
      </div>

      <!-- 耳環展示 -->
      <div class="showcase-item showcase-item--quinary">
        <div class="showcase-card">
          <img :src="earringImage" alt="手鍊系列" class="showcase-image">
          <div class="showcase-content">
            <h1 class="showcase-title">手鍊</h1>
          </div>
        </div>
      </div>

      <!-- 精選商品展示 -->
      <div class="showcase-item showcase-item--senary">
        <div class="showcase-card">
          <img :src="saleImage" alt="精選商品系列" class="showcase-image">
          <div class="showcase-content">
            <h1 class="showcase-title">精選商品</h1>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/_variables' as *;

// 主要容器樣式
.jewelry-showcase {
  padding: 4rem 0 2rem 0;
  margin-top: 3rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  
  @media screen and (min-width: 1536px) {
    padding-left: 0;
    padding-right: 0;
  }
}

// 標題樣式
.showcase-header {
  max-width: 1400px;
  margin: 0 auto 3rem auto;
  padding: 0 1rem;
  text-align: center;
}

.showcase-main-title {
  font-size: 2rem;
  font-weight: 300;
  color: $text-dark;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  letter-spacing: 0.05em;
}

.showcase-main-subtitle {
  font-size: 0.875rem;
  color: $text-gold;
  margin: 0;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

// 響應式標題
@media screen and (max-width: 768px) {
  .showcase-main-title {
    font-size: 1.75rem;
  }
}

// 移除按鈕樣式，因為不再需要按鈕

// 圖片動畫效果
.showcase-image {
  transition: transform 1s cubic-bezier(0.26, 0.54, 0.32, 1);
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// 展示卡片樣式
.showcase-card {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: $shadow;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;

    .showcase-image {
      transform: scale(1.05);
    }

    .showcase-content {
      background: rgba(0, 0, 0, 0.3);
    }

    .showcase-title {
      transform: scale(1.1);
      color: $text-gold;
    }
  }
}

.showcase-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.showcase-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  color: white;
  z-index: 10;
  transition: all 0.3s ease;
  background: rgba(0, 0, 0, 0.2);
}

.showcase-subtitle {
  font-size: $font-size-sm;
  font-weight: 300;
  color: $text-gold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
}

.showcase-title {
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.2;
  margin: 0;
  color: white;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;

  &--small {
    font-size: 1.5rem;
    font-weight: 300;
  }
}

// 網格佈局
.showcase-grid {
  display: grid;
  gap: 1.5rem;
  padding: 0 1rem;
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  
  @media screen and (min-width: 1280px) {
    max-width: 1400px;
  }
}

// 響應式設計
// 手機版 (240px - 767px)
@media screen and (min-width: 240px) {
  .showcase-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 200px);
  }

  .showcase-item {
    &--featured { grid-area: 1 / 1 / 2 / 2; }
    &--secondary { grid-area: 2 / 1 / 3 / 2; }
    &--tertiary { grid-area: 3 / 1 / 4 / 2; }
    &--quaternary { grid-area: 4 / 1 / 5 / 2; }
    &--quinary { grid-area: 5 / 1 / 6 / 2; }
    &--senary { grid-area: 6 / 1 / 7 / 2; }
  }

  // 手機版 showcase-content 樣式調整
  .showcase-content {
    padding: 1rem;
  }

  .showcase-title {
    font-size: 1.25rem;
    line-height: 1.3;

    &--small {
      font-size: 1rem;
      line-height: 1.2;
    }
  }

}

// 小手機版 (480px 以下)
@media screen and (max-width: 480px) {
  .jewelry-showcase {
    padding: 2rem 0;
  }
  .showcase-content {
    padding: 0.75rem;
  }

  .showcase-title {
    font-size: 1rem;
    line-height: 1.2;

    &--small {
      font-size: 0.875rem;
      line-height: 1.1;
    }
  }

}

// 平板版 (768px - 1023px)
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .showcase-grid {
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(8, 120px);
  }

  .showcase-item {
    &--featured { grid-area: 1 / 1 / 4 / 8; }
    &--secondary { grid-area: 4 / 1 / 6 / 8; }
    &--tertiary { grid-area: 6 / 1 / 7 / 4; }
    &--quaternary { grid-area: 6 / 4 / 7 / 8; }
    &--quinary { grid-area: 7 / 1 / 8 / 4; }
    &--senary { grid-area: 7 / 4 / 8 / 8; }
  }
}

// 桌面版 (1024px+)
@media screen and (min-width: 1024px) {
  .showcase-grid {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(10, 100px);
  }

  .showcase-item {
    &--featured { 
      grid-row: 1 / 6;
      grid-column: 1 / 5;
    }
    &--secondary { 
      grid-row: 1 / 3;
      grid-column: 5 / 9;
    }
    &--tertiary { 
      grid-row: 3 / 6;
      grid-column: 5 / 7;
    }
    &--quaternary { 
      grid-row: 3 / 6;
      grid-column: 7 / 9;
    }
    &--quinary { 
      grid-row: 6 / 10;
      grid-column: 1 / 5;
    }
    &--senary { 
      grid-row: 6 / 10;
      grid-column: 5 / 9;
    }
  }

  .showcase-title {
    font-size: 2rem;

    &--small {
      font-size: 1.5rem;
    }
  }
}

// 超大螢幕 (2xl+)
@media screen and (min-width: 1536px) {
  .showcase-grid {
    max-width: 1400px;
    margin: 0 auto;
  }
}
</style>

<script setup>
// 導入圖片資源
import necklaceImage from '../assets/img/indexcategory/首頁-項鍊.webp';
import braceletImage from '../assets/img/indexcategory/首頁-手腳鍊-1.webp';
import ringImage from '../assets/img/02.banner/R1004-1.jpg';
import earringImage from '../assets/img/indexcategory/首頁-手鍊.webp';
import ankletImage from '../assets/img/02.banner/BRJ1053 model.jpg';
import saleImage from '../assets/img/02.banner/BRJ9080.jpg';
</script>
