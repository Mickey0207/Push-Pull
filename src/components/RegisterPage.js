import React, { useState } from 'react'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material'
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  PersonAdd
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess('')
  }

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('請輸入用戶名')
      return false
    }
    if (formData.username.length < 3) {
      setError('用戶名至少需要3個字符')
      return false
    }
    if (!formData.email.trim()) {
      setError('請輸入Email')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('請輸入有效的Email格式')
      return false
    }
    if (!formData.password) {
      setError('請輸入密碼')
      return false
    }
    if (formData.password.length < 6) {
      setError('密碼至少需要6個字符')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('密碼確認不一致')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('註冊成功！請前往登入頁面')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setError(data.message || '註冊失敗')
      }
    } catch (error) {
      setError('網路錯誤，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Paper
        elevation={24}
        sx={{
          width: '100%',
          p: 4,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
          border: '1px solid rgba(26, 35, 126, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          animation: 'fadeIn 0.8s ease-out'
        }}
        className="fade-in"
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #1a237e, #7b1fa2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(26, 35, 126, 0.5)',
              fontWeight: 700
            }}
          >
            用戶註冊
          </Typography>
          <Typography variant="body1" color="text.secondary">
            建立您的帳號以開始使用系統
          </Typography>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              borderRadius: '12px',
              '& .MuiAlert-icon': {
                color: '#f44336'
              }
            }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              borderRadius: '12px',
              '& .MuiAlert-icon': {
                color: '#4caf50'
              }
            }}
          >
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="username"
            label="用戶名"
            value={formData.username}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: 'primary.main' }} />
                </InputAdornment>
              )
            }}
            helperText="用戶名至少需要3個字符"
          />

          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: 'primary.main' }} />
                </InputAdornment>
              )
            }}
            helperText="請輸入有效的Email地址"
          />

          <TextField
            fullWidth
            name="password"
            label="密碼"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            helperText="密碼至少需要6個字符"
          />

          <TextField
            fullWidth
            name="confirmPassword"
            label="確認密碼"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            helperText="請再次輸入密碼"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={<PersonAdd />}
            sx={{
              mb: 3,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '12px',
              background: 'linear-gradient(45deg, #1a237e 30%, #7b1fa2 90%)',
              boxShadow: '0 0 20px rgba(26, 35, 126, 0.4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #3f51b5 30%, #9c27b0 90%)',
                boxShadow: '0 0 30px rgba(26, 35, 126, 0.6)',
                transform: 'translateY(-2px)'
              },
              '&:disabled': {
                background: 'rgba(26, 35, 126, 0.3)'
              }
            }}
          >
            {loading ? '註冊中...' : '註冊'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              已經有帳號？{' '}
              <Link
                component="button"
                type="button"
                onClick={() => navigate('/login')}
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'primary.light'
                  }
                }}
              >
                立即登入
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default RegisterPage