// 測試主題系統是否正確設置
const fs = require('fs');

console.log('🧪 測試主題系統設置...\n');

// 檢查必要文件
const requiredFiles = [
  'user/UserApp.js',
  'user/components/ThemeSettings.js',
  'user/utils/themeApplier.js',
  'src/App.js',
  'src/App.css'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✓ ${file} 存在`);
  } else {
    console.log(`✗ ${file} 缺失`);
    allFilesExist = false;
  }
});

// 檢查 UserApp.js 是否包含 ThemeSettings
if (fs.existsSync('user/UserApp.js')) {
  const userAppContent = fs.readFileSync('user/UserApp.js', 'utf8');
  if (userAppContent.includes('ThemeSettings')) {
    console.log('✓ UserApp.js 已整合 ThemeSettings');
  } else {
    console.log('✗ UserApp.js 未整合 ThemeSettings');
    allFilesExist = false;
  }
}

// 檢查 server.js 是否包含主題 API
if (fs.existsSync('server.js')) {
  const serverContent = fs.readFileSync('server.js', 'utf8');
  if (serverContent.includes('/api/user/apply-theme')) {
    console.log('✓ server.js 已添加主題 API');
  } else {
    console.log('✗ server.js 未添加主題 API');
    allFilesExist = false;
  }
}

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('🎉 主題系統設置完成！');
  console.log('\n使用說明:');
  console.log('1. 啟動應用: npm run dev');
  console.log('2. 登入後進入"用戶管理"頁面');
  console.log('3. 點擊"系統設定"卡片的"進入"按鈕');
  console.log('4. 在彈出的對話框中選擇主題');
  console.log('5. 點擊"儲存並應用"');
  console.log('6. 頁面將自動重新載入並應用新主題');
} else {
  console.log('❌ 主題系統設置不完整，請檢查缺失的文件');
}

console.log('\n可用主題:');
console.log('🤖 cyberpunk - 賽博朋克');
console.log('🌌 aurora - 極光');
console.log('🌲 forest - 暗夜森林');
console.log('🌊 ocean - 深海');
console.log('🔮 purple - 暗紫');