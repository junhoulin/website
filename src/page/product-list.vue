<template>
  <div class="product-list-page">
    <!-- Header -->
    <Header />


    <!-- 頁面標題 -->
    <section class="page-header">
      <div class="banner-slider">
        <div class="banner-slide active">
          <img src="../assets/img/02.banner/CHN0079-1.jpg" alt="精選飾品" class="banner-img">
          <div class="banner-overlay"></div>
        </div>
        <div class="banner-slide">
          <img src="../assets/img/02.banner/CHN0079-2.jpg" alt="優雅飾品" class="banner-img">
          <div class="banner-overlay"></div>
        </div>
        <div class="banner-slide">
          <img src="../assets/img/02.banner/CHN0090 studio (3).jpg" alt="時尚飾品" class="banner-img">
          <div class="banner-overlay"></div>
        </div>
      </div>
      <div class="banner-content">
        <div class="container">
          <h1 class="page-title">商品列表</h1>
          <p class="page-subtitle">探索我們的精選飾品系列</p>
          <div class="banner-stats">
            <div class="stat-item">
              <span class="stat-number">200+</span>
              <span class="stat-label">精選商品</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">5</span>
              <span class="stat-label">商品分類</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">品質保證</span>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-indicators">
        <button class="indicator active" @click="changeSlide(0)"></button>
        <button class="indicator" @click="changeSlide(1)"></button>
        <button class="indicator" @click="changeSlide(2)"></button>
      </div>
    </section>

    <!-- 篩選和排序區域 -->
    <section class="filters-section">
      <div class="container">
        <div class="filters-container">
          <!-- 分類篩選 -->
          <div class="filter-group">
            <label class="filter-label">商品分類</label>
            <select v-model="selectedCategory" @change="applyFilters" class="filter-select">
              <option value="">全部分類</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- 價格篩選 -->
          <div class="filter-group">
            <label class="filter-label">價格範圍</label>
            <select v-model="selectedPriceRange" @change="applyFilters" class="filter-select">
              <option value="">全部價格</option>
              <option value="0-1000">NT$ 0 - 1,000</option>
              <option value="1000-3000">NT$ 1,000 - 3,000</option>
              <option value="3000-5000">NT$ 3,000 - 5,000</option>
              <option value="5000+">NT$ 5,000 以上</option>
            </select>
          </div>

          <!-- 材質篩選 -->
          <div class="filter-group">
            <label class="filter-label">材質</label>
            <select v-model="selectedMaterial" @change="applyFilters" class="filter-select">
              <option value="">全部材質</option>
              <option value="gold">18K金</option>
              <option value="silver">925銀</option>
              <option value="pearl">珍珠</option>
              <option value="diamond">鑽石</option>
              <option value="crystal">水晶</option>
            </select>
          </div>

          <!-- 排序 -->
          <div class="filter-group">
            <label class="filter-label">排序方式</label>
            <select v-model="sortBy" @change="applySorting" class="filter-select">
              <option value="default">預設排序</option>
              <option value="price-low">價格：低到高</option>
              <option value="price-high">價格：高到低</option>
              <option value="name">名稱：A到Z</option>
              <option value="newest">最新上架</option>
            </select>
          </div>

          <!-- 清除篩選 -->
          <button class="clear-filters-btn" @click="clearFilters">
            <i class="pi pi-refresh"></i>
            清除篩選
          </button>
        </div>
      </div>
    </section>

    <!-- 商品列表 -->
    <section class="products-section">
      <div class="container">
        <!-- 結果統計 -->
        <div class="results-info">
          <p class="results-count">顯示 {{ filteredProducts.length }} 件商品</p>
          <div class="view-options">
            <button 
              class="view-btn" 
              :class="{ active: viewMode === 'grid' }" 
              @click="viewMode = 'grid'"
            >
              <i class="pi pi-th-large"></i>
            </button>
            <button 
              class="view-btn" 
              :class="{ active: viewMode === 'list' }" 
              @click="viewMode = 'list'"
            >
              <i class="pi pi-list"></i>
            </button>
          </div>
        </div>

        <!-- 商品網格/列表 -->
        <div class="products-container" :class="viewMode">
          <div 
            class="product-card" 
            v-for="product in paginatedProducts" 
            :key="product.id"
            @click="viewProduct(product)"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name">
              <div class="product-overlay">
                <button class="btn btn-sm">快速查看</button>
              </div>
              <div class="product-badge" v-if="product.isNew">新品</div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-category">{{ product.category }}</p>
              <p class="product-price">NT$ {{ product.price.toLocaleString() }}</p>
              <div class="product-actions">
                <button class="btn btn-outline btn-sm" @click.stop="addToCart(product)">
                  <i class="pi pi-shopping-cart"></i>
                  加入購物車
                </button>
                <button class="btn btn-primary btn-sm" @click.stop="viewProduct(product)">
                  查看詳情
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 分頁 -->
        <div class="pagination" v-if="totalPages > 1">
          <button 
            class="pagination-btn" 
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            <i class="pi pi-chevron-left"></i>
          </button>
          
          <button 
            v-for="page in visiblePages" 
            :key="page"
            class="pagination-btn"
            :class="{ active: page === currentPage }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          
          <button 
            class="pagination-btn" 
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            <i class="pi pi-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- 頁腳 -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <img src="../assets/img/01.logo/logo.png" alt="妝飾" class="logo-img">
              <span class="logo-text">妝飾</span>
            </div>
            <p class="footer-description">
              專業飾品品牌，為您提供優質的珠寶首飾選擇
            </p>
          </div>
          <div class="footer-section">
            <h4 class="footer-title">快速連結</h4>
            <ul class="footer-links">
              <li><a href="#about">關於我們</a></li>
              <li><a href="#contact">聯絡我們</a></li>
              <li><a href="#shipping">運送資訊</a></li>
              <li><a href="#returns">退換貨政策</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4 class="footer-title">客戶服務</h4>
            <ul class="footer-links">
              <li><a href="#faq">常見問題</a></li>
              <li><a href="#size-guide">尺寸指南</a></li>
              <li><a href="#care">保養說明</a></li>
              <li><a href="#warranty">保固服務</a></li>
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
          <p>&copy; 2025 妝飾. 版權所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Header from '../components/Header.vue'

// 響應式數據
const selectedCategory = ref('')
const selectedPriceRange = ref('')
const selectedMaterial = ref('')
const sortBy = ref('default')
const viewMode = ref('grid')
const currentPage = ref(1)
const itemsPerPage = ref(12)
const cartCount = ref(0)
const currentSlide = ref(0)
const slideInterval = ref(null)

const categories = ref([
  { id: 'necklaces', name: '項鍊系列' },
  { id: 'bracelets', name: '手鍊系列' },
  { id: 'rings', name: '戒指系列' },
  { id: 'earrings', name: '耳環系列' },
  { id: 'anklets', name: '腳鍊系列' }
])

// 導入圖片
import img111a from '../assets/img/04.商品圖片/100項鍊/110雙層項鍊/111/111a.webp'
import img221a from '../assets/img/04.商品圖片/200手鍊/220鍊式手鍊/221/221a.webp'
import img311a from '../assets/img/04.商品圖片/300戒指/310層疊混搭/311/311a.webp'
import img231a from '../assets/img/04.商品圖片/200手鍊/230滿鑽手鍊/231a.webp'
import img121a from '../assets/img/04.商品圖片/100項鍊/120鍊式項鍊/121/121a.webp'
import img222a from '../assets/img/04.商品圖片/200手鍊/220鍊式手鍊/222/222a.webp'
import imgR202901 from '../assets/img/04.商品圖片/300戒指/340素面戒指/R2029/R202901.webp'
import img621a from '../assets/img/04.商品圖片/600手腳鍊/620腳鍊/621/621a.webp'
import img241a from '../assets/img/04.商品圖片/200手鍊/240珍珠-晶石手鍊/241/241a.webp'

const products = ref([
  {
    id: 1,
    name: '優雅珍珠項鍊',
    category: '項鍊系列',
    price: 2880,
    material: 'pearl',
    image: img111a,
    isNew: true
  },
  {
    id: 2,
    name: '經典金手鍊',
    category: '手鍊系列',
    price: 1680,
    material: 'gold',
    image: img221a,
    isNew: false
  },
  {
    id: 3,
    name: '時尚鑽石戒指',
    category: '戒指系列',
    price: 3200,
    material: 'diamond',
    image: img311a,
    isNew: true
  },
  {
    id: 4,
    name: '精緻銀耳環',
    category: '耳環系列',
    price: 1280,
    material: 'silver',
    image: img231a,
    isNew: false
  },
  {
    id: 5,
    name: '水晶吊墜項鍊',
    category: '項鍊系列',
    price: 2200,
    material: 'crystal',
    image: img121a,
    isNew: false
  },
  {
    id: 6,
    name: '18K金手鍊',
    category: '手鍊系列',
    price: 4500,
    material: 'gold',
    image: img222a,
    isNew: true
  },
  {
    id: 7,
    name: '珍珠戒指',
    category: '戒指系列',
    price: 1800,
    material: 'pearl',
    image: imgR202901,
    isNew: false
  },
  {
    id: 9,
    name: '銀質腳鍊',
    category: '腳鍊系列',
    price: 950,
    material: 'silver',
    image: img621a,
    isNew: false
  },
  {
    id: 10,
    name: '水晶手鍊',
    category: '手鍊系列',
    price: 1500,
    material: 'crystal',
    image: img241a,
    isNew: false
  }
])

// 計算屬性
const filteredProducts = computed(() => {
  let filtered = [...products.value];
  
  // 分類篩選
  if (selectedCategory.value) {
    filtered = filtered.filter(product => 
      product.category === categories.value.find(cat => cat.id === selectedCategory.value)?.name
    );
  }
  
  // 價格篩選
  if (selectedPriceRange.value) {
    const [min, max] = selectedPriceRange.value.split('-').map(Number);
    if (max) {
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    } else {
      filtered = filtered.filter(product => product.price >= min);
    }
  }
  
  // 材質篩選
  if (selectedMaterial.value) {
    filtered = filtered.filter(product => product.material === selectedMaterial.value);
  }
  
  return filtered;
})

const sortedProducts = computed(() => {
  const productList = [...filteredProducts.value];
  
  switch (sortBy.value) {
    case 'price-low':
      return productList.sort((a, b) => a.price - b.price);
    case 'price-high':
      return productList.sort((a, b) => b.price - a.price);
    case 'name':
      return productList.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return productList.sort((a, b) => b.isNew - a.isNew);
    default:
      return productList;
  }
})

const totalPages = computed(() => {
  return Math.ceil(sortedProducts.value.length / itemsPerPage.value);
})

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedProducts.value.slice(start, end);
})

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    }
  }
  
  return pages;
})

// 方法
const applyFilters = () => {
  currentPage.value = 1;
}

const applySorting = () => {
  currentPage.value = 1;
}

const clearFilters = () => {
  selectedCategory.value = '';
  selectedPriceRange.value = '';
  selectedMaterial.value = '';
  sortBy.value = 'default';
  currentPage.value = 1;
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

const viewProduct = (product) => {
  console.log('查看商品:', product);
  // 這裡可以導航到商品詳情頁面
}

const addToCart = (product) => {
  cartCount.value++;
  console.log('加入購物車:', product);
  // 這裡可以實現加入購物車的邏輯
}

const changeSlide = (index) => {
  currentSlide.value = index;
  updateSlides();
}

const updateSlides = () => {
  const slides = document.querySelectorAll('.banner-slide');
  const indicators = document.querySelectorAll('.indicator');
  
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide.value);
  });
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide.value);
  });
}

const startSlideShow = () => {
  slideInterval.value = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % 3;
    updateSlides();
  }, 5000);
}

const stopSlideShow = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value);
    slideInterval.value = null;
  }
}

// 生命週期鉤子
onMounted(() => {
  startSlideShow();
})

onBeforeUnmount(() => {
  stopSlideShow();
})
</script>

<style lang="scss" scoped>
@use '../assets/styles/variables' as *;


.product-list-page {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  padding-top: 70px;
  width: 100vw;
}

// 導航欄樣式 (與 index1.vue 相同)
.navbar {
  background: $bg-white;
  box-shadow: $shadow;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 $spacing-lg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }
  
  .nav-logo {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    
    .logo-img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
    
    .logo-text {
      font-size: $font-size-xl;
      font-weight: bold;
      color: $text-gold;
    }
  }
  
  .nav-menu {
    display: flex;
    gap: $spacing-xl;
    
    .nav-link {
      text-decoration: none;
      color: $text-dark;
      font-weight: 500;
      transition: color 0.3s ease;
      
      &:hover,
      &.active {
        color: $primary-color;
      }
    }
  }
  
  .nav-actions {
    display: flex;
    gap: $spacing-md;
    
    .cart-btn {
      background: none;
      border: none;
      font-size: $font-size-lg;
      color: $text-dark;
      cursor: pointer;
      padding: $spacing-sm;
      border-radius: $border-radius;
      transition: all 0.3s ease;
      
      &:hover {
        background: $bg-gold;
        color: $primary-color;
      }
    }
    
    .cart-btn {
      position: relative;
      
      .cart-count {
        position: absolute;
        top: -5px;
        right: -5px;
        background: $primary-color;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}


// 頁面標題 - Banner 輪播設計
.page-header {
  position: relative;
  height: 400px;
  overflow: hidden;
  
  .banner-slider {
    position: relative;
    width: 100%;
    height: 100%;
    
    .banner-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 1s ease-in-out;
      
      &.active {
        opacity: 1;
      }
      
      .banner-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
      
      .banner-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          135deg,
          rgba(0, 0, 0, 0.4) 0%,
          rgba(212, 175, 55, 0.3) 50%,
          rgba(0, 0, 0, 0.6) 100%
        );
      }
    }
  }
  
  .banner-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 2;
    width: 100%;
    
    .page-title {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: $spacing-md;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      animation: fadeInUp 1s ease-out;
    }
    
    .page-subtitle {
      font-size: $font-size-xl;
      margin-bottom: $spacing-xxl;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      animation: fadeInUp 1s ease-out 0.3s both;
    }
    
    .banner-stats {
      display: flex;
      justify-content: center;
      gap: $spacing-xxl;
      animation: fadeInUp 1s ease-out 0.6s both;
      
      .stat-item {
        text-align: center;
        
        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: bold;
          color: $text-gold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          margin-bottom: $spacing-xs;
        }
        
        .stat-label {
          font-size: $font-size-lg;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
  
  .banner-indicators {
    position: absolute;
    bottom: $spacing-xl;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: $spacing-sm;
    z-index: 2;
    
    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.active {
        background: $text-gold;
        border-color: $text-gold;
        transform: scale(1.2);
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

// 動畫效果
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 篩選區域
.filters-section {
  background: $bg-white;
  padding: $spacing-xxl 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, $primary-color 50%, transparent 100%);
  }
  
  .filters-container {
    display: flex;
    gap: $spacing-xl;
    align-items: end;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    min-width: 180px;
    position: relative;
    
    .filter-label {
      font-weight: 700;
      color: $text-dark;
      font-size: $font-size-sm;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: $spacing-xs;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 30px;
        height: 2px;
        background: $primary-color;
        border-radius: 1px;
      }
    }
    
    .filter-select {
      padding: $spacing-md $spacing-lg;
      border: none;
      border-bottom: 2px solid #e0e0e0;
      background: transparent;
      font-size: $font-size-base;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      position: relative;
      
      &:focus {
        outline: none;
        border-bottom-color: $primary-color;
        background: rgba(212, 175, 55, 0.05);
        transform: translateY(-2px);
      }
      
      &:hover {
        border-bottom-color: $primary-color;
        background: rgba(212, 175, 55, 0.03);
      }
    }
  }
  
  .clear-filters-btn {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-md $spacing-xl;
    background: $primary-color;
    border: none;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: $font-size-sm;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover {
      background: $primary-hover;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
      
      &::before {
        left: 100%;
      }
    }
    
    &:active {
      transform: translateY(0);
    }
    
    i {
      font-size: $font-size-base;
    }
  }
}

// 商品區域
.products-section {
  padding: $spacing-xxl 0;
  background: $bg-light;
  
  .results-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-xl;
    
    .results-count {
      font-weight: 600;
      color: $text-dark;
    }
    
    .view-options {
      display: flex;
      gap: $spacing-sm;
      
      .view-btn {
        padding: $spacing-sm;
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: $border-radius;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &.active {
          background: $primary-color;
          color: white;
          border-color: $primary-color;
        }
        
        &:hover:not(.active) {
          border-color: $primary-color;
        }
      }
    }
  }
  
  .products-container {
    &.grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: $spacing-xl;
    }
    
    &.list {
      display: flex;
      flex-direction: column;
      gap: $spacing-lg;
      
      .product-card {
        display: flex;
        align-items: center;
        text-align: left;
        
        .product-image {
          width: 200px;
          height: 150px;
          flex-shrink: 0;
        }
        
        .product-info {
          flex: 1;
          padding: $spacing-lg;
          
          .product-actions {
            display: flex;
            gap: $spacing-md;
            margin-top: $spacing-md;
          }
        }
      }
    }
  }
  
  .product-card {
    background: $bg-white;
    border-radius: $border-radius-lg;
    overflow: hidden;
    box-shadow: $shadow;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: $shadow-lg;
    }
    
    .product-image {
      position: relative;
      height: 250px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      
      .product-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .product-badge {
        position: absolute;
        top: $spacing-sm;
        right: $spacing-sm;
        background: $primary-color;
        color: white;
        padding: $spacing-xs $spacing-sm;
        border-radius: $border-radius;
        font-size: $font-size-sm;
        font-weight: 600;
      }
      
      &:hover {
        img {
          transform: scale(1.1);
        }
        
        .product-overlay {
          opacity: 1;
        }
      }
    }
    
    .product-info {
      padding: $spacing-lg;
      
      .product-name {
        font-size: $font-size-lg;
        font-weight: 600;
        color: $text-dark;
        margin-bottom: $spacing-xs;
      }
      
      .product-category {
        font-size: $font-size-sm;
        color: $text-light;
        margin-bottom: $spacing-sm;
      }
      
      .product-price {
        font-size: $font-size-xl;
        font-weight: bold;
        color: $primary-color;
        margin-bottom: $spacing-md;
      }
      
      .product-actions {
        display: flex;
        gap: $spacing-sm;
        
        .btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: $spacing-xs;
        }
      }
    }
  }
}

// 分頁樣式
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $spacing-sm;
  margin-top: $spacing-xxl;
  
  .pagination-btn {
    padding: $spacing-sm $spacing-md;
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: $border-radius;
    color: $text-dark;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
      border-color: $primary-color;
      color: $primary-color;
    }
    
    &.active {
      background: $primary-color;
      color: white;
      border-color: $primary-color;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

// 按鈕樣式 (與 index1.vue 相同)
.btn {
  padding: $spacing-md $spacing-xl;
  border: none;
  border-radius: $border-radius;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  
  &.btn-primary {
    background: $primary-color;
    color: white;
    
    &:hover {
      background: $primary-hover;
      transform: translateY(-2px);
    }
  }
  
  &.btn-outline {
    background: transparent;
    color: $primary-color;
    border: 2px solid $primary-color;
    
    &:hover {
      background: $primary-color;
      color: white;
    }
  }
  
  &.btn-sm {
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
  }
}

// 容器樣式
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-lg;
}

// 頁腳樣式 (與 index1.vue 相同)
.footer {
  background: $text-dark;
  color: white;
  padding: 60px 0 20px;
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: $spacing-xxl;
    margin-bottom: $spacing-xxl;
  }
  
  .footer-section {
    .footer-logo {
      margin-top: 22px;
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
  .navbar {
    .nav-container {
      padding: 0 $spacing-md;
    }
    
    .nav-menu {
      display: none;
    }
  }
  
  .filters-container {
    flex-direction: column;
    align-items: stretch;
    
    .filter-group {
      width: 100%;
    }
  }
  
  .results-info {
    flex-direction: column;
    gap: $spacing-md;
    align-items: stretch;
    
    .view-options {
      display: none !important;
    }
  }
  
  .products-container.list .product-card {
    flex-direction: column;
    
    .product-image {
      width: 100%;
      height: 200px;
    }
  }
  
  .pagination {
    flex-wrap: wrap;
  }
  
  // 篩選區域響應式設計
  .filters-section {
    padding: $spacing-xl 0;
    
    .filters-container {
      gap: $spacing-lg;
      padding: 0 $spacing-lg;
    }
    
    .filter-group {
      min-width: 150px;
    }
    
    .clear-filters-btn {
      padding: $spacing-sm $spacing-lg;
      font-size: $font-size-xs;
    }
  }
  
  // Banner 響應式設計
  .page-header {
    height: 300px;
    
    .banner-content {
      .page-title {
        font-size: 1.8rem;
        margin-bottom: $spacing-sm;
      }
      
      .page-subtitle {
        font-size: $font-size-base;
        margin-bottom: $spacing-lg;
      }
      
      .banner-stats {
        flex-direction: row;
        flex-wrap: wrap;
        gap: $spacing-md;
        justify-content: center;
        
        .stat-item {
          flex: 1;
          min-width: 80px;
          padding: $spacing-sm;
          
          .stat-number {
            font-size: 1.8rem;
          }
          
          .stat-label {
            font-size: $font-size-sm;
          }
        }
      }
    }
  }
}
</style>
