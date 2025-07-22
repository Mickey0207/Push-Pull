import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabase } from './supabase.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

// 用戶註冊
export const registerUser = async (username, email, password) => {
  try {
    // 檢查用戶名是否已存在
    const { data: existingUser } = await supabase
      .from('global_user')
      .select('*')
      .eq('username', username)
      .single()

    if (existingUser) {
      throw new Error('用戶名已存在')
    }

    // 檢查email是否已存在
    const { data: existingEmail } = await supabase
      .from('global_user')
      .select('*')
      .eq('email', email)
      .single()

    if (existingEmail) {
      throw new Error('Email已被註冊')
    }

    // 加密密碼
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // 插入新用戶
    const { data, error } = await supabase
      .from('global_user')
      .insert([
        {
          username: username,
          email: email,
          password_hash: passwordHash,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, message: '註冊成功' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// 用戶登入
export const loginUser = async (username, password) => {
  try {
    // 根據用戶名查找用戶
    const { data: user, error } = await supabase
      .from('global_user')
      .select('*')
      .eq('username', username)
      .single()

    if (error || !user) {
      throw new Error('用戶名或密碼錯誤')
    }

    // 驗證密碼
    const isPasswordValid = await bcrypt.compare(password, user.password_hash)
    if (!isPasswordValid) {
      throw new Error('用戶名或密碼錯誤')
    }

    // 生成JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        username: user.user,
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    return {
      success: true,
      token,
      user: {
        id: user.id,
        username: user.user,
        email: user.email
      }
    }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// 驗證JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return { success: true, user: decoded }
  } catch (error) {
    return { success: false, message: 'Token無效' }
  }
}

// 中間件：驗證用戶身份
export const authenticateToken = (req, res, next) => {
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