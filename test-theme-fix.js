// 測試主題修復是否成功
const fs = require('fs');

console.log('🔧 測試主題修復...\n');

// 檢查關鍵文件
const checks = [
  {
    file: 'user/utils/dynamicThemeProvider.js',
    check: (content) => content.includes('createDynamicTheme'),
    message: 'dynamicThemeProvider.js 包含 createDynamicTheme'
  },
  {
    file: 'user/components/ThemeSettings.js',
    check: (content) => content.includes('dynamicThemeProvider'),
    message: 'ThemeSettings.js 使用 dynamicThemeProvider'
  },
  {
    file: 'src/App.js',
    check: (content) => content.includes('createDynamicTheme') && content.includes('themeChanged'),
    message: 'App.js 支持動態主題和事件監聽'
  },
  {
    file: 'server.js',
    check: (content) => content.includes('/api/user/apply-theme'),
    message: 'server.js 包含主題 API'
  }
];

let allPassed = true;

checks.forEach(({ file, check, message }) => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (check(content)) {
      console.log(`✅ ${message}`);
    } else {
      console.log(`❌ ${message}`);
      allPassed = false;
    }
  } else {
    console.log(`❌ ${file} 不存在`);
    allPassed = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPassed) {
  console.log('🎉 主題系統修復完成！');
  console.log('\n測試步驟:');
  console.log('1. 運行: npm run manual-build');
  console.log('2. 運行: npm run dev');
  console.log('3. 登入後進入"用戶管理"');
  console.log('4. 點擊"系統設定" → "進入"');
  console.log('5. 選擇主題並點擊"儲存並應用"');
  console.log('6. 主題應該立即生效，無需重新載入頁面');
  
  console.log('\n🎨 可用主題:');
  console.log('• cyberpunk - 賽博朋克 (青綠+紫+粉)');
  console.log('• aurora - 極光 (青+紫+橙)');
  console.log('• forest - 暗夜森林 (綠+藍+金)');
  console.log('• ocean - 深海 (藍+青+橙)');
  console.log('• purple - 暗紫 (紫+粉+藍)');
} else {
  console.log('❌ 主題系統修復不完整，請檢查錯誤');
}

console.log('\n如果主題仍然無法切換，請檢查瀏覽器控制台是否有錯誤信息。');