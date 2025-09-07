<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <img src="../assets/img/01.logo/logo.png" alt="妝飾" class="logo-img">
          <span class="logo-text">妝飾</span>
        </div>
        
        <!-- 桌面版導航 -->
        <nav class="main-nav desktop-nav">
          <router-link to="/" class="nav-item">首頁</router-link>
          <router-link to="/products" class="nav-item">商品列表</router-link>
          <a href="#" class="nav-item">關於我們</a>
        </nav>
        
        <div class="header-actions">
          <button class="cart-btn">
            <i class="pi pi-shopping-cart"></i>
          </button>
          
          <!-- 漢堡包按鈕 -->
          <button class="hamburger" @click="toggleMenu" :class="{ active: isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 手機版選單 -->
    <div class="mobile-menu" :class="{ active: isMenuOpen }">
      <div class="mobile-menu-content">
        <nav class="mobile-nav">
          <router-link to="/" class="mobile-nav-item" @click="closeMenu">
            <i class="pi pi-home"></i>
            <span>首頁</span>
          </router-link>
          <router-link to="/products" class="mobile-nav-item" @click="closeMenu">
            <i class="pi pi-th-large"></i>
            <span>商品列表</span>
          </router-link>
          <a href="#" class="mobile-nav-item" @click="closeMenu">
            <i class="pi pi-info-circle"></i>
            <span>關於我們</span>
          </a>
        </nav>
        
        <!-- <div class="mobile-menu-footer">
          <button class="mobile-cart-btn">
            <i class="pi pi-shopping-cart"></i>
            <span>購物車</span>
          </button>
        </div> -->
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

// 響應式數據
const isMenuOpen = ref(false)

// 方法
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/_variables.scss' as *;

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  // 容器樣式
    .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-lg;
    }

  
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-md 0;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    
    .logo-img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
    
    .logo-text {
      font-size: 1.5rem;
      font-weight: 600;
      color: $text-dark;
    }
  }
  
  .main-nav {
    display: flex;
    align-items: center;
    gap: $spacing-xl;
    
    .nav-item {
      color: $text-dark;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      position: relative;
      
      &:hover {
        color: $primary-color;
      }
    }
    
    .nav-dropdown {
      position: relative;
      
      &:hover .dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        border-radius: $border-radius;
        box-shadow: $shadow-lg;
        padding: $spacing-sm 0;
        min-width: 200px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        
        .dropdown-item {
          display: block;
          padding: $spacing-sm $spacing-md;
          color: $text-dark;
          text-decoration: none;
          transition: background-color 0.3s ease;
          
          &:hover {
            background-color: $bg-light;
          }
        }
      }
    }
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    
    .cart-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      padding: $spacing-sm;
      border-radius: 50%;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: $bg-light;
        transform: scale(1.1);
      }
    }
    
    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      width: 24px;
      height: 18px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      z-index: 1001;
      
      span {
        display: block;
        height: 2px;
        width: 100%;
        background: $text-dark;
        border-radius: 2px;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        transform-origin: center;
      }
      
      &.active {
        span {
          &:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
          }
          
          &:nth-child(2) {
            opacity: 0;
            transform: scaleX(0);
          }
          
          &:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
          }
        }
      }
    }
  }
}

// 手機版選單樣式
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.active {
    opacity: 1;
    visibility: visible;
    
    .mobile-menu-content {
      transform: translateY(0);
    }
  }
  
  .mobile-menu-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    padding: 80px $spacing-lg $spacing-xl;
    transform: translateY(-100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    margin-bottom: $spacing-xxl;
    
    .mobile-nav-item {
      display: flex;
      align-items: center;
      gap: $spacing-md;
      padding: $spacing-lg;
      color: $text-dark;
      text-decoration: none;
      font-weight: 500;
      font-size: 1.1rem;
      border-radius: $border-radius-lg;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      i {
        font-size: 1.2rem;
        color: $primary-color;
        transition: all 0.3s ease;
      }
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba($primary-color, 0.1), transparent);
        transition: left 0.5s ease;
      }
      
      &:hover {
        background: rgba($primary-color, 0.05);
        transform: translateX(10px);
        
        i {
          transform: scale(1.2);
        }
        
        &::before {
          left: 100%;
        }
      }
      
      &.router-link-active {
        background: rgba($primary-color, 0.1);
        color: $primary-color;
        
        i {
          color: $primary-color;
        }
      }
    }
  }
  
  .mobile-menu-footer {
    .mobile-cart-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-sm;
      padding: $spacing-lg;
      background: linear-gradient(135deg, $primary-color 0%, $primary-hover 100%);
      color: white;
      border: none;
      border-radius: $border-radius-lg;
      font-weight: 600;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba($primary-color, 0.3);
      
      i {
        font-size: 1.2rem;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba($primary-color, 0.4);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
}

// 響應式設計
@media (max-width: 768px) {
  .header {
    .header-content {
      .desktop-nav {
        display: none;
      }
    }
    
    .header-actions {
      .hamburger {
        display: flex;
      }
    }
  }
}

@media (max-width: 480px) {
  .mobile-menu {
    .mobile-menu-content {
      padding: 60px $spacing-md $spacing-lg;
    }
    
    .mobile-nav {
      .mobile-nav-item {
        padding: $spacing-md;
        font-size: 1rem;
      }
    }
  }
}
</style>
