<template>
  <section class="brand-story">
    <div class="brand-container">
      <!-- 品牌故事區域 -->
      <div class="brand-content">
        <div class="brand-text">
          <h2 class="brand-title">「妝飾」精選美國質感設計飾品</h2>
          <p class="brand-subtitle">每一件珠寶都承載著獨特的故事</p>
          <div class="brand-description">
            <p>我們相信，最美的飾品，是能讓您感到自信、從容做自己的那一件。</p>
            <p>讓我們為您的日常風格，畫上最完美的句點。</p>
          </div>
        </div>
        <div class="brand-image">
          <img :src="brandImage" alt="品牌工藝展示" class="main-image">
          <div class="image-overlay">
            <div class="overlay-content">
              <h3>匠心獨運</h3>
              <p>每一道工序都體現著我們對完美的追求</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 品牌圖片
import brandImage from '../assets/img/02.banner/CHN0079-1.jpg'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/_variables' as *;

.brand-story {
  padding: 6rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.brand-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.brand-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.brand-text {
  padding-right: 2rem;
}

.brand-title {
  font-size: 38px;
  font-weight: 300;
  color: $text-dark;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  letter-spacing: 0.05em;
}

.brand-subtitle {
  font-size: 0.875rem;
  color: $text-gold;
  margin: 0 0 2rem 0;
  font-weight: 300;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.brand-description {
  margin-bottom: 3rem;

  p {
    font-size: 1rem;
    line-height: 1.8;
    color: #666;
    margin: 0 0 1.5rem 0;
    font-weight: 300;

    &:last-child {
      margin-bottom: 0;
    }
  }
}


.brand-image {
  position: relative;
  height: 500px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 3rem 2rem 2rem 2rem;
  color: white;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    font-weight: 300;
    margin: 0 0 0.5rem 0;
    letter-spacing: 0.05em;
  }

  p {
    font-size: 1rem;
    margin: 0;
    font-weight: 300;
    opacity: 0.9;
  }
}

.brand-image:hover .main-image {
  transform: scale(1.05);
}

// 響應式設計
@media screen and (max-width: 1024px) {
  .brand-content {
    gap: 3rem;
  }

  .brand-text {
    padding-right: 1rem;
  }

  .brand-title {
    font-size: 2.5rem;
  }

  .brand-image {
    height: 400px;
  }
}

@media screen and (max-width: 768px) {
  .brand-story {
    padding: 3rem 0;
  }

  .brand-container {
    padding: 0 1.5rem;
  }

  .brand-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .brand-text {
    padding-right: 0;
    order: 2;
    text-align: center;
  }

  .brand-image {
    order: 1;
    height: 280px;
    border-radius: 0;
  }

  .brand-title {
    font-size: 2.25rem;
    margin-bottom: 1.5rem;
  }

  .brand-subtitle {
    font-size: 0.875rem;
    margin-bottom: 2.5rem;
  }

  .brand-description {
    margin-bottom: 2rem;

    p {
      font-size: 0.95rem;
      line-height: 1.7;
    }
  }

  .image-overlay {
    padding: 2.5rem 1.5rem 2rem 1.5rem;

    h3 {
      font-size: 1.375rem;
      margin-bottom: 0.75rem;
    }

    p {
      font-size: 0.95rem;
    }
  }
}

@media screen and (max-width: 480px) {
  .brand-story {
    padding: 2.5rem 0;
  }

  .brand-container {
    padding: 0 1rem;
  }

  .brand-content {
    gap: 2rem;
  }

  .brand-title {
    font-size: 1.875rem;
    margin-bottom: 1.25rem;
    line-height: 1.3;
  }

  .brand-subtitle {
    font-size: 0.875rem;
    margin-bottom: 2rem;
  }

  .brand-description {
    margin-bottom: 1.5rem;

    p {
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }
  }

  .brand-image {
    height: 240px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .image-overlay {
    padding: 2rem 1rem 1.5rem 1rem;

    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.875rem;
      line-height: 1.4;
    }
  }
}
</style>
