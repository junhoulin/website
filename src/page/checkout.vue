<template>
  <div class="checkout-page">
    <!-- Header -->
    <Header />
    
    <!-- 頁面標題 -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">結帳</h1>
        <p class="page-subtitle">請填寫您的訂購資訊</p>
      </div>
    </div>

    <div class="container">
      <div class="checkout-content">
        <!-- 手機版：訂單摘要 (顯示在表單上方) -->
        <div class="order-summary-section mobile-only">
          <div class="order-summary">
            <h2 class="summary-title">訂單摘要</h2>
            
            <!-- 商品列表 -->
            <div class="order-items">
              <div v-for="item in orderItems" :key="item.id" class="order-item">
                <div class="item-image">
                  <img :src="item.image" :alt="item.name" />
                </div>
                <div class="item-details">
                  <h4 class="item-name">{{ item.name }}</h4>
                  <p class="item-category">{{ item.category }}</p>
                  <div class="item-quantity">數量：{{ item.quantity }}</div>
                  <div class="item-price">NT$ {{ (item.price * item.quantity).toLocaleString() }}</div>
                </div>
              </div>
            </div>

            <!-- 價格摘要 -->
            <div class="price-summary">
              <div class="summary-row">
                <span class="summary-label">商品小計</span>
                <span class="summary-value">NT$ {{ subtotal.toLocaleString() }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">運費</span>
                <span class="summary-value">NT$ {{ selectedDeliveryPrice.toLocaleString() }}</span>
              </div>
              <div class="summary-row total">
                <span class="summary-label">總金額</span>
                <span class="summary-value">NT$ {{ totalAmount.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 左側：訂單資訊表單 -->
        <div class="checkout-form-section">
          <form @submit.prevent="submitOrder" class="checkout-form">
            <!-- 收貨人資訊 -->
            <div class="form-section">
              <h2 class="section-title">收貨人資訊</h2>
              <div class="form-group">
                <label for="recipientName" class="form-label">收貨人姓名 *</label>
                <input
                  type="text"
                  id="recipientName"
                  v-model="formData.recipientName"
                  class="form-input"
                  placeholder="請輸入收貨人姓名"
                  required
                />
              </div>
            </div>

            <!-- 聯絡資訊 -->
            <div class="form-section">
              <h2 class="section-title">聯絡資訊</h2>
              <div class="form-group">
                <label for="phone" class="form-label">聯絡電話 *</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  class="form-input"
                  placeholder="請輸入聯絡電話"
                  required
                />
              </div>
            </div>

            <!-- 送貨方式 -->
            <div class="form-section">
              <h2 class="section-title">送貨方式</h2>
              <div class="delivery-options">
                <div class="delivery-option" v-for="option in deliveryOptions" :key="option.id">
                  <input
                    type="radio"
                    :id="option.id"
                    :value="option.id"
                    v-model="formData.deliveryMethod"
                    class="delivery-radio"
                  />
                  <label :for="option.id" class="delivery-label">
                    <div class="delivery-info">
                      <span class="delivery-name">{{ option.name }}</span>
                      <span class="delivery-price">NT$ {{ option.price.toLocaleString() }}</span>
                    </div>
                    <p class="delivery-description">{{ option.description }}</p>
                  </label>
                </div>
              </div>
            </div>

            <!-- 備註 -->
            <div class="form-section">
              <h2 class="section-title">備註</h2>
              <div class="form-group">
                <label for="notes" class="form-label">訂單備註</label>
                <textarea
                  id="notes"
                  v-model="formData.notes"
                  class="form-textarea"
                  placeholder="如有特殊需求請在此說明"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <!-- 提交按鈕 -->
            <div class="form-actions">
              <button type="button" class="back-btn" @click="goBack">
                返回購物車
              </button>
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                {{ isSubmitting ? '處理中...' : '確認訂單' }}
              </button>
            </div>
          </form>
        </div>

        <!-- 桌面版：訂單摘要 (顯示在右側) -->
        <div class="order-summary-section desktop-only">
          <div class="order-summary">
            <h2 class="summary-title">訂單摘要</h2>
            
            <!-- 商品列表 -->
            <div class="order-items">
              <div v-for="item in orderItems" :key="item.id" class="order-item">
                <div class="item-image">
                  <img :src="item.image" :alt="item.name" />
                </div>
                <div class="item-details">
                  <h4 class="item-name">{{ item.name }}</h4>
                  <p class="item-category">{{ item.category }}</p>
                  <div class="item-quantity">數量：{{ item.quantity }}</div>
                  <div class="item-price">NT$ {{ (item.price * item.quantity).toLocaleString() }}</div>
                </div>
              </div>
            </div>

            <!-- 價格摘要 -->
            <div class="price-summary">
              <div class="summary-row">
                <span class="summary-label">商品小計</span>
                <span class="summary-value">NT$ {{ subtotal.toLocaleString() }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">運費</span>
                <span class="summary-value">NT$ {{ selectedDeliveryPrice.toLocaleString() }}</span>
              </div>
              <div class="summary-row total">
                <span class="summary-label">總金額</span>
                <span class="summary-value">NT$ {{ totalAmount.toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()

// 表單數據
const formData = ref({
  recipientName: '',
  phone: '',
  deliveryMethod: 'convenience',
  notes: ''
})

// 送貨方式選項
const deliveryOptions = ref([
  {
    id: 'convenience',
    name: '超商取貨',
    price: 60,
    description: '7-11、全家、萊爾富、OK超商取貨，3-5個工作天'
  },
  {
    id: 'home_delivery',
    name: '宅配到府',
    price: 120,
    description: '黑貓宅急便配送，2-3個工作天送達'
  }
])

// 訂單商品 (模擬數據，實際應該從購物車或狀態管理獲取)
import cartItem1Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/111/111a.webp'
import cartItem2Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/112/112a.webp'

const orderItems = ref([
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
  return orderItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const selectedDeliveryPrice = computed(() => {
  const selectedOption = deliveryOptions.value.find(option => option.id === formData.value.deliveryMethod)
  return selectedOption ? selectedOption.price : 0
})

const totalAmount = computed(() => {
  return subtotal.value + selectedDeliveryPrice.value
})

// 狀態
const isSubmitting = ref(false)

// 方法
const goBack = () => {
  router.back()
}

const submitOrder = async () => {
  if (!formData.value.recipientName || !formData.value.phone) {
    alert('請填寫必填欄位')
    return
  }

  isSubmitting.value = true

  try {
    // 模擬提交訂單
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 這裡可以添加實際的訂單提交邏輯
    console.log('訂單資訊:', {
      ...formData.value,
      items: orderItems.value,
      total: totalAmount.value
    })
    
    alert('訂單提交成功！')
    // 可以跳轉到訂單確認頁面或首頁
    router.push('/')
  } catch (error) {
    console.error('訂單提交失敗:', error)
    alert('訂單提交失敗，請重試')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // 可以在這裡從購物車或狀態管理獲取商品數據
})
</script>

<style lang="scss" scoped>
@use '../assets/styles/_variables.scss' as *;

.checkout-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  background: white;
  padding: 3rem 0;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;

  .page-title {
    font-size: 2.5rem;
    font-weight: 300;
    color: $text-dark;
    margin: 0 0 0.5rem 0;
    letter-spacing: 0.05em;
  }

  .page-subtitle {
    font-size: 1.125rem;
    color: #666;
    margin: 0;
    font-weight: 300;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;
  padding: 3rem 0;
}

.checkout-form-section {
  background: white;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.form-section {
  margin-bottom: 2.5rem;

  .section-title {
    font-size: 1.25rem;
    font-weight: 300;
    color: $text-dark;
    margin: 0 0 1.5rem 0;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 0.75rem;
  }
}

.form-group {
  margin-bottom: 1.5rem;

  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 300;
    color: $text-dark;
    margin-bottom: 0.5rem;
    letter-spacing: 0.02em;
  }

  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 300;
    color: $text-dark;
    transition: all 0.3s ease;
    background: white;

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
    }

    &::placeholder {
      color: #999;
      font-weight: 300;
    }
  }

  .form-textarea {
    resize: vertical;
    min-height: 100px;
  }
}

.delivery-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.delivery-option {
  position: relative;

  .delivery-radio {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .delivery-label {
    display: block;
    padding: 1.5rem;
    border: 2px solid #e5e5e5;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: white;

    &:hover {
      border-color: $primary-color;
    }
  }

  .delivery-radio:checked + .delivery-label {
    border-color: $primary-color;
    background: rgba($primary-color, 0.05);
  }

  .delivery-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    .delivery-name {
      font-size: 1rem;
      font-weight: 300;
      color: $text-dark;
      letter-spacing: 0.02em;
    }

    .delivery-price {
      font-size: 1.125rem;
      font-weight: 300;
      color: $primary-color;
      letter-spacing: 0.02em;
    }
  }

  .delivery-description {
    font-size: 0.875rem;
    color: #666;
    margin: 0;
    font-weight: 300;
  }
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e5e5;

  .back-btn,
  .submit-btn {
    flex: 1;
    padding: 1rem 2rem;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.05em;
  }

  .back-btn {
    background: transparent;
    color: $text-dark;
    border: 1px solid #ddd;

    &:hover {
      border-color: $primary-color;
      color: $primary-color;
    }
  }

  .submit-btn {
    background: $primary-color;
    color: white;
    border: none;

    &:hover:not(:disabled) {
      background: darken($primary-color, 10%);
      transform: translateY(-2px);
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }
  }
}

.order-summary-section {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

.order-summary {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.summary-title {
  font-size: 1.25rem;
  font-weight: 300;
  color: $text-dark;
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 0.75rem;
}

.order-items {
  margin-bottom: 2rem;
}

.order-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .item-image {
    width: 60px;
    height: 60px;
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
      font-size: 0.875rem;
      font-weight: 300;
      color: $text-dark;
      margin: 0 0 0.25rem 0;
      letter-spacing: 0.02em;
      line-height: 1.4;
    }

    .item-category {
      font-size: 0.75rem;
      color: $text-gold;
      margin: 0 0 0.25rem 0;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 300;
    }

    .item-quantity {
      font-size: 0.75rem;
      color: #666;
      margin: 0 0 0.25rem 0;
      font-weight: 300;
    }

    .item-price {
      font-size: 0.875rem;
      font-weight: 300;
      color: $text-dark;
      letter-spacing: 0.02em;
    }
  }
}

.price-summary {
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

// 響應式設計
@media (max-width: 1024px) {
  .checkout-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .order-summary-section {
    position: static;
  }
}

// 手機版和桌面版顯示控制
.mobile-only {
  display: none;
}

.desktop-only {
  display: block;
}

@media (max-width: 768px) {
  .mobile-only {
    display: block;
  }
  
  .desktop-only {
    display: none;
  }
  
  .checkout-content {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .checkout-form-section {
    padding: 1.5rem;
  }

  .order-summary {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;

    .back-btn,
    .submit-btn {
      flex: none;
    }
  }
}
</style>
