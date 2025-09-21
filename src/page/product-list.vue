<template>
  <div class="product-list-page">
    <!-- Header -->
    <Header />

    <!-- 商品列表主要內容 -->
    <main class="product-list-main">
      <!-- 頁面標題 -->
      <section class="page-header">
        <div class="container">
          <h1 class="page-title">商品列表</h1>
          <p class="page-subtitle">探索我們的精選珠寶首飾</p>
        </div>
      </section>

      <!-- 篩選和排序區域 -->
      <section class="filter-section">
        <div class="container">
          <div class="filter-controls">
            <!-- 分類篩選 -->
            <div class="filter-group">
              <label class="filter-label">商品分類</label>
              <select v-model="selectedCategory" @change="filterProducts" class="filter-select">
                <option value="">全部商品</option>
                <option value="necklace">項鍊</option>
                <option value="bracelet">手鍊</option>
                <option value="ring">戒指</option>
                <option value="earring">耳環</option>
                <option value="anklet">手腳鍊</option>
              </select>
            </div>

            <!-- 價格篩選 -->
            <div class="filter-group">
              <label class="filter-label">價格範圍</label>
              <select v-model="selectedPriceRange" @change="filterProducts" class="filter-select">
                <option value="">全部價格</option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-3000">$1,000 - $3,000</option>
                <option value="3000-5000">$3,000 - $5,000</option>
                <option value="5000+">$5,000 以上</option>
              </select>
            </div>

            <!-- 排序 -->
            <div class="filter-group">
              <label class="filter-label">排序方式</label>
              <select v-model="sortBy" @change="sortProducts" class="filter-select">
                <option value="newest">最新上架</option>
                <option value="price-low">價格由低到高</option>
                <option value="price-high">價格由高到低</option>
                <option value="name">商品名稱</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- 商品網格 -->
      <section class="products-section">
        <div class="container">
          <div class="products-grid">
            <div 
              v-for="product in filteredProducts" 
              :key="product.id" 
              class="product-card"
              @click="viewProduct(product)"
            >
              <div class="product-image-container">
                <img :src="product.image" :alt="product.name" class="product-image">
                <div class="product-overlay">
                  <button class="add-to-cart-btn" @click.stop="addToCart(product)">
                    <i class="pi pi-shopping-cart"></i>
                    加入購物車
                  </button>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-category">{{ product.category }}</p>
                <div class="product-price">
                  <span class="current-price">${{ product.price.toLocaleString() }}</span>
                  <span v-if="product.originalPrice" class="original-price">${{ product.originalPrice.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 無商品時顯示 -->
          <div v-if="filteredProducts.length === 0" class="no-products">
            <i class="pi pi-search"></i>
            <h3>找不到符合條件的商品</h3>
            <p>請嘗試調整篩選條件</p>
          </div>
        </div>
      </section>
    </main>

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

// 導入商品圖片
import product1Image from '../assets/img/02.banner/CHN0079-1.jpg'
import product2Image from '../assets/img/02.banner/mama1.jpg'
import product3Image from '../assets/img/02.banner/R1004-1.jpg'
import product4Image from '../assets/img/02.banner/CHN0079-2.jpg'
import product5Image from '../assets/img/02.banner/BRJ1053 model.jpg'
import product6Image from '../assets/img/02.banner/BRJ9080.jpg'

// 篩選和排序狀態
const selectedCategory = ref('')
const selectedPriceRange = ref('')
const sortBy = ref('newest')

// 商品數據
const products = ref([
  {
    id: 1,
    name: '精緻鑽石項鍊',
    category: '項鍊',
    price: 2500,
    originalPrice: 3000,
    image: product1Image,
    description: '優雅精緻的鑽石項鍊，完美展現女性魅力',
    inStock: true
  },
  {
    id: 2,
    name: '珍珠手鍊',
    category: '手鍊',
    price: 1200,
    image: product2Image,
    description: '經典珍珠手鍊，適合日常佩戴',
    inStock: true
  },
  {
    id: 3,
    name: '時尚戒指',
    category: '戒指',
    price: 800,
    image: product3Image,
    description: '簡約時尚的戒指設計',
    inStock: true
  },
  {
    id: 4,
    name: '優雅耳環',
    category: '耳環',
    price: 600,
    image: product4Image,
    description: '精緻優雅的耳環，增添女性氣質',
    inStock: true
  },
  {
    id: 5,
    name: '精緻手腳鍊',
    category: '手腳鍊',
    price: 900,
    image: product5Image,
    description: '精美的手腳鍊，展現獨特品味',
    inStock: true
  },
  {
    id: 6,
    name: '精選商品',
    category: '精選商品',
    price: 1500,
    originalPrice: 2000,
    image: product6Image,
    description: '精選特惠商品，限時優惠',
    inStock: true
  }
])

// 篩選後的商品
const filteredProducts = computed(() => {
  let filtered = products.value

  // 分類篩選
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // 價格篩選
  if (selectedPriceRange.value) {
    const [min, max] = selectedPriceRange.value.split('-').map(Number)
    filtered = filtered.filter(product => {
      if (max) {
        return product.price >= min && product.price <= max
      } else {
        return product.price >= min
      }
    })
  }

  // 排序
  switch (sortBy.value) {
    case 'price-low':
      filtered = [...filtered].sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      filtered = [...filtered].sort((a, b) => b.price - a.price)
      break
    case 'name':
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'newest':
    default:
      // 保持原始順序
      break
  }

  return filtered
})

// 篩選商品
const filterProducts = () => {
  // 篩選邏輯在 computed 中處理
}

// 排序商品
const sortProducts = () => {
  // 排序邏輯在 computed 中處理
}

// 查看商品詳情
const viewProduct = (product) => {
  router.push(`/product/${product.id}`)
}

// 加入購物車
const addToCart = (product) => {
  console.log('加入購物車:', product.name)
  // 這裡可以實現加入購物車的邏輯
}

onMounted(() => {
  // 組件掛載後的初始化邏輯
})
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.product-list-page {
  min-height: 100vh;
  background: #f8f9fa;
}


// 頁面標題區域
.page-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 4rem 0;
  text-align: center;
  border-bottom: 1px solid #e9ecef;

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2rem;
    font-weight: 300;
    color: $text-dark;
    margin: 0 0 1rem 0;
    letter-spacing: 0.05em;
  }

  .page-subtitle {
    font-size: 0.875rem;
    color: $text-gold;
    margin: 0;
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
}

// 篩選區域
.filter-section {
  background: white;
  padding: 2rem 0;
  border-bottom: 1px solid #e9ecef;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .filter-controls {
    display: flex;
    gap: 2rem;
    align-items: end;
    flex-wrap: wrap;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: $text-dark;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .filter-select {
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    font-size: 0.875rem;
    color: $text-dark;
    min-width: 150px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }
}

// 商品區域
.products-section {
  padding: 3rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);

  .container {
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
}

// 商品卡片
.product-card {
  background: white;
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

    .product-overlay {
      opacity: 1;
    }
  }
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  background: #fafafa;

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    .add-to-cart-btn {
      background: rgba(255, 255, 255, 0.9);
      color: $text-dark;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0;
      font-weight: 300;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-size: 0.875rem;

      &:hover {
        background: $primary-color;
        color: white;
        transform: translateY(-1px);
      }
    }
  }
}

.product-info {
  padding: 1.5rem;
  text-align: center;

  .product-name {
    font-size: 1rem;
    font-weight: 300;
    color: $text-dark;
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
    letter-spacing: 0.05em;
  }

  .product-category {
    font-size: 0.75rem;
    color: $text-gold;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 300;
  }

  .product-price {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 0;

    .current-price {
      font-size: 1.25rem;
      font-weight: 300;
      color: $text-dark;
      letter-spacing: 0.05em;
    }

    .original-price {
      font-size: 0.875rem;
      color: #999;
      text-decoration: line-through;
      font-weight: 300;
    }
  }
}

// 無商品狀態
.no-products {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;

  i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ddd;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
    color: $text-dark;
  }

  p {
    margin: 0;
    color: #999;
  }
}

// 響應式設計
@media screen and (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

@media screen and (max-width: 768px) {
  .page-header {
    padding: 2rem 0;

    .page-title {
      font-size: 1.75rem;
    }
  }

  .filter-controls {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .filter-group {
    width: 100%;
  }

  .filter-select {
    min-width: auto;
    width: 100%;
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
