# 部署到 GitHub Pages 指南

## 步驟 1: 準備 GitHub 倉庫

1. 在 GitHub 上創建一個新的倉庫（如果還沒有的話）
2. 將您的代碼推送到 GitHub 倉庫

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/您的用戶名/您的倉庫名.git
git push -u origin main
```

## 步驟 2: 配置 GitHub Pages

1. 進入您的 GitHub 倉庫
2. 點擊 **Settings** 標籤
3. 在左側選單中找到 **Pages**
4. 在 **Source** 部分選擇 **GitHub Actions**
5. 保存設定

## 步驟 3: 自動部署

當您推送代碼到 `main` 分支時，GitHub Actions 會自動：
- 安裝依賴
- 構建項目
- 部署到 GitHub Pages

## 步驟 4: 訪問您的網站

部署完成後，您的網站將在以下網址可用：
`https://您的用戶名.github.io/您的倉庫名/`

## 本地測試

在部署前，您可以在本地測試構建：

```bash
npm run build
npm run preview
```

## 注意事項

- 確保所有圖片路徑都是相對路徑
- 檢查所有外部資源是否正確加載
- 如果使用自定義域名，請在 `.github/workflows/deploy.yml` 中配置 `cname`

## 故障排除

### 常見問題：

#### 1. Node.js版本問題
```
Error: Vite requires Node.js version 20.19+ or 22.12+
```
**解決方案：**
- 升級Node.js到22.x版本
- 或使用nvm切換版本：`nvm use 22`

#### 2. primeicons構建失敗
```
Failed to resolve entry for package "primeicons"
```
**解決方案：**
```bash
# 清理並重新安裝
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 3. 其他構建問題
如果部署失敗：
1. 檢查 GitHub Actions 日誌
2. 確認所有依賴都已正確安裝
3. 檢查構建過程是否有錯誤
4. 嘗試本地構建：`npm run build`

### 本地測試構建：
```bash
# 使用修復腳本
chmod +x fix-build.sh
./fix-build.sh

# 或手動執行
npm run build
npm run preview
```
