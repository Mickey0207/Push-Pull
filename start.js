// 簡化的啟動腳本
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// 中間件
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// 簡單的測試路由
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: '伺服器運行正常！',
    timestamp: new Date().toISOString()
  })
})

// 基本的登入路由（用於測試）
app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  
  // 簡單的測試登入
  if (username === 'admin' && password === 'adminacl53959233') {
    res.json({
      success: true,
      message: '登入成功',
      token: 'test_token_123',
      user: { id: 1, username: 'admin', email: 'admin@system.com' }
    })
  } else {
    res.status(401).json({
      success: false,
      message: '用戶名或密碼錯誤'
    })
  }
})

// 提供前端應用程式
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 伺服器運行在 http://localhost:${PORT}`)
  console.log(`📱 測試 API: http://localhost:${PORT}/api/test`)
  console.log('✅ 整合型網頁應用程式系統已啟動')
})