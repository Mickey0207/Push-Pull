import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert
} from '@mui/material';
import { Palette, Check } from '@mui/icons-material';

// 主題配色方案
const colorThemes = {
  cyberpunk: {
    name: '賽博朋克',
    description: '現代科技感，適合開發工具',
    primary: '#00d4aa',
    secondary: '#bb86fc',
    accent: '#ff6ec7',
    background: '#0d1117',
    icon: '🤖'
  },
  aurora: {
    name: '極光',
    description: '優雅漸變，適合商務應用',
    primary: '#14b8a6',
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    background: '#0f172a',
    icon: '🌌'
  },
  forest: {
    name: '暗夜森林',
    description: '自然清新，護眼舒適',
    primary: '#10b981',
    secondary: '#3b82f6',
    accent: '#fbbf24',
    background: '#111827',
    icon: '🌲'
  },
  ocean: {
    name: '深海',
    description: '清新深邃，適合長時間使用',
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#f97316',
    background: '#0c1222',
    icon: '🌊'
  },
  purple: {
    name: '暗紫',
    description: '神秘高雅，適合創意應用',
    primary: '#a855f7',
    secondary: '#ec4899',
    accent: '#3b82f6',
    background: '#1a0b2e',
    icon: '🔮'
  }
};

const ThemeSettings = ({ open, onClose, currentTheme = 'cyberpunk' }) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [isApplying, setIsApplying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const applyTheme = async () => {
    setIsApplying(true);
    
    try {
      // 直接應用主題到當前頁面
      const { applyThemeToPage } = await import('../utils/dynamicThemeProvider');
      const newTheme = applyThemeToPage(selectedTheme);
      
      // 觸發全局主題更新事件
      window.dispatchEvent(new CustomEvent('themeChanged', { 
        detail: { themeName: selectedTheme, theme: newTheme } 
      }));
      
      // 發送請求到後端保存主題偏好
      const response = await fetch('/api/user/apply-theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ theme: selectedTheme })
      });

      if (response.ok) {
        setShowSuccess(true);
        
        // 短暫延遲後關閉對話框，不重新載入頁面
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
        }, 1500);
      } else {
        console.error('主題保存失敗，但主題已應用到當前頁面');
        // 即使後端失敗，主題仍然已經應用
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
        }, 1500);
      }
    } catch (error) {
      console.error('主題應用錯誤:', error);
      // 嘗試直接應用主題
      try {
        const { applyThemeToPage } = await import('../utils/dynamicThemeProvider');
        const newTheme = applyThemeToPage(selectedTheme);
        
        // 觸發全局主題更新事件
        window.dispatchEvent(new CustomEvent('themeChanged', { 
          detail: { themeName: selectedTheme, theme: newTheme } 
        }));
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
        }, 1500);
      } catch (fallbackError) {
        console.error('主題應用完全失敗:', fallbackError);
      }
    } finally {
      setIsApplying(false);
    }
  };

  const handleSave = () => {
    applyTheme();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.95) 100%)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(26, 35, 126, 0.3)'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        borderBottom: '1px solid rgba(26, 35, 126, 0.2)',
        pb: 2
      }}>
        <Palette sx={{ color: 'primary.main' }} />
        <Typography variant="h5" component="div">
          主題配色設定
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {showSuccess && (
          <Alert 
            severity="success" 
            sx={{ mb: 3, borderRadius: '16px' }}
            icon={<Check />}
          >
            主題已成功應用！頁面將自動重新載入...
          </Alert>
        )}

        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          選擇你喜歡的配色方案
        </Typography>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>主題配色</InputLabel>
          <Select
            value={selectedTheme}
            label="主題配色"
            onChange={handleThemeChange}
            sx={{ borderRadius: '16px' }}
          >
            {Object.entries(colorThemes).map(([key, theme]) => (
              <MenuItem key={key} value={key}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{theme.icon}</span>
                  <span>{theme.name}</span>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 主題預覽卡片 */}
        <Grid container spacing={2}>
          {Object.entries(colorThemes).map(([key, theme]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Card
                sx={{
                  borderRadius: '20px',
                  border: selectedTheme === key ? `2px solid ${theme.primary}` : '1px solid rgba(255,255,255,0.1)',
                  background: `linear-gradient(135deg, ${theme.background}e6 0%, ${theme.background}cc 100%)`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 32px ${theme.primary}40`
                  }
                }}
                onClick={() => setSelectedTheme(key)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
                      {theme.icon} {theme.name}
                    </Typography>
                    {selectedTheme === key && (
                      <Chip 
                        label="已選擇" 
                        size="small" 
                        sx={{ 
                          backgroundColor: theme.primary,
                          color: '#000',
                          fontWeight: 'bold'
                        }} 
                      />
                    )}
                  </Box>
                  
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                    {theme.description}
                  </Typography>

                  {/* 顏色預覽 */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: theme.primary,
                        border: '2px solid rgba(255,255,255,0.2)'
                      }}
                    />
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: theme.secondary,
                        border: '2px solid rgba(255,255,255,0.2)'
                      }}
                    />
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: theme.accent,
                        border: '2px solid rgba(255,255,255,0.2)'
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: '1px solid rgba(26, 35, 126, 0.2)' }}>
        <Button 
          onClick={onClose}
          sx={{ borderRadius: '16px' }}
        >
          取消
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSave}
          disabled={isApplying}
          sx={{ 
            borderRadius: '16px',
            minWidth: 120
          }}
        >
          {isApplying ? '應用中...' : '儲存並應用'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThemeSettings;