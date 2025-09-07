import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 測試用配置 - 如果當前設定不工作，可以嘗試這個
export default defineConfig({
  plugins: [vue()],
  // 嘗試不同的base設定
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          primevue: ['primevue']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['primeicons']
  }
})
