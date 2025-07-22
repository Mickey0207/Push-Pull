@echo off
chcp 65001 >nul
echo 🎨 設置用戶主題系統...
echo.

echo 步驟1: 整合主題系統到應用
node update-theme-system.js

echo.
echo 步驟2: 重新構建應用
node manual-build.js

echo.
echo 步驟3: 啟動應用測試
echo.
echo 🎉 用戶主題系統設置完成！
echo.
echo 功能說明:
echo ✓ 在用戶管理頁面點擊"系統設定"
echo ✓ 選擇五種主題配色之一
echo ✓ 點擊"儲存並應用"即可切換主題
echo ✓ 主題設定會保存在瀏覽器中
echo.
echo 可用主題:
echo 🤖 賽博朋克 - 現代科技感
echo 🌌 極光 - 優雅漸變
echo 🌲 暗夜森林 - 自然清新
echo 🌊 深海 - 清新深邃
echo 🔮 暗紫 - 神秘高雅
echo.
echo 現在啟動應用: npm run dev
pause