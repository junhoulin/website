<template>
  <div class="mobile-menu-overlay" :class="{ active: isOpen }" @click="closeMenu">
    <div class="mobile-menu" ref="mobileMenu_nav" @click.stop>
      <!-- 選單標題區域 -->
      <div class="menu-header">
        <h3 class="menu-title">選單</h3>
        <button class="close-btn" @click="closeMenu">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <!-- 選單內容 -->
      <div class="menu-content">
        <ul class="menu-list">
          <li v-for="(item, index) in menuItems" :key="index" class="menu-item">
            <router-link :to="item.link" class="menu-link" @click="closeMenu">
              <i :class="item.icon" class="menu-icon"></i>
              <span class="menu-text">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 聯絡資訊 - 固定在底部 -->
      <div class="menu-contact">
        <h4 class="contact-title">聯絡我們</h4>
        <div class="contact-info">
          <div class="contact-item">
            <i class="pi pi-phone"></i>
            <span>+886 2 1234 5678</span>
          </div>
          <div class="contact-item">
            <i class="pi pi-envelope"></i>
            <span>info@jhuangshih.com</span>
          </div>
          <div class="contact-item">
            <i class="pi pi-map-marker"></i>
            <span>台北市信義區信義路五段7號</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const mobileMenu_nav = ref(null);

// 監聽選單開啟狀態，控制背景滾動
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const closeMenu = () => {
  emit('close');
};

const menuItems = ref([
  {
    name: "首頁",
    link: "/",
    icon: "pi pi-home"
  },
  {
    name: "商品",
    link: "/products",
    icon: "pi pi-shopping-bag"
  },
  {
    name: "批發",
    link: "/wholesale",
    icon: "pi pi-briefcase"
  },
  {
    name: "關於我們",
    link: "/about",
    icon: "pi pi-info-circle"
  },
  {
    name: "聯絡我們",
    link: "/contact",
    icon: "pi pi-phone"
  }
]);
</script>

<style lang="scss" scoped>
@use '../assets/styles/_variables.scss' as *;

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  &.active {
    opacity: 1;
    visibility: visible;
  }
}

.mobile-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: white;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  .mobile-menu-overlay.active & {
    transform: translateX(0);
  }
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 10;

  .menu-title {
    font-size: 1.5rem;
    font-weight: 300;
    margin: 0;
    letter-spacing: 0.05em;
    color: $text-dark;
  }

  .close-btn {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
    font-size: 1.25rem;

    &:hover {
      background: #f5f5f5;
      color: $text-dark;
    }
  }
}

.menu-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  margin-bottom: auto;
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;

  .menu-item {
    border-bottom: 1px solid #f0f0f0;

    .menu-link {
      display: flex;
      align-items: center;
      padding: 1.25rem 2rem;
      text-decoration: none;
      color: $text-dark;
      transition: all 0.3s ease;
      font-weight: 300;
      letter-spacing: 0.02em;

      &:hover {
        background: #fafafa;
        color: $primary-color;
      }

      &.router-link-active {
        background: rgba($primary-color, 0.1);
        color: $primary-color;
        font-weight: 400;
      }

      .menu-icon {
        font-size: 1.25rem;
        margin-right: 1rem;
        width: 20px;
        text-align: center;
      }

      .menu-text {
        font-size: 1.125rem;
        line-height: 1.4;
      }
    }
  }
}

.menu-contact {
  padding: 2rem;
  background: #fafafa;
  border-top: 1px solid #e5e5e5;
  margin-top: auto;

  .contact-title {
    font-size: 1.125rem;
    font-weight: 300;
    color: $text-dark;
    margin: 0 0 1.5rem 0;
    letter-spacing: 0.05em;
  }

  .contact-info {
    .contact-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: #666;
      font-weight: 300;

      &:last-child {
        margin-bottom: 0;
      }

      i {
        font-size: 1rem;
        margin-right: 0.75rem;
        color: $primary-color;
        width: 16px;
        text-align: center;
      }

      span {
        line-height: 1.4;
      }
    }
  }
}

// 響應式設計
@media (max-width: 480px) {
  .mobile-menu {
    max-width: 100%;
  }

  .menu-header {
    padding: 1rem 1.5rem;
  }

  .menu-list .menu-item .menu-link {
    padding: 1rem 1.5rem;
  }

  .menu-contact {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .mobile-menu-overlay {
    display: none;
  }
}
</style>
