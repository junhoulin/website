<template>
  <div class="contact-page">
    <!-- Header -->
    <Header />

    <!-- 聯絡我們主要內容 -->
    <main class="contact-main">
      <!-- 頁面標題 -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title">聯絡我們</h1>
          <p class="page-subtitle">我們很樂意為您提供協助</p>
        </div>
      </section>

      <!-- 聯絡資訊 -->
      <section class="contact-info-section">
        <div class="container">
          <div class="contact-grid">
            <!-- 聯絡方式 -->
            <div class="contact-methods">
              <h2 class="section-title">聯絡方式</h2>
              <div class="contact-list">
                <div class="contact-item">
                  <i class="pi pi-phone"></i>
                  <div class="contact-details">
                    <h3>電話</h3>
                    <p>0983533891</p>
                    <span>24小時內回覆</span>
                  </div>
                </div>
                <div class="contact-item">
                  <i class="pi pi-envelope"></i>
                  <div class="contact-details">
                    <h3>信箱</h3>
                    <p>wendychen1988@gmail.com</p>
                    <span>24小時內回覆</span>
                  </div>
                </div>
                <div class="contact-item">
                  <i class="pi pi-clock"></i>
                  <div class="contact-details">
                    <h3>營業時間</h3>
                    <p>週一至週五 10:00-18:00</p>
                    <span>24小時內回覆</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 聯絡表單 -->
            <div class="contact-form-container">
              <h2 class="section-title">聯絡表單</h2>
              <form @submit.prevent="submitForm" class="contact-form">
                <div class="form-group">
                  <label for="name">姓名 *</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    required
                    class="form-input"
                    placeholder="請輸入您的姓名"
                  >
                </div>
                <div class="form-group">
                  <label for="email">信箱 *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    required
                    class="form-input"
                    placeholder="請輸入您的信箱"
                  >
                </div>
                <div class="form-group">
                  <label for="phone">電話</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="form.phone" 
                    class="form-input"
                    placeholder="請輸入您的電話"
                  >
                </div>
                <div class="form-group">
                  <label for="subject">主旨 *</label>
                  <select 
                    id="subject" 
                    v-model="form.subject" 
                    required
                    class="form-select"
                  >
                    <option value="">請選擇主旨</option>
                    <option value="product">商品詢問</option>
                    <option value="order">訂單問題</option>
                    <option value="wholesale">批發合作</option>
                    <option value="other">其他問題</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="message">訊息 *</label>
                  <textarea 
                    id="message" 
                    v-model="form.message" 
                    required
                    class="form-textarea"
                    placeholder="請輸入您的訊息"
                    rows="5"
                  ></textarea>
                </div>
                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <i v-if="isSubmitting" class="pi pi-spin pi-spinner"></i>
                  {{ isSubmitting ? '送出中...' : '送出訊息' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- 常見問題 -->
      <!-- <section class="faq-section">
        <div class="container">
          <h2 class="section-title">常見問題</h2>
          <div class="faq-list">
            <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
              <button 
                class="faq-question" 
                @click="toggleFaq(index)"
                :class="{ active: activeFaq === index }"
              >
                <span>{{ faq.question }}</span>
                <i class="pi pi-chevron-down"></i>
              </button>
              <div 
                class="faq-answer" 
                :class="{ active: activeFaq === index }"
              >
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section> -->

      <!-- 地圖 -->
      <!-- <section class="map-section">
        <div class="container">
          <h2 class="section-title">位置資訊</h2>
          <div class="map-container">
            <div class="map-placeholder">
              <i class="pi pi-map"></i>
              <p>地圖位置</p>
              <span>台北市信義區信義路五段7號 101大樓 35樓</span>
            </div>
          </div>
        </div>
      </section> -->
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

// 表單數據
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

// FAQ 數據
const faqs = ref([
  {
    question: '如何下單購買商品？',
    answer: '您可以透過我們的網站瀏覽商品，選擇喜歡的商品後加入購物車，然後按照結帳流程完成訂單。'
  },
  {
    question: '運費如何計算？',
    answer: '台灣本島運費為新台幣100元，滿3000元免運費。外島地區運費另計，詳情請聯絡客服。'
  },
  {
    question: '商品有保固嗎？',
    answer: '我們提供一年保固服務，如有任何品質問題，請聯絡客服處理。'
  },
  {
    question: '可以退換貨嗎？',
    answer: '商品到貨後7天內，如未使用且包裝完整，可申請退換貨。'
  },
  {
    question: '如何聯絡客服？',
    answer: '您可以透過電話、信箱或線上表單聯絡我們，我們會在24小時內回覆。'
  }
])

const activeFaq = ref(null)

// 切換 FAQ
const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

// 提交表單
const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // 這裡可以添加實際的表單提交邏輯
    console.log('表單提交:', form.value)
    
    // 模擬 API 請求
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 重置表單
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
    
    alert('訊息已成功送出！我們會盡快回覆您。')
  } catch (error) {
    console.error('提交失敗:', error)
    alert('提交失敗，請稍後再試。')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.contact-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// 頁面標題
.page-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 4rem 0;
  text-align: center;
  border-bottom: 1px solid #e9ecef;

  .page-title {
    font-size: 2.5rem;
    font-weight: 300;
    color: $text-dark;
    margin: 0 0 1rem 0;
    letter-spacing: 0.05em;
  }

  .page-subtitle {
    font-size: 1rem;
    color: $text-gold;
    margin: 0;
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
}

// 區塊標題
.section-title {
  font-size: 2rem;
  font-weight: 300;
  color: $text-dark;
  text-align: center;
  margin: 0 0 3rem 0;
  letter-spacing: 0.05em;
}

// 聯絡資訊區域
.contact-info-section {
  padding: 4rem 0;
  background: white;

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

// 聯絡方式
.contact-methods {
  .contact-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    i {
      font-size: 1.5rem;
      color: $primary-color;
      margin-top: 0.25rem;
    }

    .contact-details {
      h3 {
        font-size: 1.125rem;
        font-weight: 500;
        color: $text-dark;
        margin: 0 0 0.5rem 0;
      }

      p {
        font-size: 1rem;
        color: $text-dark;
        margin: 0 0 0.25rem 0;
        font-weight: 500;
      }

      span {
        font-size: 0.875rem;
        color: #666;
      }
    }
  }
}

// 聯絡表單
.contact-form-container {
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: $text-dark;
    }

    .form-input,
    .form-select,
    .form-textarea {
      padding: 0.75rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      color: $text-dark;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: $primary-color;
      }

      &::placeholder {
        color: #999;
      }
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }
  }

  .submit-btn {
    background: $primary-color;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover:not(:disabled) {
      background: darken($primary-color, 10%);
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

// 常見問題
.faq-section {
  padding: 4rem 0;
  background: #f8f9fa;

  .faq-list {
    max-width: 800px;
    margin: 0 auto;
  }

  .faq-item {
    margin-bottom: 1rem;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .faq-question {
      width: 100%;
      padding: 1.5rem;
      background: white;
      border: none;
      text-align: left;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.125rem;
      font-weight: 500;
      color: $text-dark;
      transition: all 0.3s ease;

      &:hover {
        background: #f8f9fa;
      }

      &.active {
        background: $primary-color;
        color: white;

        i {
          transform: rotate(180deg);
        }
      }

      i {
        transition: transform 0.3s ease;
      }
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;

      &.active {
        max-height: 200px;
      }

      p {
        padding: 0 1.5rem 1.5rem;
        margin: 0;
        color: #666;
        line-height: 1.6;
      }
    }
  }
}

// 地圖區域
.map-section {
  padding: 4rem 0;
  background: white;

  .map-container {
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    .map-placeholder {
      height: 100%;
      background: #f8f9fa;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #666;

      i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #ddd;
      }

      p {
        font-size: 1.25rem;
        margin: 0 0 0.5rem 0;
        font-weight: 500;
      }

      span {
        font-size: 0.875rem;
      }
    }
  }
}

// 響應式設計
@media (max-width: 768px) {
  .page-header {
    padding: 2rem 0;

    .page-title {
      font-size: 2rem;
    }
  }

  .section-title {
    font-size: 1.75rem;
  }

  .contact-info-section {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .contact-methods {
    .contact-list {
      gap: 1rem;
    }

    .contact-item {
      padding: 1rem;
    }
  }
}
</style>
