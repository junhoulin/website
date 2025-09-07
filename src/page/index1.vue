<template>
  <div class="homepage">
    <!-- Header -->
    <Header />

    <!-- 英雄區塊 -->
    <section class="hero" id="home">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">優雅飾品，展現獨特魅力</h1>
          <p class="hero-subtitle">精選高品質珠寶首飾，為您的日常穿搭增添優雅氣質</p>
          <div class="hero-actions">
            <router-link to="/products" class="btn btn-primary">立即選購</router-link>
            <button class="btn btn-outline">了解更多</button>
          </div>
        </div>
        <div class="hero-image">
          <img src="../assets/img/02.banner/banner01-B1024-2.jpg" alt="優雅飾品" class="hero-img">
        </div>
      </div>
    </section>

    <!-- 特色產品區塊 -->
    <section class="featured-products">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">精選商品</h2>
          <p class="section-subtitle">為您精心挑選的優質飾品</p>
        </div>
        <div class="products-grid">
          <div class="product-card" v-for="product in featuredProducts" :key="product.id">
            <div class="product-image">
              <img :src="product.image" :alt="product.name">
              <div class="product-overlay">
                <button class="btn btn-sm">快速查看</button>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">NT$ {{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 產品分類區塊 -->
    <section class="categories">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">商品分類</h2>
          <p class="section-subtitle">探索我們的飾品系列</p>
        </div>
        <div class="categories-grid">
          <div class="category-card" v-for="category in categories" :key="category.id">
            <div class="category-image">
              <img :src="category.image" :alt="category.name">
            </div>
            <div class="category-info">
              <h3 class="category-name">{{ category.name }}</h3>
              <p class="category-count">{{ category.count }} 件商品</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 品牌故事區塊 -->
    <section class="brand-story">
      <div class="container">
        <div class="story-content">
          <div class="story-text">
            <h2 class="story-title">妝飾品牌故事</h2>
            <p class="story-description">
              我們致力於為每位女性打造獨特的飾品體驗。每一件作品都經過精心設計，
              融合傳統工藝與現代美學，讓您在日常穿搭中展現自信與優雅。
            </p>
            <div class="story-features">
              <div class="feature">
                <i class="pi pi-check-circle"></i>
                <span>100% 純手工製作</span>
              </div>
              <div class="feature">
                <i class="pi pi-check-circle"></i>
                <span>優質材料保證</span>
              </div>
              <div class="feature">
                <i class="pi pi-check-circle"></i>
                <span>終身保固服務</span>
              </div>
            </div>
          </div>
          <div class="story-image">
            <img src="../assets/img/02.banner/CHN0079-1.jpg" alt="品牌故事">
          </div>
        </div>
      </div>
    </section>

    <!-- 頁腳 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <img src="../assets/img/01.logo/logo.png" alt="妝飾" class="logo-img">
              <span class="logo-text">妝飾</span>
            </div>
            <p class="footer-description">
              專業飾品品牌，為您提供優質的珠寶首飾選擇
            </p>
          </div>
          <div class="footer-section">
            <h4 class="footer-title">快速連結</h4>
            <ul class="footer-links">
              <li><a href="#about">關於我們</a></li>
              <li><a href="#contact">聯絡我們</a></li>
              <li><a href="#shipping">運送資訊</a></li>
              <li><a href="#returns">退換貨政策</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4 class="footer-title">客戶服務</h4>
            <ul class="footer-links">
              <li><a href="#faq">常見問題</a></li>
              <li><a href="#size-guide">尺寸指南</a></li>
              <li><a href="#care">保養說明</a></li>
              <li><a href="#warranty">保固服務</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4 class="footer-title">追蹤我們</h4>
            <div class="social-links">
              <a href="#" class="social-link"><i class="pi pi-facebook"></i></a>
              <a href="#" class="social-link"><i class="pi pi-instagram"></i></a>
              <a href="#" class="social-link"><i class="pi pi-twitter"></i></a>
              <a href="#" class="social-link"><i class="pi pi-youtube"></i></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 妝飾. 版權所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'

// 響應式數據
const featuredProducts = ref([
  {
    id: 1,
    name: '優雅珍珠項鍊',
    price: '2,880',
    image: '/src/assets/img/04.商品圖片/100項鍊/110雙層項鍊/111/111a.webp'
  },
  {
    id: 2,
    name: '經典金手鍊',
    price: '1,680',
    image: '/src/assets/img/04.商品圖片/200手鍊/220鍊式手鍊/221/221a.webp'
  },
  {
    id: 3,
    name: '時尚鑽石戒指',
    price: '3,200',
    image: '/src/assets/img/04.商品圖片/300戒指/310層疊混搭/311/311a.webp'
  },
  {
    id: 4,
    name: '精緻耳環套組',
    price: '1,280',
    image: '/src/assets/img/04.商品圖片/200手鍊/230滿鑽手鍊/231a.webp'
  }
])

const categories = ref([
  {
    id: 1,
    name: '項鍊系列',
    count: 45,
    image: '/src/assets/img/03.shop-banner/R1004/R1004-1.jpg'
  },
  {
    id: 2,
    name: '手鍊系列',
    count: 32,
    image: '/src/assets/img/03.shop-banner/B1024/B1024.jpg'
  },
  {
    id: 3,
    name: '戒指系列',
    count: 28,
    image: '/src/assets/img/03.shop-banner/N0338/N0338.jpg'
  },
  {
    id: 4,
    name: '耳環系列',
    count: 36,
    image: '/src/assets/img/02.banner/CHN0079-2.jpg'
  }
])
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.homepage {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: $text-dark;
}

// 導航欄樣式
.navbar {
  background: $bg-white;
  box-shadow: $shadow;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-lg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }
  
  .nav-logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    
    .logo-img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
    
    .logo-text {
      font-size: $font-size-xl;
      font-weight: bold;
      color: $text-gold;
    }
  }
  
  .nav-menu {
    display: flex;
    gap: $spacing-xl;
    
    .nav-link {
      text-decoration: none;
      color: $text-dark;
      font-weight: 500;
      transition: color 0.3s ease;
      
      &:hover {
        color: $primary-color;
      }
    }
  }
  
  .nav-actions {
    display: flex;
    gap: $spacing-md;
    
    .search-btn,
    .cart-btn {
      background: none;
      border: none;
      font-size: $font-size-lg;
      color: $text-dark;
      cursor: pointer;
      padding: $spacing-sm;
      border-radius: $border-radius;
      transition: all 0.3s ease;
      
      &:hover {
        background: $bg-gold;
        color: $primary-color;
      }
    }
    
    .cart-btn {
      position: relative;
      
      .cart-count {
        position: absolute;
        top: -5px;
        right: -5px;
        background: $primary-color;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

// 英雄區塊樣式
.hero {
  background: linear-gradient(135deg, $bg-gold 0%, $bg-cream 100%);
  padding: 120px 0 80px;
  margin-top: 70px;
  
  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-lg;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-xxl;
    align-items: center;
  }
  
  .hero-text {
    .hero-title {
      font-size: 3rem;
      font-weight: bold;
      color: $text-dark;
      margin-bottom: $spacing-lg;
      line-height: 1.2;
    }
    
    .hero-subtitle {
      font-size: $font-size-lg;
      color: $text-light;
      margin-bottom: $spacing-xxl;
    }
    
    .hero-actions {
      display: flex;
      gap: $spacing-lg;
    }
  }
  
  .hero-image {
    .hero-img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: $border-radius-lg;
      box-shadow: $shadow-lg;
    }
  }
}

// 按鈕樣式
.btn {
  padding: $spacing-md $spacing-xl;
  border: none;
  border-radius: $border-radius;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  
  &.btn-primary {
    background: $primary-color;
    color: white;
    
    &:hover {
      background: $primary-hover;
      transform: translateY(-2px);
    }
  }
  
  &.btn-outline {
    background: transparent;
    color: $primary-color;
    border: 2px solid $primary-color;
    
    &:hover {
      background: $primary-color;
      color: white;
    }
  }
  
  &.btn-sm {
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
  }
}

// 容器樣式
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-lg;
}

// 區塊標題樣式
.section-header {
  text-align: center;
  margin-bottom: $spacing-xxl;
  
  .section-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: $text-dark;
    margin-bottom: $spacing-md;
  }
  
  .section-subtitle {
    font-size: $font-size-lg;
    color: $text-light;
  }
}

// 特色產品區塊
.featured-products {
  padding: 80px 0;
  background: $bg-white;
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: $spacing-xl;
  }
  
  .product-card {
    background: $bg-white;
    border-radius: $border-radius-lg;
    overflow: hidden;
    box-shadow: $shadow;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: $shadow-lg;
    }
    
    .product-image {
      position: relative;
      height: 250px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      
      .product-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      &:hover {
        img {
          transform: scale(1.1);
        }
        
        .product-overlay {
          opacity: 1;
        }
      }
    }
    
    .product-info {
      padding: $spacing-lg;
      
      .product-name {
        font-size: $font-size-lg;
        font-weight: 600;
        color: $text-dark;
        margin-bottom: $spacing-sm;
      }
      
      .product-price {
        font-size: $font-size-xl;
        font-weight: bold;
        color: $primary-color;
      }
    }
  }
}

// 產品分類區塊
.categories {
  padding: 80px 0;
  background: $bg-light;
  
  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $spacing-xl;
  }
  
  .category-card {
    background: $bg-white;
    border-radius: $border-radius-lg;
    overflow: hidden;
    box-shadow: $shadow;
    transition: transform 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    .category-image {
      height: 200px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }
    
    &:hover .category-image img {
      transform: scale(1.1);
    }
    
    .category-info {
      padding: $spacing-lg;
      text-align: center;
      
      .category-name {
        font-size: $font-size-lg;
        font-weight: 600;
        color: $text-dark;
        margin-bottom: $spacing-sm;
      }
      
      .category-count {
        color: $text-light;
        font-size: $font-size-sm;
      }
    }
  }
}

// 品牌故事區塊
.brand-story {
  padding: 80px 0;
  background: $bg-white;
  
  .story-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-xxl;
    align-items: center;
  }
  
  .story-text {
    .story-title {
      font-size: 2.5rem;
      font-weight: bold;
      color: $text-dark;
      margin-bottom: $spacing-lg;
    }
    
    .story-description {
      font-size: $font-size-lg;
      color: $text-light;
      margin-bottom: $spacing-xl;
      line-height: 1.8;
    }
    
    .story-features {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
      
      .feature {
        display: flex;
        align-items: center;
        gap: $spacing-md;
        
        i {
          color: $primary-color;
          font-size: $font-size-lg;
        }
        
        span {
          font-weight: 500;
          color: $text-dark;
        }
      }
    }
  }
  
  .story-image {
    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: $border-radius-lg;
      box-shadow: $shadow-lg;
    }
  }
}

// 頁腳樣式
.footer {
  background: $text-dark;
  color: white;
  padding: 60px 0 20px;
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $spacing-xxl;
    margin-bottom: $spacing-xxl;
  }
  
  .footer-section {
    .footer-logo {
      margin-top: 22px;
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      margin-bottom: $spacing-lg;
      
      .logo-img {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
      
      .logo-text {
        font-size: $font-size-lg;
        font-weight: bold;
        color: $text-gold;
      }
    }
    
    .footer-description {
      color: #ccc;
      line-height: 1.6;
    }
    
    .footer-title {
      font-size: $font-size-lg;
      font-weight: 600;
      margin-bottom: $spacing-lg;
      color: $text-gold;
    }
    
    .footer-links {
      list-style: none;
      padding: 0;
      
      li {
        margin-bottom: $spacing-sm;
        
        a {
          color: #ccc;
          text-decoration: none;
          transition: color 0.3s ease;
          
          &:hover {
            color: $primary-color;
          }
        }
      }
    }
    
    .social-links {
      display: flex;
      gap: $spacing-md;
      
      .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
        
        &:hover {
          background: $primary-color;
          transform: translateY(-2px);
        }
      }
    }
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: $spacing-lg;
    border-top: 1px solid #444;
    color: #ccc;
  }
}

// 響應式設計
@media (max-width: 768px) {
  .navbar {
    .nav-container {
      padding: 0 $spacing-md;
    }
    
    .nav-menu {
      display: none;
    }
  }
  
  .hero {
    padding: 40px 0 80px;
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
      grid-template-areas: 
        "hero-image"
        "hero-text";
    }
    
    .hero-text {
      grid-area: hero-text;
      order: 2;
    }
    
    .hero-image {
      grid-area: hero-image;
      order: 1;
      margin-bottom: $spacing-xl;
    }
    
    .hero-text .hero-title {
      font-size: 2rem;
    }
    
    .hero-actions {
      justify-content: center;
    }
  }
  
  .story-content {
    grid-template-columns: 1fr !important;
  }
  
  .products-grid,
  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
