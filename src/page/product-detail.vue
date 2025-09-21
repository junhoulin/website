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
import product1Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/111/111a.webp'
import product2Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/111/111b.webp'
import product3Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/111/111c.webp'
import product4Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/111/111d.webp'
import product5Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/111/111e.webp'
import product6Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/112/112a.webp'
import product7Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/112/112b.webp'
import product8Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/112/112c.webp'
import product9Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/112/112d.webp'
import product10Image from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/112/112e.webp'
import product11Image from '../assets/img/04.商品圖片/100項鍊/120鍊式項鍊/121/121a.webp'
import product12Image from '../assets/img/04.商品圖片/100項鍊/120鍊式項鍊/121/121b.webp'
import product13Image from '../assets/img/04.商品圖片/100項鍊/120鍊式項鍊/121/121c.webp'
import product14Image from '../assets/img/04.商品圖片/100項鍊/120鍊式項鍊/121/121d.webp'
import product15Image from '../assets/img/04.商品圖片/100項鍊/120鍊式項鍊/121/121e.webp'
import product16Image from '../assets/img/04.商品圖片/100項鍊/120鍊式項鍊/121/121f.webp'
import product17Image from '../assets/img/04.商品圖片/100項鍊/120鍊式項鍊/121/121g.webp'
import product18Image from '../assets/img/04.商品圖片/100項鍊/150扣環項鍊/151/151a.webp'
import product19Image from '../assets/img/04.商品圖片/100項鍊/150扣環項鍊/151/151b.webp'
import product20Image from '../assets/img/04.商品圖片/100項鍊/150扣環項鍊/151/151c.webp'
import product21Image from '../assets/img/04.商品圖片/100項鍊/150扣環項鍊/151/151d.webp'
import product22Image from '../assets/img/04.商品圖片/100項鍊/150扣環項鍊/151/151e.webp'
import product23Image from '../assets/img/04.商品圖片/100項鍊/150扣環項鍊/151/151f.webp'


const route = useRoute()
const router = useRouter()

// 商品資料
const products = ref([
  {
    id: 1,
    name: '三戴式18K金 PVD不鏽鋼星月吊飾可轉換項鍊',
    category: '項鍊',
    price: 1600,
    image: product1Image,
    images: [product1Image, product2Image, product3Image, product4Image, product5Image],
    description: '🌙三戴式星月吊飾項鍊🌟精緻雙層設計，結合細緻的paperclip與curb鍊條，搭配月亮與北極星指南針吊飾，點綴閃耀小水晶，為日常造型增添一抹靈動光彩。一條項鍊，三種戴法，隨心轉換風格：✨ 雙層佩戴 – 上層13吋curb鍊搭配水晶吊飾與中央指南針星星，下層16吋paperclip鍊點綴月亮與星星，展現層次魅力。🌟 單層馬銜鍊佩戴 – 簡約清爽的水晶與指南針星星吊飾，獨立成為精緻焦點。🌙 單層迴紋針鍊佩戴 – 月亮與指南針星星輕巧點綴，自然優雅，適合日常穿搭。從層次疊戴到極簡單鍊，輕鬆變換氣質，展現個人風格。',
    inStock: true,
    sizes: ['18K', '316L 鈦鋼'],
    features: [
      '材質：18k，316L鈦鋼',
      '重量：約12g',
      '鍊長：13"（上層 馬銜鍊）+ 16"（下層 迴紋針鍊）+ 3" 延長鍊',
      '鍊寬：約 2.5 mm',
      '吊飾: 月亮與指南針星星，鑲嵌清澈水晶',
      '配戴方式: 三種變化式佩戴'
    ]
  },
  {
    id: 2,
    name: '18K 金 PVD 不鏽鋼珍珠與圓片疊戴吊飾項鍊',
    category: '項鍊',
    price: 650,
    image: product7Image,
    images: [product7Image, product8Image, product9Image, product10Image],
    description: ' ✨秀氣與時尚一次擁有✨兩條人氣鍊型優雅疊搭，點綴光澤珍珠與簡約圓片墜飾，輕鬆為日常穿搭增添層次感與亮點。採用 18K 金 PVD 不鏽鋼 製作，防水、不褪色、低敏設計，從日常到約會都能自在配戴。經典百搭，輕奢質感，絕對是珠寶收藏中的亮眼單品。',
    inStock: true,
    sizes: ['18K', '316L 鈦鋼'],
    features: [
      '鍊長：15"與 18"+ 2" 延長鍊',
      '鍊寬：約1.5 mm',
      '圓形吊墜尺寸：約10mm x 10mm',
      '重量：約 5.61g'
    ]
  },
  {
    id: 3,
    name: '不鏽鋼 Figaro 鍊條項鍊 ',
    category: '項鍊',
    price: 450,
    image: product11Image,
    images: [product11Image, product12Image, product13Image, product14Image, product15Image, product16Image, product17Image],
    description: '經典不敗，百搭必備不管是日常穿搭還是正式場合，Stainless Steel Figaro Chain Necklace 都能輕鬆駕馭。俐落的線條、平滑的鍊身設計，讓你一戴上就展現簡約時尚的魅力！🔗 不挑衣服的百搭單品🔗 永不過時的 Figaro 鍊設計🔗 質感不鏽鋼，耐看又耐戴風格說明｜這款項鍊是兼具時尚與實用性的百搭單品，不論單獨配戴或搭配其他項鍊疊戴，都能輕鬆打造俐落造型。適合日常穿搭，也能為正式場合增添質感細節設計特色｜經典 Figaro 鍊設計，結合短鏈與長鏈的節奏感，展現低調中的個性風格扁平鍊身設計，貼合頸部與胸口，佩戴舒適不易翻轉耐磨抗褪色的不鏽鋼材質，適合日常配戴',
    inStock: true,
    sizes: ['鍊寬3mm 鍊長18inch', '鍊寬12mm 鍊長20inch'],
    features: [
      '材質：316L 鈦鋼',
      '顏色：鈦鋼色',
      '重量：約8g',
      '鍊長：20',
      '鍊寬(mm)：3 / 12'
    ]
  },
  {
    id: 4,
    name: ' 18K金PVD不鏽鋼愛心吊飾扣頭迴紋針項鍊｜2色',
    category: '項鍊',
    price: 1300,
    image: product18Image,
    images: [product18Image, product19Image, product20Image, product21Image, product22Image, product23Image],
    description: ' 完美演繹吊飾項鍊趨勢，這款可開式 Carabiner Charm Keeper 讓妳輕鬆打造專屬造型。搭配 18 吋的 迴紋針鍊條，串起 Love 字母吊飾、閃亮鑲石吊飾，以及 太陽光芒心型吊飾，每個細節都精緻動人，展現現代愛意與自信。🔓 可自由增減吊飾，天天都有不同風格✨ 不鏽鋼 & 18K 金PVD 版本可選，耐磨不褪色💫 適合疊戴，也可單戴成為注目焦點讓這條項鍊陪妳展現風格態度，優雅與時尚從細節開始',
    inStock: true,
    sizes: ['18K', '316L 鈦鋼'],
    features: [
      '材質：316L 鈦鋼',
      '顏色：鈦鋼色  18k金',
      '鍊長：18"+2" 延長鏈',
      '迴紋針鍊寬：4mm',
      '重量：約11g'
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
