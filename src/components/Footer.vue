<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            <img :src="logoImage" alt="妝飾" class="logo-img">
            <span class="logo-text">妝飾</span>
          </div>
          <p class="footer-description">
            專業飾品品牌，為您提供優質的珠寶首飾選擇
          </p>
        </div>
        <div class="footer-section">
          <h4 class="footer-title">客戶服務</h4>
          <ul class="footer-links">
            <li><a href="#shipping">運送資訊</a></li>
            <li><a href="#returns">退換貨政策</a></li>
            <li><a href="#returns">尺寸指南</a></li>
            <li><a href="#returns">保養說明</a></li>
            <li><a href="#returns">保固服務</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4 class="footer-title">關於我們</h4>
          <ul class="footer-links">
            <li><a href="">品牌聯絡人：Wendy</a></li>
            <li><a href="">聯絡電話：0983533891</a></li>
            <li><a href="">電子信箱：wendychen1988@gmail.com</a></li>
            <li><a href="">營業時間：週一至週五 10:00-18:00</a></li>
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
        <p>Copyright © 2025 JhuangShih All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 導入圖片資源
import logoImage from '../assets/img/01.logo/logo.png'
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

// 頁腳樣式
.footer {
  background: $text-dark;
  color: white;
  padding: 60px 0px 20px;
  
  .footer-content {
    margin: 0 auto;
    padding: 0 100px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $spacing-xxl;
    margin-bottom: $spacing-xxl;
  }
  
  .footer-section {
    .footer-logo {
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
  .footer {
    .footer-content {
      grid-template-columns: 1fr;
      gap: $spacing-xl;
      padding: 0 20px;
    }
  }
}
</style>
