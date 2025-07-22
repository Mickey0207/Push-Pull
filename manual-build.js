// 手動構建腳本，繞過路徑問題
console.log('開始手動構建 React 應用...');

try {
  const webpack = require('webpack');
  const config = require('./webpack.config.js');
  
  // 修改配置以避免路徑問題
  config.mode = 'development';
  config.devtool = 'eval-source-map';
  
  console.log('Webpack 配置載入成功');
  console.log('輸出目錄:', config.output.path);
  
  webpack(config, (err, stats) => {
    if (err) {
      console.error('Webpack 編譯錯誤:');
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error('構建錯誤:');
      info.errors.forEach(error => console.error(error));
      return;
    }

    if (stats.hasWarnings()) {
      console.warn('構建警告:');
      info.warnings.forEach(warning => console.warn(warning));
    }

    console.log('✓ React 應用構建成功！');
    console.log(stats.toString({
      chunks: false,
      colors: true,
      modules: false
    }));
    
    console.log('\n✓ bundle.js 已生成');
    console.log('現在可以運行: npm run dev');
    console.log('訪問: http://localhost:5000');
  });
  
} catch (error) {
  console.error('構建腳本錯誤:', error.message);
  console.log('嘗試重新安裝依賴: npm install');
}