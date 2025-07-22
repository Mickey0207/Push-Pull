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
  Build,
  Assignment,
  Schedule,
  CheckCircle
} from '@mui/icons-material'

const MaintenanceApp = ({ user }) => {
  const navigate = useNavigate()

  const maintenanceModules = [
    {
      title: '設備管理',
      description: '管理所有設備資訊和狀態',
      icon: <Build sx={{ fontSize: 60, color: 'warning.main' }} />,
      path: '/equipment'
    },
    {
      title: '維修工單',
      description: '創建和追蹤維修工單',
      icon: <Assignment sx={{ fontSize: 60, color: 'info.main' }} />,
      path: '/work-orders'
    },
    {
      title: '預防性維護',
      description: '排程和管理預防性維護',
      icon: <Schedule sx={{ fontSize: 60, color: 'success.main' }} />,
      path: '/preventive'
    },
    {
      title: '維修歷史',
      description: '查看設備維修歷史記錄',
      icon: <CheckCircle sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/history'
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
            維修管理系統
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
              background: 'linear-gradient(45deg, #f57c00, #ff9800)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}
          >
            維修管理系統
          </Typography>
          <Typography variant="h6" color="text.secondary">
            設備維修與保養管理平台
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {maintenanceModules.map((module, index) => (
            <Grid item xs={12} sm={6} md={3} key={module.title}>
              <Card
                className="animated-card"
                sx={{
                  height: '100%',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                  border: '1px solid rgba(245, 124, 0, 0.3)',
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
                      background: 'linear-gradient(45deg, #f57c00 30%, #ff9800 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #ff9800 30%, #ffa726 90%)'
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

export default MaintenanceApp