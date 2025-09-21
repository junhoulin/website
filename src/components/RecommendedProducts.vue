<template>
  <section class="recommended-products">
    <!-- 標題區域 -->
    <div class="recommended-header">
      <h2 class="recommended-title">推薦商品</h2>
      <p class="recommended-subtitle">精選熱門商品，為您推薦</p>
    </div>
    
    <!-- 商品網格區域 -->
    <div class="products-grid-container">
      <div class="products-grid">
        <div 
          v-for="(product, index) in products" 
          :key="index" 
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <div class="product-image-container">
            <img :src="product.image" :alt="product.name" class="product-image">
            <div class="product-overlay">
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-category">{{ product.category }}</p>
                <div class="product-price">
                  <span class="current-price">NT$ {{ product.price.toLocaleString() }}</span>
                  <span v-if="product.originalPrice" class="original-price">NT$ {{ product.originalPrice.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 查看更多按鈕 -->
    <div class="view-more-container">
      <button class="view-more-btn" @click="goToShop">
        查看更多商品
        <span class="arrow">→</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 導入圖片資源
import product1Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/111/111a.webp'
import product2Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/112/112a.webp'
import product3Image from '../assets/img/04.商品圖片/100項鍊/120鍊式項鍊/121/121a.webp'
import product4Image from '../assets/img/04.商品圖片/100項鍊/150扣環項鍊/151/151a.webp'

const router = useRouter()

// 推薦商品數據
const products = ref([
  {
    id: 1,
    name: '三戴式18K金 PVD不鏽鋼星月吊飾可轉換項鍊',
    category: '項鍊',
    price: 1800,
    image: product1Image
  },
  {
    id: 2,
    name: '18K 金 PVD 不鏽鋼珍珠與圓片疊戴吊飾項鍊',
    category: '項鍊',
    price: 650,
    image: product2Image
  },
  {
    id: 3,
    name: '不鏽鋼 Figaro 鍊條項鍊 ',
    category: '項鍊',
    price: 450,
    image: product3Image
  },
  {
    id: 4,
    name: '18K金PVD不鏽鋼愛心吊飾扣頭迴紋針項鍊',
    category: '項鍊',
    price: 1300,
    image: product4Image
  }
])

// 跳轉到商品詳情
const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

// 跳轉到商店頁面
const goToShop = () => {
  router.push('/shop')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables' as *;

.recommended-products {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.recommended-header {
  max-width: 1400px;
  margin: 0 auto 3rem auto;
  padding: 0 1rem;
  text-align: center;
}

.recommended-title {
  font-size: 2.5rem;
  font-weight: 300;
  color: $text-dark;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  letter-spacing: 0.05em;
}

.recommended-subtitle {
  font-size: 0.875rem;
  color: $text-gold;
  margin: 0;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

// 網格容器
.products-grid-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
}

.product-card {
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

    .product-image {
      transform: scale(1.02);
    }
  }
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  background: #fafafa;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  opacity: 1;
}

.product-info {
  text-align: center;
}

.product-name {
  font-size: 1rem;
  font-weight: 300;
  color: white;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  letter-spacing: 0.05em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.product-category {
  font-size: 0.75rem;
  color: $text-gold;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 300;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.product-price {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0;
}

.current-price {
  font-size: 1.25rem;
  font-weight: 300;
  color: white;
  letter-spacing: 0.05em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.original-price {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: line-through;
  font-weight: 300;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}


.view-more-container {
  text-align: center;
  margin-top: 3rem;
}

.view-more-btn {
  background: transparent;
  border: 1px solid $primary-color;
  color: $primary-color;
  padding: 0.875rem 2rem;
  border-radius: 0;
  font-size: 0.875rem;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  &:hover {
    background: $primary-color;
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .arrow {
      transform: translateX(4px);
    }
  }
}

.arrow {
  transition: transform 0.3s ease;
  font-size: 1rem;
  font-weight: 300;
}

// 響應式設計
@media screen and (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

@media screen and (max-width: 768px) {
  .recommended-title {
    font-size: 2rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .product-image-container {
    height: 280px;
  }
}

@media screen and (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .product-image-container {
    height: 250px;
  }
}
</style>
