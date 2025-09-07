#!/bin/bash

# 部署腳本 - 妝飾網站到 GitHub Pages

echo "🚀 開始部署妝飾網站到 GitHub Pages..."

# 檢查是否在正確的目錄
if [ ! -f "package.json" ]; then
    echo "❌ 錯誤：請在項目根目錄運行此腳本"
    exit 1
fi

# 安裝依賴
echo "📦 安裝依賴..."
npm install

# 構建項目
echo "🔨 構建項目..."
npm run build

# 檢查構建是否成功
if [ ! -d "dist" ]; then
    echo "❌ 構建失敗：dist 目錄不存在"
    exit 1
fi

echo "✅ 構建完成！"
echo ""
echo "📋 接下來的步驟："
echo "1. 將代碼推送到 GitHub 倉庫"
echo "2. 在 GitHub 倉庫設定中啟用 Pages"
echo "3. 選擇 'GitHub Actions' 作為來源"
echo "4. 等待自動部署完成"
echo ""
echo "🌐 您的網站將在以下網址可用："
echo "https://您的用戶名.github.io/您的倉庫名/"
echo ""
echo "📖 詳細說明請參考 DEPLOYMENT.md 文件"
