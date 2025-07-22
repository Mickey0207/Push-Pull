// 更新主題系統，整合到應用中
const fs = require('fs');

console.log('更新主題系統整合...');

// 更新 App.js 來支持動態主題載入
const appJsPath = 'src/App.js';
if (fs.existsSync(appJsPath)) {
  let appContent = fs.readFileSync(appJsPath, 'utf8');
  
  // 檢查是否已經有主題載入邏輯
  if (!appContent.includes('loadSavedTheme')) {
    // 在 import 部分添加主題工具
    const importIndex = appContent.indexOf("import './App.css'");
    if (importIndex !== -1) {
      const beforeImport = appContent.substring(0, importIndex);
      const afterImport = appContent.substring(importIndex);
      
      appContent = beforeImport + 
        "import { loadSavedTheme } from '../user/utils/themeApplier'\n" +
        afterImport;
    }
    
    // 在 useEffect 中添加主題載入
    const useEffectIndex = appContent.indexOf('useEffect(() => {');
    if (useEffectIndex !== -1) {
      const beforeUseEffect = appContent.substring(0, useEffectIndex);
      const afterUseEffect = appContent.substring(useEffectIndex);
      
      // 添加主題載入邏輯
      const themeLoadCode = `
  // 載入保存的主題
  useEffect(() => {
    loadSavedTheme();
  }, []);

  `;
      
      appContent = beforeUseEffect + themeLoadCode + afterUseEffect;
    }
    
    fs.writeFileSync(appJsPath, appContent);
    console.log('✓ 已更新 App.js 支持動態主題');
  } else {
    console.log('- App.js 已包含主題載入邏輯');
  }
} else {
  console.log('✗ 找不到 App.js 文件');
}

// 更新 CSS 文件支持 CSS 變數
const cssPath = 'src/App.css';
if (fs.existsSync(cssPath)) {
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  
  if (!cssContent.includes('--primary-color')) {
    // 在 CSS 開頭添加變數定義
    const cssVariables = `
/* 動態主題變數 */
:root {
  --primary-color: #00d4aa;
  --secondary-color: #bb86fc;
  --accent-color: #ff6ec7;
  --bg-default: #0d1117;
  --bg-paper: #161b22;
  --gradient: linear-gradient(135deg, #00d4aa 0%, #bb86fc 50%, #ff6ec7 100%);
  --bg-gradient: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
}

`;
    
    cssContent = cssVariables + cssContent;
    fs.writeFileSync(cssPath, cssContent);
    console.log('✓ 已更新 App.css 支持 CSS 變數');
  } else {
    console.log('- App.css 已包含 CSS 變數');
  }
}

console.log('\n主題系統整合完成！');
console.log('現在用戶可以在系統設定中切換主題配色。');