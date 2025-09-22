<template>
  <div class="brand-page">
    <!-- Header -->
    <Header />

    <!-- 品牌故事主要內容 -->
    <main class="brand-main">
      <!-- 頁面標題 -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title">品牌故事</h1>
          <p class="page-subtitle">探索妝飾的品牌故事與理念</p>
        </div>
      </section>

      <!-- 品牌故事 -->
      <section class="brand-story-section">
        <div class="container">
          <div class="story-content">
            <!-- 手機版：圖片顯示在上方 -->
            <div class="story-image mobile-only">
              <img src="../assets/img/01.logo/logo.png" alt="品牌故事" class="brand-image">
            </div>
            
            <div class="story-text">
              <p class="story-description">
                「妝飾」始於一份對「美」的執著。
              </p>
              <p class="story-description">
                我們致力從美國引進設計獨特、做工精良的飾品，只因我們相信，一件好的飾品，擁有點亮平凡日常的魔力。
              </p>
              <p class="story-description">
                對我們而言，飾品是您風格的最後一塊拼圖，也是自信的隱形來源。它無需喧嘩，便能悄悄訴說您的品味與講究；它細緻點綴，讓每一個上班日、每一次約會，都因這份精心而變得更加期待。
              </p>
              <p class="story-description">
                「妝飾」精選的每一件作品，都承載著讓您「更喜歡自己」的期待。我們期盼成為您信賴的夥伴，在您追求美好生活的路上，用恰到好處的點綴，為您的獨特風格與生活態度，留下最閃亮的註腳。
              </p>
            </div>
            
            <!-- 桌面版：圖片顯示在右側 -->
            <div class="story-image desktop-only">
              <img src="../assets/img/01.logo/logo.png" alt="品牌故事" class="brand-image">
            </div>
          </div>
        </div>
      </section>

      <!-- 品牌理念 -->
      <section class="brand-values-section">
        <div class="container">
          <h2 class="section-title">品牌理念</h2>
          <div class="values-grid">
            <div class="value-card">
              <i class="pi pi-heart"></i>
              <h3>精緻工藝</h3>
              <p>每一件珠寶都經過精心設計與製作，追求完美的細節與品質</p>
            </div>
            <div class="value-card">
              <i class="pi pi-star"></i>
              <h3>優雅設計</h3>
              <p>融合經典與現代元素，創造出永不過時的優雅設計</p>
            </div>
            <div class="value-card">
              <i class="pi pi-shield"></i>
              <h3>品質保證</h3>
              <p>嚴格的材料選擇與品質控制，確保每一件作品的卓越品質</p>
            </div>
            <div class="value-card">
              <i class="pi pi-users"></i>
              <h3>客戶至上</h3>
              <p>以客戶需求為中心，提供專業的服務與滿意的購物體驗</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 品牌歷程 -->
      <section class="brand-timeline-section">
        <div class="container">
          <h2 class="section-title">品牌歷程</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-year">2020</div>
              <div class="timeline-content">
                <h3>品牌成立</h3>
                <p>妝飾品牌正式成立，開始為客戶提供精緻珠寶首飾</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2021</div>
              <div class="timeline-content">
                <h3>產品線擴展</h3>
                <p>推出更多系列產品，包括項鍊、手鍊、戒指等完整產品線</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2022</div>
              <div class="timeline-content">
                <h3>線上平台</h3>
                <p>建立官方網站，提供更便捷的線上購物體驗</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2023</div>
              <div class="timeline-content">
                <h3>國際化發展</h3>
                <p>開始拓展海外市場，將優質產品帶給更多客戶</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-year">2024</div>
              <div class="timeline-content">
                <h3>創新突破</h3>
                <p>持續創新設計，推出更多符合現代女性需求的珠寶作品</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 品牌承諾 -->
      <!-- <section class="brand-commitment-section">
        <div class="container">
          <h2 class="section-title">品牌承諾</h2>
          <div class="commitment-content">
            <div class="commitment-text">
              <h3>我們的承諾</h3>
              <p>
                妝飾承諾為每一位客戶提供最優質的珠寶首飾與服務。
                我們相信珠寶不僅是裝飾品，更是表達個人風格與情感的重要媒介。
              </p>
              <ul class="commitment-list">
                <li>使用最優質的材料與工藝</li>
                <li>提供專業的設計與諮詢服務</li>
                <li>確保每一件作品的完美品質</li>
                <li>持續創新與改進產品設計</li>
                <li>為客戶提供滿意的購物體驗</li>
              </ul>
            </div>
            <div class="commitment-image">
              <img src="../assets/img/02.banner/mama1.jpg" alt="品牌承諾" class="brand-image">
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
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.brand-page {
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

// 品牌故事
.brand-story-section {
  padding: 4rem 0;
  background: white;

  .story-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .story-text {
    .section-title {
      text-align: left;
      margin-bottom: 2rem;
    }

    .story-description {
      font-size: 1.125rem;
      line-height: 1.8;
      color: #666;
      margin: 0 0 1.5rem 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .story-image {
    .brand-image {
      width: 100%;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
  }
}

// 品牌理念
.brand-values-section {
  padding: 4rem 0;
  background: #f8f9fa;

  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .value-card {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
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

// 品牌歷程
.brand-timeline-section {
  padding: 4rem 0;
  background: white;

  .timeline {
    max-width: 800px;
    margin: 0 auto;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: $primary-color;
      transform: translateX(-50%);
    }
  }

  .timeline-item {
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
    position: relative;

    &:nth-child(odd) {
      flex-direction: row;

      .timeline-year {
        margin-right: 2rem;
      }
    }

    &:nth-child(even) {
      flex-direction: row-reverse;

      .timeline-year {
        margin-left: 2rem;
      }
    }

    .timeline-year {
      background: $primary-color;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 50px;
      font-size: 1.125rem;
      font-weight: 600;
      min-width: 80px;
      text-align: center;
      position: relative;
      z-index: 2;
    }

    .timeline-content {
      background: #f8f9fa;
      padding: 2rem;
      border-radius: 8px;
      flex: 1;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      h3 {
        font-size: 1.25rem;
        font-weight: 500;
        color: $text-dark;
        margin: 0 0 0.5rem 0;
      }

      p {
        color: #666;
        margin: 0;
        line-height: 1.6;
      }
    }
  }
}

// 品牌承諾
.brand-commitment-section {
  padding: 4rem 0;
  background: #f8f9fa;

  .commitment-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .commitment-text {
    h3 {
      font-size: 1.5rem;
      font-weight: 500;
      color: $text-dark;
      margin: 0 0 1.5rem 0;
    }

    p {
      font-size: 1.125rem;
      line-height: 1.8;
      color: #666;
      margin: 0 0 2rem 0;
    }

    .commitment-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        padding: 0.5rem 0;
        color: #666;
        position: relative;
        padding-left: 1.5rem;

        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: $primary-color;
          font-weight: 600;
        }
      }
    }
  }

  .commitment-image {
    .brand-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
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

  .brand-story-section,
  .brand-commitment-section {
    .story-content,
    .commitment-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .story-text,
    .commitment-text {
      .section-title {
        text-align: center;
      }
    }
  }

  .brand-timeline-section {
    .timeline {
      &::before {
        left: 20px;
      }
    }

    .timeline-item {
      flex-direction: column !important;
      align-items: flex-start;
      padding-left: 3rem;

      .timeline-year {
        margin: 0 0 1rem 0;
        position: absolute;
        left: -40px;
      }

      .timeline-content {
        width: 100%;
      }
    }
  }

  .values-grid {
    grid-template-columns: 1fr;
  }
}
</style>
