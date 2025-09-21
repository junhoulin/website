<template>
  <header class="header">
    <div class="offer" ref="offer">
      <p>FINAL CLEARANCE: <span class="font-semibold">Take 20% off</span> 'Sale <span class="font-semibold">{{
        promo_code }}</span>'</p>
      <button class="close-btn" @click="closeOffer()">
        <i class="pi pi-times"></i>
      </button>
    </div>

    <MobileMenu 
      ref="myMobileMenu" 
      :isOpen="mobileMenuOpen"
      @close="closeMobileMenu"
    />

    <div class="top-header-container" :class="{ scrolled }">
      <div class="top-header">
        <div class="header-content">
          <div class="left-section">
            <i class="pi pi-bars mobile-menu-btn" @click="openMobileNav()"></i>
          </div>
          <div class="logo" ref="myLogo">
            <h1>JhuangShih</h1>
          </div>
          <div class="right-side-header">
            <div class="cart-side" @click="openCart">
              <i class="pi pi-shopping-cart"></i>
              <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop Menu -->
    <div class="desktop-menu">
      <ul class="menu-list">
        <li>
          <router-link to="/">首頁</router-link>
        </li>
        <li>
          <router-link to="/product-list">商品列表</router-link>
        </li>
        <li>
          <router-link to="/wholesale">批發專區</router-link>
        </li>
        <li>
          <router-link to="/brand">品牌故事</router-link>
        </li>
        <li>
          <router-link to="/contact">聯絡我們</router-link>
        </li>
      </ul>
    </div>

    <!-- 購物車組件 -->
    <Cart :isOpen="cartOpen" @close="closeCart" />
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import MobileMenu from './MobileMenu.vue';
import Cart from './Cart.vue';

const scrolled = ref('');
const handleScroll = () => {
  if (window.scrollY > 20) {
    scrolled.value = 'fixed_header';
  } else {
    scrolled.value = '';
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

const myLogo = ref('');
const myMobileMenu = ref('');

// 購物車狀態
const cartOpen = ref(false);
const cartItemCount = ref(3); // 模擬購物車商品數量

// 手機選單狀態
const mobileMenuOpen = ref(false);

const openMobileNav = () => {
  mobileMenuOpen.value = true;
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
}

const openCart = () => {
  cartOpen.value = true;
}

const closeCart = () => {
  cartOpen.value = false;
}

const offer = ref('');
const promo_code = 'Must-Haves';

const closeOffer = () => {
  if (offer.value) {
    offer.value.classList.add('!hidden');
  }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/_variables.scss' as *;

.header {
  position: relative;
  background: white;
  z-index: 1000;
  .offer {
    display: none;
    background-color: #DC9EA5;
    padding: 0.75rem 0;
    position: relative;
    text-align: center;

    @media (min-width: 640px) {
      display: block;
    }

    p {
      margin: 0;
      color: white;
      font-size: 0.875rem;
      font-weight: 500;

      .font-semibold {
        font-weight: 600;
      }
    }

    .close-btn {
      position: absolute;
      top: 0.6rem;
      right: 0.75rem;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      margin: 0;

      i {
        font-size: 1.5rem;
        color: #494848;
        transition: color 0.3s ease;

        &:hover {
          color: #1d1d1d;
        }
      }
    }
  }

  .top-header-container {
    padding: 0.75rem 0;
    transition: all 0.3s ease;

    @media (min-width: 1024px) {
      padding: 1.75rem 0;
    }

    &.scrolled {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: white;
      z-index: 1000;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .top-header {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;

      @media (min-width: 1280px) {
        padding: 0;
      }

      .header-content {
        padding: 0 0.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background: white;
        margin-bottom: 0.5rem;

        @media (min-width: 1280px) {
          padding: 0;
        }
      }

      .left-section {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        .mobile-menu-btn {
          font-size: 1.25rem;
          cursor: pointer;
          transition: color 0.3s ease;
          font-weight: 400;

          &:hover {
            color: $primary-color;
          }

          @media (min-width: 1024px) {
            display: none;
          }

          @media (max-width: 640px) {
            font-size: 1.125rem;
          }
        }
      }

      .logo {
        h1 {
          font-family: $font-family;
          font-size: 1.75rem;
          font-weight: 600;
          color: #222222;
          letter-spacing: 0.05em;
          margin: 0;
          line-height: 1;
          transition: all 0.3s ease;
          text-decoration: none;

          @media (max-width: 640px) {
            font-size: 1.5rem;
          }
        }

        @media (min-width: 1280px) {
          margin-left: 4rem;
        }
      }

      .right-side-header {
        display: flex;
        gap: 1rem;

        .cart-side {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.3s ease;
          position: relative;

          &:hover {
            color: $primary-color;
          }

          i {
            font-size: 1.25rem;
            font-weight: 400;

            @media (max-width: 640px) {
              font-size: 1.125rem;
            }
          }

          .cart-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background: $primary-color;
            color: white;
            font-size: 0.75rem;
            font-weight: 500;
            min-width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            padding: 0 0.25rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          span {
            font-size: 1.125rem;
            padding: 0 0.5rem;
            display: none;

            @media (min-width: 1024px) {
              display: block;
            }
          }
        }
      }
    }
  }

  .desktop-menu {
    display: none;

    @media (min-width: 1024px) {
      display: block;
    }

    .menu-list {
      display: flex;
      gap: 3rem;
      align-items: center;
      justify-content: center;
      padding: 1rem 0;
      font-size: 1.25rem;
      font-weight: 300;
      cursor: pointer;
      list-style: none;
      margin: 0;

      li {
        position: relative;
        transition: color 0.3s ease;

        &:hover {
          color: $primary-color;
        }

        a {
          text-decoration: none;
          color: inherit;
          transition: color 0.3s ease;
          font-weight: 300;

          &:hover {
            color: $primary-color;
          }
        }
      }
    }
  }
}

// 響應式設計
@media (max-width: 640px) {
  .header {
    .offer {
      display: none;
    }
  }
}

@media (max-width: 1024px) {
  .header {
    .desktop-menu {
      display: none;
    }
  }
}

// 隱藏樣式
.hidden {
  display: none !important;
}
</style>