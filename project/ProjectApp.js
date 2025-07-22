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
  Assignment,
  Timeline,
  Group,
  Dashboard
} from '@mui/icons-material'

const ProjectApp = ({ user }) => {
  const navigate = useNavigate()

  const projectModules = [
    {
      title: '專案管理',
      description: '創建和管理專案',
      icon: <Assignment sx={{ fontSize: 60, color: 'info.main' }} />,
      path: '/management'
    },
    {
      title: '進度追蹤',
      description: '監控專案進度和里程碑',
      icon: <Timeline sx={{ fontSize: 60, color: 'success.main' }} />,
      path: '/timeline'
    },
    {
      title: '團隊協作',
      description: '管理團隊成員和任務分配',
      icon: <Group sx={{ fontSize: 60, color: 'warning.main' }} />,
      path: '/team'
    },
    {
      title: '專案儀表板',
      description: '查看專案概覽和統計',
      icon: <Dashboard sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/dashboard'
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
            專案管理系統
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
              background: 'linear-gradient(45deg, #1976d2, #2196f3)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}
          >
            專案管理系統
          </Typography>
          <Typography variant="h6" color="text.secondary">
            專案規劃與執行管理平台
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {projectModules.map((module, index) => (
            <Grid item xs={12} sm={6} md={3} key={module.title}>
              <Card
                className="animated-card"
                sx={{
                  height: '100%',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                  border: '1px solid rgba(25, 118, 210, 0.3)',
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
                      background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #2196f3 30%, #42a5f5 90%)'
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

export default ProjectApp