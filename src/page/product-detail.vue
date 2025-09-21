<template>
  <div class="product-detail-page">
    <!-- Header -->
    <Header />

    <!-- 商品詳情主要內容 -->
    <main class="product-detail-main">
      <!-- 麵包屑導航 -->
      <section class="breadcrumb-section">
        <div class="container">
          <nav class="breadcrumb">
            <router-link to="/" class="breadcrumb-item">首頁</router-link>
            <span class="breadcrumb-separator">/</span>
            <router-link to="/product-list" class="breadcrumb-item">商品列表</router-link>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{{ product.name }}</span>
          </nav>
        </div>
      </section>

      <!-- 商品詳情區域 -->
      <section class="product-detail-section">
        <div class="container">
          <div class="product-detail-content">
            <!-- 商品圖片區域 -->
            <div class="product-images">
              <div class="main-image-container">
                <img :src="product.image" :alt="product.name" class="main-image">
              </div>
              <!-- 縮圖區域 -->
              <div class="thumbnail-gallery">
                <div 
                  v-for="(image, index) in product.images" 
                  :key="index"
                  class="thumbnail-item"
                  :class="{ active: selectedImageIndex === index }"
                  @click="selectImage(index)"
                >
                  <img :src="image" :alt="`${product.name} ${index + 1}`" class="thumbnail-image">
                </div>
              </div>
            </div>

            <!-- 商品資訊區域 -->
            <div class="product-info">
              <div class="product-header">
                <h1 class="product-title">{{ product.name }}</h1>
                <p class="product-category">{{ product.category }}</p>
              </div>

              <div class="product-price-section">
                <div class="price-container">
                  <span class="current-price">${{ product.price.toLocaleString() }}</span>
                  <span v-if="product.originalPrice" class="original-price">${{ product.originalPrice.toLocaleString() }}</span>
                </div>
                <div v-if="product.discount" class="discount-badge">
                  限時優惠 {{ product.discount }}% OFF
                </div>
              </div>

              <div class="product-description">
                <h3>商品描述</h3>
                <p>{{ product.description }}</p>
              </div>

              <!-- 商品選項 -->
              <div class="product-options">
                <div class="option-group" v-if="product.sizes && product.sizes.length > 0">
                  <label class="option-label">尺寸</label>
                  <div class="size-options">
                    <button 
                      v-for="size in product.sizes" 
                      :key="size"
                      class="size-option"
                      :class="{ selected: selectedSize === size }"
                      @click="selectSize(size)"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>

                <div class="option-group" v-if="product.colors && product.colors.length > 0">
                  <label class="option-label">顏色</label>
                  <div class="color-options">
                    <button 
                      v-for="color in product.colors" 
                      :key="color.name"
                      class="color-option"
                      :class="{ selected: selectedColor === color.name }"
                      :style="{ backgroundColor: color.value }"
                      @click="selectColor(color.name)"
                      :title="color.name"
                    ></button>
                  </div>
                </div>
              </div>

              <!-- 數量選擇 -->
              <div class="quantity-section">
                <label class="quantity-label">數量</label>
                <div class="quantity-controls">
                  <button class="quantity-btn" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                  <input 
                    v-model.number="quantity" 
                    type="number" 
                    min="1" 
                    max="99" 
                    class="quantity-input"
                  >
                  <button class="quantity-btn" @click="increaseQuantity" :disabled="quantity >= 99">+</button>
                </div>
              </div>

              <!-- 庫存狀態 -->
              <div class="stock-status">
                <span v-if="product.inStock" class="in-stock">
                  <i class="pi pi-check-circle"></i>
                  有庫存
                </span>
                <span v-else class="out-of-stock">
                  <i class="pi pi-times-circle"></i>
                  缺貨中
                </span>
              </div>

              <!-- 操作按鈕 -->
              <div class="product-actions">
                <button 
                  class="add-to-cart-btn"
                  :disabled="!product.inStock"
                  @click="addToCart"
                >
                  <i class="pi pi-shopping-cart"></i>
                  加入購物車
                </button>
                <button class="buy-now-btn" :disabled="!product.inStock">
                  立即購買
                </button>
              </div>

              <!-- 商品特色 -->
              <div class="product-features">
                <h3>商品特色</h3>
                <ul class="features-list">
                  <li v-for="feature in product.features" :key="feature">
                    <i class="pi pi-check"></i>
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 相關商品推薦 -->
      <!-- <section class="related-products-section">
        <div class="container">
          <h2 class="section-title">相關商品推薦</h2>
          <div class="related-products-grid">
            <div 
              v-for="relatedProduct in relatedProducts" 
              :key="relatedProduct.id"
              class="related-product-card"
              @click="goToProduct(relatedProduct.id)"
            >
              <div class="related-product-image">
                <img :src="relatedProduct.image" :alt="relatedProduct.name">
              </div>
              <div class="related-product-info">
                <h4 class="related-product-name">{{ relatedProduct.name }}</h4>
                <p class="related-product-price">${{ relatedProduct.price.toLocaleString() }}</p>
              </div>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

// 導入商品圖片
import product1Image from '../assets/img/02.banner/CHN0079-1.jpg'
import product2Image from '../assets/img/02.banner/mama1.jpg'
import product3Image from '../assets/img/02.banner/R1004-1.jpg'
import product4Image from '../assets/img/02.banner/CHN0079-2.jpg'
import product5Image from '../assets/img/02.banner/BRJ1053 model.jpg'
import product6Image from '../assets/img/02.banner/BRJ9080.jpg'

const route = useRoute()
const router = useRouter()

// 商品資料
const products = ref([
  {
    id: 1,
    name: '精緻鑽石項鍊',
    category: '項鍊',
    price: 2500,
    originalPrice: 3000,
    discount: 17,
    image: product1Image,
    images: [product1Image, product2Image, product3Image],
    description: '優雅精緻的鑽石項鍊，完美展現女性魅力。採用高品質鑽石，精工鑲嵌，每一顆鑽石都經過精心挑選，確保閃耀動人。適合各種場合佩戴，是您珠寶收藏中的必備單品。',
    inStock: true,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: '金色', value: '#D4AF37' },
      { name: '銀色', value: '#C0C0C0' },
      { name: '玫瑰金', value: '#E8B4B8' }
    ],
    features: [
      '高品質鑽石鑲嵌',
      '精工製作工藝',
      '多種尺寸選擇',
      '精美包裝禮盒',
      '終身保固服務'
    ]
  },
  {
    id: 2,
    name: '珍珠手鍊',
    category: '手鍊',
    price: 1200,
    image: product2Image,
    images: [product2Image, product1Image, product4Image],
    description: '經典珍珠手鍊，適合日常佩戴。選用優質珍珠，圓潤光澤，搭配精緻的鏈條設計，展現優雅氣質。',
    inStock: true,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: '白色', value: '#FFFFFF' },
      { name: '粉色', value: '#F8BBD9' }
    ],
    features: [
      '天然珍珠製作',
      '經典設計風格',
      '舒適佩戴體驗',
      '精美包裝'
    ]
  },
  {
    id: 3,
    name: '時尚戒指',
    category: '戒指',
    price: 800,
    image: product3Image,
    images: [product3Image, product5Image, product6Image],
    description: '簡約時尚的戒指設計，適合日常佩戴。精工製作，細節精緻，展現個人品味。',
    inStock: true,
    sizes: ['6', '7', '8', '9', '10'],
    colors: [
      { name: '金色', value: '#D4AF37' },
      { name: '銀色', value: '#C0C0C0' }
    ],
    features: [
      '簡約時尚設計',
      '多種尺寸選擇',
      '精工製作',
      '舒適佩戴'
    ]
  },
  {
    id: 4,
    name: '優雅耳環',
    category: '耳環',
    price: 600,
    image: product4Image,
    images: [product4Image, product2Image, product1Image],
    description: '精緻優雅的耳環，增添女性氣質。設計精美，適合各種場合佩戴。',
    inStock: false,
    sizes: ['均碼'],
    colors: [
      { name: '金色', value: '#D4AF37' },
      { name: '銀色', value: '#C0C0C0' }
    ],
    features: [
      '優雅設計',
      '精工製作',
      '舒適佩戴',
      '精美包裝'
    ]
  },
  {
    id: 5,
    name: '精緻手腳鍊',
    category: '手腳鍊',
    price: 900,
    image: product5Image,
    images: [product5Image, product3Image, product6Image],
    description: '精美的手腳鍊，展現獨特品味。設計精巧，適合日常佩戴。',
    inStock: true,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: '金色', value: '#D4AF37' },
      { name: '銀色', value: '#C0C0C0' }
    ],
    features: [
      '獨特設計',
      '精工製作',
      '多種尺寸',
      '舒適佩戴'
    ]
  },
  {
    id: 6,
    name: '精選商品',
    category: '精選商品',
    price: 1500,
    originalPrice: 2000,
    discount: 25,
    image: product6Image,
    images: [product6Image, product1Image, product3Image],
    description: '精選特惠商品，限時優惠。高品質材料，精工製作，性價比極高。',
    inStock: true,
    sizes: ['均碼'],
    colors: [
      { name: '金色', value: '#D4AF37' },
      { name: '銀色', value: '#C0C0C0' }
    ],
    features: [
      '限時特惠',
      '高品質材料',
      '精工製作',
      '精美包裝'
    ]
  }
])

// 當前商品
const product = computed(() => {
  const productId = parseInt(route.params.id)
  return products.value.find(p => p.id === productId) || products.value[0]
})

// 相關商品
const relatedProducts = computed(() => {
  return products.value
    .filter(p => p.id !== product.value.id && p.category === product.value.category)
    .slice(0, 4)
})

// 選中的圖片索引
const selectedImageIndex = ref(0)

// 選中的選項
const selectedSize = ref('')
const selectedColor = ref('')
const quantity = ref(1)

// 選擇圖片
const selectImage = (index) => {
  selectedImageIndex.value = index
}

// 選擇尺寸
const selectSize = (size) => {
  selectedSize.value = size
}

// 選擇顏色
const selectColor = (color) => {
  selectedColor.value = color
}

// 調整數量
const increaseQuantity = () => {
  if (quantity.value < 99) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// 加入購物車
const addToCart = () => {
  console.log('加入購物車:', {
    product: product.value.name,
    size: selectedSize.value,
    color: selectedColor.value,
    quantity: quantity.value
  })
  // 這裡可以實現加入購物車的邏輯
}

// 跳轉到商品
const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

onMounted(() => {
  // 初始化選項
  if (product.value.sizes && product.value.sizes.length > 0) {
    selectedSize.value = product.value.sizes[0]
  }
  if (product.value.colors && product.value.colors.length > 0) {
    selectedColor.value = product.value.colors[0].name
  }
})
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;

.product-detail-page {
  min-height: 100vh;
  background: #f8f9fa;
}

// 麵包屑導航
.breadcrumb-section {
  background: white;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;

    .breadcrumb-item {
      color: $text-gold;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: $primary-color;
      }
    }

    .breadcrumb-separator {
      color: #999;
    }

    .breadcrumb-current {
      color: $text-dark;
      font-weight: 500;
    }
  }
}

// 商品詳情區域
.product-detail-section {
  padding: 3rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .product-detail-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }
}

// 商品圖片區域
.product-images {
  .main-image-container {
    margin-bottom: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .main-image {
      width: 100%;
      height: 500px;
      object-fit: cover;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }
  }

  .thumbnail-gallery {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.5rem 0;

    .thumbnail-item {
      flex-shrink: 0;
      width: 80px;
      height: 80px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.3s ease;

      &.active {
        border-color: $primary-color;
      }

      &:hover {
        border-color: $text-gold;
      }

      .thumbnail-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

// 商品資訊區域
.product-info {
  .product-header {
    margin-bottom: 2rem;

    .product-title {
      font-size: 2rem;
      font-weight: 300;
      color: $text-dark;
      margin: 0 0 0.5rem 0;
      letter-spacing: 0.05em;
    }

    .product-category {
      font-size: 0.875rem;
      color: $text-gold;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 300;
    }
  }

  .product-price-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;

    .price-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .current-price {
        font-size: 2rem;
        font-weight: 300;
        color: $text-dark;
        letter-spacing: 0.05em;
      }

      .original-price {
        font-size: 1.25rem;
        color: #999;
        text-decoration: line-through;
        font-weight: 300;
      }
    }

    .discount-badge {
      background: $primary-color;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  .product-description {
    margin-bottom: 2rem;

    h3 {
      font-size: 1.125rem;
      font-weight: 300;
      color: $text-dark;
      margin: 0 0 1rem 0;
      letter-spacing: 0.05em;
    }

    p {
      color: #666;
      line-height: 1.6;
      margin: 0;
    }
  }

  .product-options {
    margin-bottom: 2rem;

    .option-group {
      margin-bottom: 1.5rem;

      .option-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: $text-dark;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .size-options {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;

        .size-option {
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          background: white;
          color: $text-dark;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.875rem;
          min-width: 40px;
          text-align: center;

          &:hover {
            border-color: $text-gold;
          }

          &.selected {
            border-color: $primary-color;
            background: $primary-color;
            color: white;
          }
        }
      }

      .color-options {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;

        .color-option {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #ddd;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            border-color: $text-gold;
            transform: scale(1.1);
          }

          &.selected {
            border-color: $primary-color;
            transform: scale(1.1);
          }
        }
      }
    }
  }

  .quantity-section {
    margin-bottom: 2rem;

    .quantity-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: $text-dark;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 0;

      .quantity-btn {
        width: 40px;
        height: 40px;
        border: 1px solid #ddd;
        background: white;
        color: $text-dark;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover:not(:disabled) {
          border-color: $primary-color;
          color: $primary-color;
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .quantity-input {
        width: 60px;
        height: 40px;
        border: 1px solid #ddd;
        border-left: none;
        border-right: none;
        text-align: center;
        font-size: 0.875rem;
        color: $text-dark;

        &:focus {
          outline: none;
          border-color: $primary-color;
        }
      }
    }
  }

  .stock-status {
    margin-bottom: 2rem;

    .in-stock {
      color: #28a745;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      i {
        font-size: 1rem;
      }
    }

    .out-of-stock {
      color: #dc3545;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      i {
        font-size: 1rem;
      }
    }
  }

  .product-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;

    .add-to-cart-btn {
      flex: 1;
      background: $primary-color;
      color: white;
      border: none;
      padding: 1rem 2rem;
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

      &:hover:not(:disabled) {
        background: darken($primary-color, 10%);
        transform: translateY(-1px);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .buy-now-btn {
      flex: 1;
      background: transparent;
      color: $primary-color;
      border: 1px solid $primary-color;
      padding: 1rem 2rem;
      border-radius: 0;
      font-weight: 300;
      cursor: pointer;
      transition: all 0.3s ease;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-size: 0.875rem;

      &:hover:not(:disabled) {
        background: $primary-color;
        color: white;
        transform: translateY(-1px);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  .product-features {
    h3 {
      font-size: 1.125rem;
      font-weight: 300;
      color: $text-dark;
      margin: 0 0 1rem 0;
      letter-spacing: 0.05em;
    }

    .features-list {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        color: #666;

        i {
          color: $primary-color;
          font-size: 0.875rem;
        }
      }
    }
  }
}

// 相關商品區域
.related-products-section {
  background: white;
  padding: 3rem 0;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: 300;
    color: $text-dark;
    margin: 0 0 2rem 0;
    text-align: center;
    letter-spacing: 0.05em;
  }

  .related-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .related-product-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .related-product-image {
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }

    &:hover .related-product-image img {
      transform: scale(1.05);
    }

    .related-product-info {
      padding: 1rem;

      .related-product-name {
        font-size: 0.875rem;
        font-weight: 300;
        color: $text-dark;
        margin: 0 0 0.5rem 0;
        line-height: 1.4;
      }

      .related-product-price {
        font-size: 1rem;
        font-weight: 300;
        color: $primary-color;
        margin: 0;
      }
    }
  }
}

// 響應式設計
@media screen and (max-width: 1024px) {
  .product-detail-content {
    gap: 3rem;
  }

  .product-images .main-image-container .main-image {
    height: 400px;
  }

  .product-info .product-header .product-title {
    font-size: 1.75rem;
  }

  .product-info .product-price-section .price-container .current-price {
    font-size: 1.75rem;
  }
}

@media screen and (max-width: 768px) {
  .breadcrumb-section {
    padding: 0.75rem 0;

    .container {
      padding: 0 0.75rem;
    }

    .breadcrumb {
      font-size: 0.75rem;
      flex-wrap: wrap;
    }
  }

  .product-detail-section {
    padding: 2rem 0;

    .container {
      padding: 0 0.75rem;
    }

    .product-detail-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .product-images {
    .main-image-container .main-image {
      height: 300px;
    }

    .thumbnail-gallery {
      .thumbnail-item {
        width: 60px;
        height: 60px;
      }
    }
  }

  .product-info {
    .product-header {
      margin-bottom: 1.5rem;

      .product-title {
        font-size: 1.5rem;
      }

      .product-category {
        font-size: 0.75rem;
      }
    }

    .product-price-section {
      margin-bottom: 1.5rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;

      .price-container .current-price {
        font-size: 1.5rem;
      }

      .discount-badge {
        font-size: 0.625rem;
        padding: 0.25rem 0.5rem;
      }
    }

    .product-description {
      margin-bottom: 1.5rem;

      h3 {
        font-size: 1rem;
      }

      p {
        font-size: 0.875rem;
      }
    }

    .product-options {
      margin-bottom: 1.5rem;

      .option-group {
        margin-bottom: 1rem;

        .option-label {
          font-size: 0.75rem;
        }

        .size-options .size-option {
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
          min-width: 35px;
        }

        .color-options .color-option {
          width: 28px;
          height: 28px;
        }
      }
    }

    .quantity-section {
      margin-bottom: 1.5rem;

      .quantity-label {
        font-size: 0.75rem;
      }

      .quantity-controls {
        .quantity-btn {
          width: 35px;
          height: 35px;
          font-size: 0.875rem;
        }

        .quantity-input {
          width: 50px;
          height: 35px;
          font-size: 0.75rem;
        }
      }
    }

    .stock-status {
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
    }

    .product-actions {
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 2rem;

      .add-to-cart-btn,
      .buy-now-btn {
        padding: 0.875rem 1.5rem;
        font-size: 0.75rem;
      }
    }

    .product-features {
      h3 {
        font-size: 1rem;
      }

      .features-list li {
        font-size: 0.875rem;
        margin-bottom: 0.375rem;
      }
    }
  }

  .related-products-section {
    padding: 2rem 0;

    .container {
      padding: 0 0.75rem;
    }

    .section-title {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .related-products-grid {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
    }

    .related-product-card {
      .related-product-image {
        height: 150px;
      }

      .related-product-info {
        padding: 0.75rem;

        .related-product-name {
          font-size: 0.75rem;
        }

        .related-product-price {
          font-size: 0.875rem;
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .breadcrumb-section {
    .breadcrumb {
      font-size: 0.625rem;
    }
  }

  .product-detail-section {
    padding: 1.5rem 0;

    .container {
      padding: 0 0.5rem;
    }
  }

  .product-images {
    .main-image-container .main-image {
      height: 250px;
    }

    .thumbnail-gallery {
      .thumbnail-item {
        width: 50px;
        height: 50px;
      }
    }
  }

  .product-info {
    .product-header .product-title {
      font-size: 1.25rem;
    }

    .product-price-section .price-container .current-price {
      font-size: 1.25rem;
    }

    .product-options {
      .size-options .size-option {
        padding: 0.25rem 0.5rem;
        font-size: 0.625rem;
        min-width: 30px;
      }

      .color-options .color-option {
        width: 24px;
        height: 24px;
      }
    }

    .quantity-controls {
      .quantity-btn {
        width: 30px;
        height: 30px;
        font-size: 0.75rem;
      }

      .quantity-input {
        width: 45px;
        height: 30px;
        font-size: 0.625rem;
      }
    }

    .product-actions {
      .add-to-cart-btn,
      .buy-now-btn {
        padding: 0.75rem 1rem;
        font-size: 0.625rem;
      }
    }
  }

  .related-products-section {
    padding: 1.5rem 0;

    .container {
      padding: 0 0.5rem;
    }

    .related-products-grid {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 0.75rem;
    }

    .related-product-card {
      .related-product-image {
        height: 120px;
      }

      .related-product-info {
        padding: 0.5rem;

        .related-product-name {
          font-size: 0.625rem;
        }

        .related-product-price {
          font-size: 0.75rem;
        }
      }
    }
  }
}
</style>
