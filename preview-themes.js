// 預覽主題配色方案
const colorThemes = require('./color-themes.js');

console.log('🎨 深色主題配色方案預覽\n');

Object.entries(colorThemes).forEach(([key, theme]) => {
  console.log(`📌 ${theme.name} (${key})`);
  console.log(`   主色調: ${theme.primary.main}`);
  console.log(`   次色調: ${theme.secondary.main}`);
  console.log(`   強調色: ${theme.accent}`);
  console.log(`   背景色: ${theme.background.default}`);
  console.log(`   漸變: ${theme.gradient}`);
  console.log('');
});

console.log('選擇你喜歡的主題，我將為你應用！');
console.log('');
console.log('推薦主題:');
console.log('🌟 cyberpunk - 現代科技感，適合開發工具');
console.log('🌟 aurora - 優雅漸變，適合商務應用');
console.log('🌟 ocean - 清新深邃，適合長時間使用');
console.log('🌟 purple - 神秘高雅，適合創意應用');