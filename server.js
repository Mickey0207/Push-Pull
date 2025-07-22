const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createClient } = require('@supabase/supabase-js')

dotenv.config()

// 初始化 Supabase 客戶端
const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const app = express()
const PORT = process.env.PORT || 5000

// 檢查端口是否可用
const checkPort = (port) => {
  return new Promise((resolve) => {
    const server = require('net').createServer()
    server.listen(port, () => {
      server.once('close', () => resolve(true))
      server.close()
    })
    server.on('error', () => resolve(false))
  })
}

// 中間件
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Handle favicon requests specifically
app.get('/favicon.ico', (req, res) => {
  res.status(204).end()
})

// Supabase 認證函數
const registerUser = async (username, email, password) => {
  try {
    // 使用 Supabase Auth 創建用戶
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: {
        username: username
      }
    })
    
    if (authError) {
      if (authError.message.includes('already registered')) {
        return { success: false, message: '用戶名或Email已存在' }
      }
      return { success: false, message: authError.message }
    }
    
    return { success: true, message: '註冊成功', user: authData.user }
  } catch (error) {
    return { success: false, message: '註冊失敗: ' + error.message }
  }
}

const loginUser = async (username, password) => {
  try {
    // 支持用戶名或 email 登入
    let email = username
    if (!username.includes('@')) {
      // 如果輸入的是用戶名，需要先查找對應的 email
      // 這裡我們假設用戶名就是 admin，對應 admin@system.com
      if (username === 'admin') {
        email = 'admin@system.com'
      } else {
        return { success: false, message: '用戶名或密碼錯誤' }
      }
    }
    
    // 使用 Supabase Auth 登入
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    
    if (authError) {
      return { success: false, message: '用戶名或密碼錯誤' }
    }
    
    const user = authData.user
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.user_metadata?.username || username, 
        email: user.email 
      },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '24h' }
    )
    
    return {
      success: true,
      token,
      user: { 
        id: user.id, 
        username: user.user_metadata?.username || username, 
        email: user.email 
      }
    }
  } catch (error) {
    return { success: false, message: '登入失敗: ' + error.message }
  }
}

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret')
    return { success: true, user: decoded }
  } catch (error) {
    return { success: false, message: 'Token無效' }
  }
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: '需要登入' })
  }

  const verification = verifyToken(token)
  if (!verification.success) {
    return res.status(403).json({ message: verification.message })
  }

  req.user = verification.user
  next()
}

// 認證路由
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body
  
  if (!username || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: '請填寫所有必要欄位' 
    })
  }

  const result = await registerUser(username, email, password)
  
  if (result.success) {
    res.status(201).json(result)
  } else {
    res.status(400).json(result)
  }
})

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body
  
  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: '請輸入用戶名和密碼' 
    })
  }

  const result = await loginUser(username, password)
  
  if (result.success) {
    res.json(result)
  } else {
    res.status(401).json(result)
  }
})

app.get('/api/verify-token', (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ success: false, message: '沒有提供 token' })
  }

  const verification = verifyToken(token)
  res.json(verification)
})

// 協作系統 API 路由
app.get('/api/collaboration/projects', authenticateToken, async (req, res) => {
  try {
    // 這裡應該從 Supabase 獲取用戶的專案列表
    // 暫時返回模擬資料
    res.json({
      success: true,
      projects: []
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '獲取專案列表失敗'
    })
  }
})

app.post('/api/collaboration/projects', authenticateToken, async (req, res) => {
  try {
    const { name, description, type, repoUrl } = req.body
    const userId = req.user.userId

    // 這裡應該在 Supabase 中創建新專案
    // 暫時返回成功響應
    res.status(201).json({
      success: true,
      message: '專案創建成功',
      project: {
        id: Date.now(),
        name,
        description,
        type,
        repoUrl,
        userId,
        createdAt: new Date().toISOString()
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '創建專案失敗'
    })
  }
})

// Git 操作 API
app.post('/api/collaboration/git/:operation', authenticateToken, async (req, res) => {
  try {
    const { operation } = req.params
    const { projectId, ...params } = req.body

    // 這裡將實現具體的 Git 操作
    console.log(`執行 Git 操作: ${operation}`, params)

    res.json({
      success: true,
      message: `${operation} 操作執行成功`
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Git 操作失敗: ${error.message}`
    })
  }
})

// 其他應用程式的 API 路由佔位符
app.get('/api/maintenance/*', authenticateToken, (req, res) => {
  res.json({ success: true, message: '維修系統 API' })
})

app.get('/api/inspection/*', authenticateToken, (req, res) => {
  res.json({ success: true, message: '檢核系統 API' })
})

app.get('/api/project/*', authenticateToken, (req, res) => {
  res.json({ success: true, message: '專案系統 API' })
})

app.get('/api/report/*', authenticateToken, (req, res) => {
  res.json({ success: true, message: '報表系統 API' })
})

// 用戶系統 API 路由
app.get('/api/user/*', authenticateToken, (req, res) => {
  res.json({ success: true, message: '用戶系統 API' })
})

// 主題管理 API
app.post('/api/user/apply-theme', authenticateToken, async (req, res) => {
  try {
    const { theme } = req.body
    const userId = req.user.userId

    // 驗證主題名稱
    const validThemes = ['cyberpunk', 'aurora', 'forest', 'ocean', 'purple']
    if (!validThemes.includes(theme)) {
      return res.status(400).json({
        success: false,
        message: '無效的主題名稱'
      })
    }

    console.log(`用戶 ${userId} 正在應用主題: ${theme}`)

    // 這裡可以將用戶的主題偏好保存到資料庫
    // 暫時返回成功響應
    res.json({
      success: true,
      message: '主題已成功應用',
      theme: theme
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '主題應用失敗'
    })
  }
})

// 提供前端應用程式
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// 錯誤處理中間件
app.use((error, req, res, next) => {
  console.error('Server error:', error)
  res.status(500).json({
    success: false,
    message: '伺服器內部錯誤'
  })
})

// 啟動服務器，如果端口被占用則嘗試其他端口
const startServer = async () => {
  let currentPort = PORT
  let maxAttempts = 10
  
  for (let i = 0; i < maxAttempts; i++) {
    const isAvailable = await checkPort(currentPort)
    
    if (isAvailable) {
      app.listen(currentPort, () => {
        console.log(`伺服器運行在 http://localhost:${currentPort}`)
        console.log('整合型網頁應用程式系統已啟動')
        if (currentPort !== PORT) {
          console.log(`注意: 原端口 ${PORT} 被占用，已改用端口 ${currentPort}`)
        }
      })
      return
    } else {
      console.log(`端口 ${currentPort} 被占用，嘗試端口 ${currentPort + 1}`)
      currentPort++
    }
  }
  
  console.error(`無法找到可用端口 (嘗試了 ${PORT} 到 ${currentPort - 1})`)
  console.log('請手動終止占用端口的進程或運行 kill-port-3000.bat')
}

startServer().catch(console.error)