import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material'
import {
  ArrowBack,
  CheckCircle,
  Assignment,
  Assessment,
  Verified
} from '@mui/icons-material'

const InspectionApp = ({ user }) => {
  const navigate = useNavigate()

  const inspectionModules = [
    {
      title: '品質檢核',
      description: '執行產品品質檢核流程',
      icon: <CheckCircle sx={{ fontSize: 60, color: 'success.main' }} />,
      path: '/quality-check'
    },
    {
      title: '檢核表單',
      description: '管理和創建檢核表單',
      icon: <Assignment sx={{ fontSize: 60, color: 'info.main' }} />,
      path: '/forms'
    },
    {
      title: '檢核報告',
      description: '生成和查看檢核報告',
      icon: <Assessment sx={{ fontSize: 60, color: 'warning.main' }} />,
      path: '/reports'
    },
    {
      title: '合規管理',
      description: '確保符合法規和標準',
      icon: <Verified sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/compliance'
    }
  ]

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            檢核管理系統
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #388e3c, #4caf50)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}
          >
            檢核管理系統
          </Typography>
          <Typography variant="h6" color="text.secondary">
            品質檢核與合規管理平台
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {inspectionModules.map((module, index) => (
            <Grid item xs={12} sm={6} md={3} key={module.title}>
              <Card
                className="animated-card"
                sx={{
                  height: '100%',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                  border: '1px solid rgba(56, 142, 60, 0.3)',
                  animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {module.icon}
                  </Box>
                  <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                    {module.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {module.description}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(45deg, #388e3c 30%, #4caf50 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)'
                      }
                    }}
                  >
                    進入
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default InspectionApp