<template>
  <div class="wholesale-page">
    <!-- Header -->
    <Header />

    <!-- 批發專區主要內容 -->
    <main class="wholesale-main">
      <!-- 頁面標題 -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title">批發專區</h1>
          <p class="page-subtitle">專業批發服務，為您的業務提供優質珠寶首飾</p>
        </div>
      </section>

      <!-- 批發優勢 -->
      <section class="advantages-section">
        <div class="container">
          <h2 class="section-title">批發優勢</h2>
          <div class="advantages-grid">
            <div class="advantage-card">
              <i class="pi pi-percentage"></i>
              <h3>優惠價格</h3>
              <p>批發價格優惠，量大更優惠</p>
            </div>
            <div class="advantage-card">
              <i class="pi pi-truck"></i>
              <h3>快速配送</h3>
              <p>專業物流配送，快速到貨</p>
            </div>
            <div class="advantage-card">
              <i class="pi pi-shield"></i>
              <h3>品質保證</h3>
              <p>嚴格品質控制，確保商品品質</p>
            </div>
            <div class="advantage-card">
              <i class="pi pi-headphones"></i>
              <h3>專業服務</h3>
              <p>專屬客服團隊，提供專業服務</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 批發流程 -->
      <section class="process-section">
        <div class="container">
          <h2 class="section-title">批發流程</h2>
          <div class="process-steps">
            <div class="step">
              <div class="step-number">1</div>
              <h3>註冊帳號</h3>
              <p>填寫批發商資料，完成註冊</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <h3>選擇商品</h3>
              <p>瀏覽商品目錄，選擇所需商品</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <h3>下單採購</h3>
              <p>確認訂單，完成付款</p>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <h3>快速出貨</h3>
              <p>商品包裝出貨，快速配送</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 聯絡資訊 -->
      <section class="contact-section">
        <div class="container">
          <h2 class="section-title">聯絡我們</h2>
          <div class="contact-info">
            <div class="contact-item">
              <i class="pi pi-phone"></i>
              <div>
                <h3>電話</h3>
                <p>+886-2-1234-5678</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="pi pi-envelope"></i>
              <div>
                <h3>信箱</h3>
                <p>wholesale@jhuangshih.com</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="pi pi-clock"></i>
              <div>
                <h3>營業時間</h3>
                <p>週一至週五 9:00-18:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.wholesale-page {
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

// 批發優勢
.advantages-section {
  padding: 4rem 0;
  background: white;

  .advantages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .advantage-card {
    text-align: center;
    padding: 2rem;
    border-radius: 8px;
    background: #f8f9fa;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    i {
      font-size: 3rem;
      color: $primary-color;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 500;
      color: $text-dark;
      margin: 0 0 1rem 0;
    }

    p {
      color: #666;
      margin: 0;
      line-height: 1.6;
    }
  }
}

// 批發流程
.process-section {
  padding: 4rem 0;
  background: #f8f9fa;

  .process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .step {
    text-align: center;
    padding: 2rem;

    .step-number {
      width: 60px;
      height: 60px;
      background: $primary-color;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 auto 1.5rem auto;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 500;
      color: $text-dark;
      margin: 0 0 1rem 0;
    }

    p {
      color: #666;
      margin: 0;
      line-height: 1.6;
    }
  }
}

// 聯絡資訊
.contact-section {
  padding: 4rem 0;
  background: white;

  .contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
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
      font-size: 2rem;
      color: $primary-color;
    }

    h3 {
      font-size: 1.125rem;
      font-weight: 500;
      color: $text-dark;
      margin: 0 0 0.5rem 0;
    }

    p {
      color: #666;
      margin: 0;
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

  .advantages-grid,
  .process-steps {
    grid-template-columns: 1fr;
  }

  .contact-info {
    grid-template-columns: 1fr;
  }
}
</style>
