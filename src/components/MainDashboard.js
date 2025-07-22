import React from 'react'
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material'
import {
  Group as CollaborationIcon,
  Build as MaintenanceIcon,
  CheckCircle as InspectionIcon,
  Assignment as ProjectIcon,
  Assessment as ReportIcon,
  Person as UserIcon,
  Logout,
  AccountCircle
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const MainDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    onLogout()
  }

  const applications = [
    {
      title: '協作',
      description: '多人協作的git雲端版本管理系統',
      icon: <CollaborationIcon sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/collaboration',
      color: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 100%)'
    },
    {
      title: '維修',
      description: '設備維修管理系統',
      icon: <MaintenanceIcon sx={{ fontSize: 60, color: 'warning.main' }} />,
      path: '/maintenance',
      color: 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)'
    },
    {
      title: '檢核',
      description: '品質檢核管理系統',
      icon: <InspectionIcon sx={{ fontSize: 60, color: 'success.main' }} />,
      path: '/inspection',
      color: 'linear-gradient(135deg, #388e3c 0%, #4caf50 100%)'
    },
    {
      title: '專案',
      description: '專案管理系統',
      icon: <ProjectIcon sx={{ fontSize: 60, color: 'info.main' }} />,
      path: '/project',
      color: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)'
    },
    {
      title: '報表',
      description: '數據報表分析系統',
      icon: <ReportIcon sx={{ fontSize: 60, color: 'secondary.main' }} />,
      path: '/report',
      color: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)'
    },
    {
      title: '用戶',
      description: '用戶管理系統',
      icon: <UserIcon sx={{ fontSize: 60, color: 'error.main' }} />,
      path: '/user',
      color: 'linear-gradient(135deg, #d32f2f 0%, #f44336 100%)'
    }
  ]

  const handleAppClick = (path) => {
    navigate(path)
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            整合型網頁應用程式系統
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
              歡迎，{user?.username}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <AccountCircle sx={{ mr: 1 }} />
                個人資料
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} />
                登出
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #1a237e, #7b1fa2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(26, 35, 126, 0.5)',
              fontWeight: 700,
              animation: 'fadeIn 1s ease-out'
            }}
          >
            選擇應用程式
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ animation: 'fadeIn 1s ease-out 0.2s both' }}
          >
            請選擇您要使用的應用程式模組
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {applications.map((app, index) => (
            <Grid item xs={12} sm={6} md={4} key={app.title}>
              <Card
                className="animated-card"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                  border: '1px solid rgba(26, 35, 126, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease-in-out',
                  animation: `fadeIn 0.8s ease-out ${index * 0.1}s both`,
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 15px 40px rgba(26, 35, 126, 0.3)',
                    '& .app-icon': {
                      transform: 'scale(1.1) rotate(5deg)'
                    }
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                  <Box
                    className="app-icon"
                    sx={{
                      mb: 2,
                      transition: 'transform 0.3s ease-in-out',
                      filter: 'drop-shadow(0 0 10px rgba(26, 35, 126, 0.3))'
                    }}
                  >
                    {app.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      background: app.color,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {app.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {app.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => handleAppClick(app.path)}
                    sx={{
                      py: 1.5,
                      borderRadius: '12px',
                      background: app.color,
                      fontWeight: 600,
                      fontSize: '1rem',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.4)'
                      }
                    }}
                  >
                    進入 {app.title}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 整合型網頁應用程式系統. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default MainDashboard