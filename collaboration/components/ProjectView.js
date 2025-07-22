import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Breadcrumbs,
  Link,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import {
  Folder,
  InsertDriveFile,
  ArrowBack,
  Upload,
  CreateNewFolder,
  Delete,
  Edit,
  Download
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

const ProjectView = ({ user, project, onProjectChange }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [currentPath, setCurrentPath] = useState([])
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState('') // 'folder', 'upload', 'rename'
  const [dialogValue, setDialogValue] = useState('')

  useEffect(() => {
    if (id && !project) {
      fetchProject(id)
    }
    fetchFiles()
  }, [id, currentPath])

  const fetchProject = async (projectId) => {
    try {
      const response = await fetch(`/api/collaboration/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      const data = await response.json()
      if (data.success) {
        onProjectChange(data.project)
      }
    } catch (error) {
      console.error('Error fetching project:', error)
    }
  }

  const fetchFiles = async () => {
    try {
      // 模擬文件結構
      const mockFiles = [
        {
          name: 'src',
          type: 'folder',
          size: null,
          modified: '2024-01-15'
        },
        {
          name: 'public',
          type: 'folder',
          size: null,
          modified: '2024-01-14'
        },
        {
          name: 'package.json',
          type: 'file',
          size: '2.1 KB',
          modified: '2024-01-15'
        },
        {
          name: 'README.md',
          type: 'file',
          size: '1.5 KB',
          modified: '2024-01-13'
        },
        {
          name: '.gitignore',
          type: 'file',
          size: '0.8 KB',
          modified: '2024-01-12'
        }
      ]
      setFiles(mockFiles)
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  const handleFileClick = (file) => {
    if (file.type === 'folder') {
      setCurrentPath([...currentPath, file.name])
    } else {
      setSelectedFile(file)
      // 這裡可以打開文件編輯器
    }
  }

  const handleBreadcrumbClick = (index) => {
    setCurrentPath(currentPath.slice(0, index))
  }

  const handleDialog = (type) => {
    setDialogType(type)
    setDialogValue('')
    setDialogOpen(true)
  }

  const handleDialogSubmit = () => {
    switch (dialogType) {
      case 'folder':
        console.log('創建資料夾:', dialogValue)
        break
      case 'upload':
        console.log('上傳文件:', dialogValue)
        break
      case 'rename':
        console.log('重命名:', dialogValue)
        break
    }
    setDialogOpen(false)
  }

  const getFileIcon = (file) => {
    return file.type === 'folder' ? <Folder color="primary" /> : <InsertDriveFile />
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-TW')
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/collaboration')}
            sx={{ mb: 2 }}
          >
            返回專案列表
          </Button>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              background: 'linear-gradient(45deg, #1a237e, #7b1fa2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600
            }}
          >
            {project?.name || '專案檢視'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {project?.description}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<CreateNewFolder />}
            onClick={() => handleDialog('folder')}
          >
            新增資料夾
          </Button>
          <Button
            variant="contained"
            startIcon={<Upload />}
            onClick={() => handleDialog('upload')}
            sx={{
              background: 'linear-gradient(45deg, #1a237e 30%, #7b1fa2 90%)'
            }}
          >
            上傳文件
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* 文件瀏覽器 */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
              border: '1px solid rgba(26, 35, 126, 0.3)',
              overflow: 'hidden'
            }}
          >
            {/* 路徑導航 */}
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(26, 35, 126, 0.2)' }}>
              <Breadcrumbs>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setCurrentPath([])}
                  sx={{ color: 'primary.main' }}
                >
                  根目錄
                </Link>
                {currentPath.map((path, index) => (
                  <Link
                    key={index}
                    component="button"
                    variant="body2"
                    onClick={() => handleBreadcrumbClick(index + 1)}
                    sx={{ color: 'primary.main' }}
                  >
                    {path}
                  </Link>
                ))}
              </Breadcrumbs>
            </Box>

            {/* 文件列表 */}
            <List sx={{ p: 0 }}>
              {files.map((file, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleFileClick(file)}
                  sx={{
                    borderBottom: index < files.length - 1 ? '1px solid rgba(26, 35, 126, 0.1)' : 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(26, 35, 126, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon>
                    {getFileIcon(file)}
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(file.modified)}
                        </Typography>
                        {file.size && (
                          <Chip
                            label={file.size}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.7rem',
                              bgcolor: 'rgba(26, 35, 126, 0.2)'
                            }}
                          />
                        )}
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDialog('rename') }}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Download fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 專案資訊側邊欄 */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
              border: '1px solid rgba(26, 35, 126, 0.3)'
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
              專案資訊
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                專案類型
              </Typography>
              <Chip
                label={project?.type || 'frontend'}
                sx={{
                  bgcolor: 'rgba(26, 35, 126, 0.2)',
                  color: 'primary.main'
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                創建時間
              </Typography>
              <Typography variant="body2">
                {project?.createdAt ? formatDate(project.createdAt) : '2024-01-15'}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                最後更新
              </Typography>
              <Typography variant="body2">
                {project?.updatedAt ? formatDate(project.updatedAt) : '2024-01-15'}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                協作者
              </Typography>
              <Typography variant="body2">
                3 位成員
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 2 }}
            >
              專案設定
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* 對話框 */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            border: '1px solid rgba(26, 35, 126, 0.3)'
          }
        }}
      >
        <DialogTitle>
          {dialogType === 'folder' && '創建新資料夾'}
          {dialogType === 'upload' && '上傳文件'}
          {dialogType === 'rename' && '重命名'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label={
              dialogType === 'folder' ? '資料夾名稱' :
              dialogType === 'upload' ? '選擇文件' :
              '新名稱'
            }
            value={dialogValue}
            onChange={(e) => setDialogValue(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>取消</Button>
          <Button onClick={handleDialogSubmit} variant="contained">
            確認
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ProjectView