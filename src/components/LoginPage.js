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
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        onLogin(data.token, data.user)
        navigate('/dashboard')
      } else {
        setError(data.message || '登入失敗')
      }
    } catch (error) {
      setError('網路錯誤，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
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
            系統登入
          </Typography>
          <Typography variant="body1" color="text.secondary">
            歡迎使用整合型網頁應用程式系統
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
          />

          <TextField
            fullWidth
            name="password"
            label="密碼"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
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
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={<LoginIcon />}
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
            {loading ? '登入中...' : '登入'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              還沒有帳號？{' '}
              <Link
                component="button"
                type="button"
                onClick={() => navigate('/register')}
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
                立即註冊
              </Link>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4, p: 2, backgroundColor: 'rgba(26, 35, 126, 0.1)', borderRadius: '12px' }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
            預設管理員帳號：admin
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
            預設管理員密碼：adminacl53959233
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginPage