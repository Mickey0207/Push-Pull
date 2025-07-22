import React, { useState } from 'react'
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
  Person,
  Group,
  Security,
  Settings
} from '@mui/icons-material'
import ThemeSettings from './components/ThemeSettings'

const UserApp = ({ user }) => {
  const navigate = useNavigate()
  const [themeDialogOpen, setThemeDialogOpen] = useState(false)

  const userModules = [
    {
      title: '用戶管理',
      description: '管理系統用戶和帳號',
      icon: <Person sx={{ fontSize: 60, color: 'error.main' }} />,
      path: '/management'
    },
    {
      title: '角色權限',
      description: '設定用戶角色和權限',
      icon: <Security sx={{ fontSize: 60, color: 'warning.main' }} />,
      path: '/roles'
    },
    {
      title: '群組管理',
      description: '管理用戶群組和部門',
      icon: <Group sx={{ fontSize: 60, color: 'info.main' }} />,
      path: '/groups'
    },
    {
      title: '系統設定',
      description: '主題配色、系統參數和配置管理',
      icon: <Settings sx={{ fontSize: 60, color: 'success.main' }} />,
      path: '/settings',
      action: () => setThemeDialogOpen(true)
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
            用戶管理系統
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
              background: 'linear-gradient(45deg, #d32f2f, #f44336)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}
          >
            用戶管理系統
          </Typography>
          <Typography variant="h6" color="text.secondary">
            用戶權限與系統管理平台
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {userModules.map((module, index) => (
            <Grid item xs={12} sm={6} md={3} key={module.title}>
              <Card
                className="animated-card"
                sx={{
                  height: '100%',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                  border: '1px solid rgba(211, 47, 47, 0.3)',
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
                    onClick={module.action || (() => navigate(`/user${module.path}`))}
                    sx={{
                      background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #f44336 30%, #ef5350 90%)'
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

      {/* 主題設定對話框 */}
      <ThemeSettings
        open={themeDialogOpen}
        onClose={() => setThemeDialogOpen(false)}
        currentTheme={localStorage.getItem('selectedTheme') || 'cyberpunk'}
      />
    </Box>
  )
}

export default UserApp