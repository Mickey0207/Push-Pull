import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Fab
} from '@mui/material'
import {
  ArrowBack,
  Menu as MenuIcon,
  Add as AddIcon,
  FolderOpen,
  GitBranch,
  CloudDownload,
  CloudUpload,
  Merge,
  Commit
} from '@mui/icons-material'
import ProjectList from './components/ProjectList'
import ProjectView from './components/ProjectView'
import CreateProject from './components/CreateProject'

const CollaborationApp = ({ user }) => {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)

  const gitOperations = [
    { name: 'Clone Repository', icon: <CloudDownload />, action: 'clone' },
    { name: 'Commit Changes', icon: <Commit />, action: 'commit' },
    { name: 'Push Changes', icon: <CloudUpload />, action: 'push' },
    { name: 'Pull Changes', icon: <CloudDownload />, action: 'pull' },
    { name: 'Create Branch', icon: <GitBranch />, action: 'branch' },
    { name: 'Merge Branch', icon: <Merge />, action: 'merge' }
  ]

  const handleGitOperation = (action) => {
    console.log(`執行 Git 操作: ${action}`)
    // 這裡將實現具體的 Git 操作
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            協作系統 - Git 雲端版本管理
          </Typography>
          {currentProject && (
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Git 操作側邊欄 */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            mt: 8,
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            border: '1px solid rgba(26, 35, 126, 0.3)'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
            Git 操作
          </Typography>
          <List>
            {gitOperations.map((operation) => (
              <ListItem
                button
                key={operation.action}
                onClick={() => handleGitOperation(operation.action)}
                sx={{
                  borderRadius: '8px',
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(26, 35, 126, 0.2)',
                    transform: 'translateX(4px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main' }}>
                  {operation.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={operation.name}
                  sx={{ '& .MuiListItemText-primary': { fontSize: '0.9rem' } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* 主要內容區域 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
        }}
      >
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Routes>
            <Route 
              path="/" 
              element={
                <ProjectList 
                  user={user} 
                  onProjectSelect={setCurrentProject}
                />
              } 
            />
            <Route 
              path="/create" 
              element={<CreateProject user={user} />} 
            />
            <Route 
              path="/project/:id" 
              element={
                <ProjectView 
                  user={user} 
                  project={currentProject}
                  onProjectChange={setCurrentProject}
                />
              } 
            />
          </Routes>
        </Container>

        {/* 新增專案浮動按鈕 */}
        <Fab
          color="primary"
          aria-label="add project"
          onClick={() => navigate('/collaboration/create')}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(45deg, #1a237e 30%, #7b1fa2 90%)',
            boxShadow: '0 0 20px rgba(26, 35, 126, 0.4)',
            '&:hover': {
              background: 'linear-gradient(45deg, #3f51b5 30%, #9c27b0 90%)',
              boxShadow: '0 0 30px rgba(26, 35, 126, 0.6)',
              transform: 'scale(1.1)'
            }
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  )
}

export default CollaborationApp