<template>
  <div class="cart-overlay" :class="{ active: isOpen }" @click="closeCart">
    <div class="cart-sidebar" @click.stop>
      <!-- 購物車標題 -->
      <div class="cart-header">
        <h2 class="cart-title">購物車</h2>
        <button class="close-btn" @click="closeCart">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <!-- 購物車內容 -->
      <div class="cart-content">
        <!-- 空購物車狀態 -->
        <div v-if="cartItems.length === 0" class="empty-cart">
          <div class="empty-icon">
            <i class="pi pi-shopping-cart"></i>
          </div>
          <h3 class="empty-title">購物車是空的</h3>
          <p class="empty-subtitle">快來選購您喜愛的珠寶吧</p>
          <button class="continue-shopping-btn" @click="closeCart">
            繼續購物
          </button>
        </div>

        <!-- 購物車商品列表 -->
        <div v-else class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="item-details">
              <h4 class="item-name">{{ item.name }}</h4>
              <p class="item-category">{{ item.category }}</p>
              <div class="item-price">
                <span class="current-price">NT$ {{ item.price.toLocaleString() }}</span>
                <span v-if="item.originalPrice" class="original-price">NT$ {{ item.originalPrice.toLocaleString() }}</span>
              </div>
              <div class="quantity-controls">
                <button class="quantity-btn" @click="decreaseQuantity(item.id)">
                  <i class="pi pi-minus"></i>
                </button>
                <span class="quantity">{{ item.quantity }}</span>
                <button class="quantity-btn" @click="increaseQuantity(item.id)">
                  <i class="pi pi-plus"></i>
                </button>
              </div>
            </div>
            <button class="remove-btn" @click="removeItem(item.id)">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 購物車底部 -->
      <div v-if="cartItems.length > 0" class="cart-footer">
        <div class="cart-summary">
          <div class="summary-row">
            <span class="summary-label">小計</span>
            <span class="summary-value">NT$ {{ subtotal.toLocaleString() }}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">運費</span>
            <span class="summary-value">NT$ {{ shipping.toLocaleString() }}</span>
          </div>
          <div class="summary-row total">
            <span class="summary-label">總計</span>
            <span class="summary-value">NT$ {{ total.toLocaleString() }}</span>
          </div>
        </div>
        <div class="cart-actions">
          <button class="checkout-btn" @click="checkout">
            立即結帳
          </button>
          <button class="continue-btn" @click="closeCart">
            繼續購物
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// 監聽購物車開啟狀態，控制背景滾動
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// 購物車數據 (模擬數據)
// 導入圖片資源
import cartItem1Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/111/111a.webp'
import cartItem2Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/112/112a.webp'

const cartItems = ref([
  {
    id: 1,
    name: '三戴式18K金 PVD不鏽鋼星月吊飾可轉換項鍊',
    category: '項鍊',
    price: 1800,
    quantity: 1,
    image: cartItem1Image
  },
  {
    id: 2,
    name: '18K 金 PVD 不鏽鋼珍珠與圓片疊戴吊飾項鍊',
    category: '項鍊',
    price: 650,
    quantity: 2,
    image: cartItem2Image
  }
])

// 計算屬性
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const shipping = computed(() => {
  return subtotal.value >= 5000 ? 0 : 150
})

const total = computed(() => {
  return subtotal.value + shipping.value
})

// 方法
const closeCart = () => {
  emit('close')
}

const increaseQuantity = (itemId) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item) {
    item.quantity++
  }
}

const decreaseQuantity = (itemId) => {
  const item = cartItems.value.find(item => item.id === itemId)
  if (item && item.quantity > 1) {
    item.quantity--
  }
}

const removeItem = (itemId) => {
  const index = cartItems.value.findIndex(item => item.id === itemId)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const checkout = () => {
  // 結帳邏輯
  console.log('前往結帳')
  closeCart()
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/_variables.scss' as *;

.cart-overlay {
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


.cart-sidebar {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 450px;
  height: 100%;
  background: white;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  .cart-overlay.active & {
    transform: translateX(0);
  }
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e5e5e5;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;

  .cart-title {
    font-size: 1.5rem;
    font-weight: 300;
    color: $text-dark;
    margin: 0;
    letter-spacing: 0.05em;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #666;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;

    &:hover {
      background: #f5f5f5;
      color: $text-dark;
    }
  }
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;

  .empty-icon {
    font-size: 4rem;
    color: #ddd;
    margin-bottom: 1.5rem;
  }

  .empty-title {
    font-size: 1.5rem;
    font-weight: 300;
    color: $text-dark;
    margin: 0 0 0.5rem 0;
    letter-spacing: 0.05em;
  }

  .empty-subtitle {
    font-size: 1rem;
    color: #666;
    margin: 0 0 2rem 0;
    font-weight: 300;
  }

  .continue-shopping-btn {
    padding: 0.75rem 2rem;
    background: $primary-color;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.05em;

    &:hover {
      background: darken($primary-color, 10%);
      transform: translateY(-2px);
    }
  }
}

.cart-items {
  padding: 1rem 0;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #f0f0f0;
  gap: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #fafafa;
  }

  .item-image {
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    border-radius: 4px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .item-details {
    flex: 1;
    min-width: 0;

    .item-name {
      font-size: 1rem;
      font-weight: 300;
      color: $text-dark;
      margin: 0 0 0.25rem 0;
      letter-spacing: 0.02em;
      line-height: 1.4;
    }

    .item-category {
      font-size: 0.875rem;
      color: $text-gold;
      margin: 0 0 0.5rem 0;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 300;
    }

    .item-price {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;

      .current-price {
        font-size: 1.125rem;
        font-weight: 300;
        color: $text-dark;
        letter-spacing: 0.02em;
      }

      .original-price {
        font-size: 0.875rem;
        color: #999;
        text-decoration: line-through;
        font-weight: 300;
      }
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .quantity-btn {
        width: 28px;
        height: 28px;
        border: 1px solid #ddd;
        background: white;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.75rem;

        &:hover {
          border-color: $primary-color;
          color: $primary-color;
        }
      }

      .quantity {
        min-width: 20px;
        text-align: center;
        font-size: 0.875rem;
        font-weight: 300;
        color: $text-dark;
      }
    }
  }

  .remove-btn {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    font-size: 1rem;

    &:hover {
      background: #f5f5f5;
      color: #e74c3c;
    }
  }
}

.cart-footer {
  border-top: 1px solid #e5e5e5;
  background: white;
  padding: 1.5rem 2rem;
  position: sticky;
  bottom: 0;
}

.cart-summary {
  margin-bottom: 1.5rem;

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;

    &.total {
      border-top: 1px solid #e5e5e5;
      padding-top: 0.75rem;
      margin-top: 0.75rem;
      font-size: 1.125rem;
      font-weight: 300;

      .summary-label,
      .summary-value {
        font-weight: 300;
      }
    }

    .summary-label {
      font-size: 1rem;
      color: $text-dark;
      font-weight: 300;
      letter-spacing: 0.02em;
    }

    .summary-value {
      font-size: 1rem;
      color: $text-dark;
      font-weight: 300;
      letter-spacing: 0.02em;
    }
  }
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .checkout-btn {
    padding: 1rem 2rem;
    background: $primary-color;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.05em;

    &:hover {
      background: darken($primary-color, 10%);
      transform: translateY(-2px);
    }
  }

  .continue-btn {
    padding: 0.75rem 2rem;
    background: transparent;
    color: $text-dark;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.05em;

    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }
  }
}

// 響應式設計
@media (max-width: 768px) {
  .cart-sidebar {
    max-width: 100%;
  }

  .cart-header {
    padding: 1rem 1.5rem;
  }

  .cart-item {
    padding: 1rem 1.5rem;
  }

  .cart-footer {
    padding: 1rem 1.5rem;
  }
}
</style>
