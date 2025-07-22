import React, { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import {
  FolderOpen,
  MoreVert,
  Group,
  Schedule,
  Star,
  StarBorder
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const ProjectList = ({ user, onProjectSelect }) => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/collaboration/projects', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setProjects(data.projects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProjectClick = (project) => {
    onProjectSelect(project)
    navigate(`/collaboration/project/${project.id}`)
  }

  const handleMenuClick = (event, project) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
    setSelectedProject(project)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedProject(null)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-TW')
  }

  // 模擬專案資料（實際應從後端獲取）
  const mockProjects = [
    {
      id: 1,
      name: '網站前端專案',
      description: '公司官網前端開發專案',
      type: 'frontend',
      collaborators: 3,
      lastUpdated: '2024-01-15',
      isStarred: true,
      status: 'active'
    },
    {
      id: 2,
      name: 'API 後端服務',
      description: '微服務架構的後端 API 開發',
      type: 'backend',
      collaborators: 5,
      lastUpdated: '2024-01-14',
      isStarred: false,
      status: 'active'
    },
    {
      id: 3,
      name: '移動應用程式',
      description: 'React Native 跨平台移動應用',
      type: 'mobile',
      collaborators: 2,
      lastUpdated: '2024-01-13',
      isStarred: true,
      status: 'completed'
    }
  ]

  const displayProjects = projects.length > 0 ? projects : mockProjects

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div className="loading-spinner"></div>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #1a237e, #7b1fa2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700
          }}
        >
          我的專案
        </Typography>
        <Typography variant="h6" color="text.secondary">
          管理您的 Git 專案和協作
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {displayProjects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              className="animated-card"
              sx={{
                height: '100%',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                border: '1px solid rgba(26, 35, 126, 0.3)',
                cursor: 'pointer',
                animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(26, 35, 126, 0.2)'
                }
              }}
              onClick={() => handleProjectClick(project)}
            >
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 40,
                        height: 40
                      }}
                    >
                      <FolderOpen />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        {project.name}
                      </Typography>
                      <Chip
                        label={project.type}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(26, 35, 126, 0.2)',
                          color: 'primary.main',
                          fontSize: '0.75rem'
                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <IconButton
                      size="small"
                      sx={{ color: project.isStarred ? 'warning.main' : 'text.secondary' }}
                    >
                      {project.isStarred ? <Star /> : <StarBorder />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, project)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: '40px' }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Group sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {project.collaborators} 協作者
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(project.lastUpdated)}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={project.status === 'active' ? '進行中' : '已完成'}
                  size="small"
                  color={project.status === 'active' ? 'success' : 'default'}
                  sx={{ mt: 1 }}
                />
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<FolderOpen />}
                  sx={{
                    borderRadius: '8px',
                    background: 'linear-gradient(45deg, #1a237e 30%, #7b1fa2 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #3f51b5 30%, #9c27b0 90%)'
                    }
                  }}
                >
                  開啟專案
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 專案選單 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            border: '1px solid rgba(26, 35, 126, 0.3)'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>編輯專案</MenuItem>
        <MenuItem onClick={handleMenuClose}>專案設定</MenuItem>
        <MenuItem onClick={handleMenuClose}>刪除專案</MenuItem>
      </Menu>
    </Box>
  )
}

export default ProjectList