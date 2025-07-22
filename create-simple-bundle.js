// 創建簡單的 bundle 來測試
const fs = require('fs');
const path = require('path');

console.log('創建簡單的測試 bundle...');

// 創建一個基本的 bundle.js 用於測試
const bundleContent = `
// 簡單的測試 bundle
console.log('Bundle loaded successfully!');

// 移除載入畫面並顯示基本內容
document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = \`
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        color: white;
        font-family: 'Microsoft JhengHei', sans-serif;
        text-align: center;
      ">
        <div>
          <h1>🎉 應用程式已啟動</h1>
          <p>Bundle.js 載入成功！</p>
          <p>現在可以開始開發 React 應用程式</p>
          <button onclick="location.reload()" style="
            padding: 10px 20px;
            background: #1a237e;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
          ">重新載入</button>
        </div>
      </div>
    \`;
  }
});
`;

// 確保 public 目錄存在
if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

// 寫入 bundle.js
fs.writeFileSync('public/bundle.js', bundleContent);

console.log('✓ 簡單 bundle.js 已創建在 public/bundle.js');
console.log('現在可以運行: npm run dev');
console.log('訪問 http://localhost:5000 測試');