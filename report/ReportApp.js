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
  Assessment,
  BarChart,
  PieChart,
  TrendingUp
} from '@mui/icons-material'

const ReportApp = ({ user }) => {
  const navigate = useNavigate()

  const reportModules = [
    {
      title: '數據分析',
      description: '深度數據分析和洞察',
      icon: <Assessment sx={{ fontSize: 60, color: 'secondary.main' }} />,
      path: '/analytics'
    },
    {
      title: '圖表報表',
      description: '生成各種圖表和視覺化報表',
      icon: <BarChart sx={{ fontSize: 60, color: 'info.main' }} />,
      path: '/charts'
    },
    {
      title: '統計報告',
      description: '統計數據和趨勢報告',
      icon: <PieChart sx={{ fontSize: 60, color: 'warning.main' }} />,
      path: '/statistics'
    },
    {
      title: '趨勢分析',
      description: '業務趨勢和預測分析',
      icon: <TrendingUp sx={{ fontSize: 60, color: 'success.main' }} />,
      path: '/trends'
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
            報表分析系統
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
              background: 'linear-gradient(45deg, #7b1fa2, #9c27b0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}
          >
            報表分析系統
          </Typography>
          <Typography variant="h6" color="text.secondary">
            數據分析與報表生成平台
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {reportModules.map((module, index) => (
            <Grid item xs={12} sm={6} md={3} key={module.title}>
              <Card
                className="animated-card"
                sx={{
                  height: '100%',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                  border: '1px solid rgba(123, 31, 162, 0.3)',
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
                      background: 'linear-gradient(45deg, #7b1fa2 30%, #9c27b0 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)'
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

export default ReportApp