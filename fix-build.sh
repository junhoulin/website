#!/bin/bash

echo "🔧 修復構建問題..."

# 清理node_modules和package-lock.json
echo "🧹 清理舊的依賴..."
rm -rf node_modules
rm -f package-lock.json

# 重新安裝依賴
echo "📦 重新安裝依賴..."
npm install

# 清理Vite緩存
echo "🗑️ 清理Vite緩存..."
npx vite --clearCache

# 嘗試構建
echo "🔨 嘗試構建..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 構建成功！"
else
    echo "❌ 構建失敗，請檢查錯誤信息"
    echo ""
    echo "💡 可能的解決方案："
    echo "1. 升級Node.js到22.x版本"
    echo "2. 檢查primeicons版本是否正確"
    echo "3. 嘗試使用yarn代替npm"
fi
