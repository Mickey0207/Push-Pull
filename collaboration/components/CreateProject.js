import React, { useState } from 'react'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider
} from '@mui/material'
import {
  CloudDownload,
  Add,
  ArrowBack
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const CreateProject = ({ user }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'frontend',
    repoUrl: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(null) // 'clone' or 'create'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/collaboration/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          ...formData,
          mode
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('專案創建成功！')
        setTimeout(() => {
          navigate('/collaboration')
        }, 2000)
      } else {
        setError(data.message || '創建專案失敗')
      }
    } catch (error) {
      setError('網路錯誤，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  const projectTypes = [
    { value: 'frontend', label: '前端專案' },
    { value: 'backend', label: '後端專案' },
    { value: 'fullstack', label: '全端專案' },
    { value: 'mobile', label: '移動應用' },
    { value: 'desktop', label: '桌面應用' },
    { value: 'library', label: '函式庫' },
    { value: 'documentation', label: '文檔專案' },
    { value: 'other', label: '其他' }
  ]

  if (!mode) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/collaboration')}
            sx={{ mb: 2 }}
          >
            返回專案列表
          </Button>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #1a237e, #7b1fa2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              textAlign: 'center'
            }}
          >
            建立新專案
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
            選擇您要如何開始新專案
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              className="animated-card"
              sx={{
                height: '100%',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                border: '1px solid rgba(26, 35, 126, 0.3)',
                cursor: 'pointer'
              }}
              onClick={() => setMode('clone')}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <CloudDownload
                  sx={{
                    fontSize: 80,
                    color: 'primary.main',
                    mb: 2,
                    filter: 'drop-shadow(0 0 10px rgba(26, 35, 126, 0.5))'
                  }}
                />
                <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                  複製資料庫
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  從現有的 Git 資料庫複製專案到您的工作區
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 支援 GitHub、GitLab、Bitbucket
                  <br />
                  • 自動同步遠端變更
                  <br />
                  • 保持版本歷史記錄
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CloudDownload />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    background: 'linear-gradient(45deg, #1a237e 30%, #7b1fa2 90%)'
                  }}
                >
                  選擇複製
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              className="animated-card"
              sx={{
                height: '100%',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                border: '1px solid rgba(123, 31, 162, 0.3)',
                cursor: 'pointer'
              }}
              onClick={() => setMode('create')}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Add
                  sx={{
                    fontSize: 80,
                    color: 'secondary.main',
                    mb: 2,
                    filter: 'drop-shadow(0 0 10px rgba(123, 31, 162, 0.5))'
                  }}
                />
                <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                  創建資料庫
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  建立全新的 Git 專案並開始您的開發工作
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • 全新的 Git 資料庫
                  <br />
                  • 自定義專案結構
                  <br />
                  • 完整的版本控制
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Add />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    background: 'linear-gradient(45deg, #7b1fa2 30%, #1a237e 90%)'
                  }}
                >
                  選擇創建
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => setMode(null)}
        sx={{ mb: 3 }}
      >
        返回選擇
      </Button>

      <Paper
        elevation={24}
        sx={{
          p: 4,
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
          border: '1px solid rgba(26, 35, 126, 0.3)'
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 3,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #1a237e, #7b1fa2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600
          }}
        >
          {mode === 'clone' ? '複製 Git 資料庫' : '創建新 Git 資料庫'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3, borderRadius: '12px' }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="專案名稱"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            helperText="為您的專案取一個有意義的名稱"
          />

          <TextField
            fullWidth
            name="description"
            label="專案描述"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            sx={{ mb: 3 }}
            helperText="簡要描述這個專案的目的和功能"
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>專案類型</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="專案類型"
            >
              {projectTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {mode === 'clone' && (
            <TextField
              fullWidth
              name="repoUrl"
              label="Git 資料庫 URL"
              value={formData.repoUrl}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
              helperText="輸入要複製的 Git 資料庫 URL (例如: https://github.com/user/repo.git)"
              placeholder="https://github.com/username/repository.git"
            />
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/collaboration')}
              sx={{ px: 3 }}
            >
              取消
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={mode === 'clone' ? <CloudDownload /> : <Add />}
              sx={{
                px: 3,
                background: 'linear-gradient(45deg, #1a237e 30%, #7b1fa2 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #3f51b5 30%, #9c27b0 90%)'
                }
              }}
            >
              {loading ? '處理中...' : (mode === 'clone' ? '複製專案' : '創建專案')}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default CreateProject