// 動態主題提供者
import { createTheme } from '@mui/material/styles';

const colorThemes = {
  cyberpunk: {
    name: '賽博朋克',
    primary: { main: '#00d4aa', light: '#4fffdf', dark: '#00a085', contrastText: '#000000' },
    secondary: { main: '#bb86fc', light: '#efb7ff', dark: '#8858c8', contrastText: '#000000' },
    accent: '#ff6ec7',
    background: { default: '#0d1117', paper: '#161b22' },
    gradient: 'linear-gradient(135deg, #00d4aa 0%, #bb86fc 50%, #ff6ec7 100%)'
  },
  aurora: {
    name: '極光',
    primary: { main: '#14b8a6', light: '#5eead4', dark: '#0f766e', contrastText: '#ffffff' },
    secondary: { main: '#8b5cf6', light: '#c4b5fd', dark: '#6d28d9', contrastText: '#ffffff' },
    accent: '#f59e0b',
    background: { default: '#0f172a', paper: '#1e293b' },
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #8b5cf6 50%, #f59e0b 100%)'
  },
  forest: {
    name: '暗夜森林',
    primary: { main: '#10b981', light: '#6ee7b7', dark: '#047857', contrastText: '#ffffff' },
    secondary: { main: '#3b82f6', light: '#93c5fd', dark: '#1d4ed8', contrastText: '#ffffff' },
    accent: '#fbbf24',
    background: { default: '#111827', paper: '#1f2937' },
    gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #fbbf24 100%)'
  },
  ocean: {
    name: '深海',
    primary: { main: '#0ea5e9', light: '#7dd3fc', dark: '#0369a1', contrastText: '#ffffff' },
    secondary: { main: '#06b6d4', light: '#67e8f9', dark: '#0891b2', contrastText: '#ffffff' },
    accent: '#f97316',
    background: { default: '#0c1222', paper: '#1a2332' },
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #f97316 100%)'
  },
  purple: {
    name: '暗紫',
    primary: { main: '#a855f7', light: '#c084fc', dark: '#7c3aed', contrastText: '#ffffff' },
    secondary: { main: '#ec4899', light: '#f9a8d4', dark: '#be185d', contrastText: '#ffffff' },
    accent: '#3b82f6',
    background: { default: '#1a0b2e', paper: '#2d1b4e' },
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)'
  }
};

// 創建動態主題
export const createDynamicTheme = (themeName = 'cyberpunk') => {
  const selectedTheme = colorThemes[themeName] || colorThemes.cyberpunk;
  
  return createTheme({
    palette: {
      mode: 'dark',
      primary: selectedTheme.primary,
      secondary: selectedTheme.secondary,
      background: selectedTheme.background,
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0'
      },
      error: { main: '#ef4444' },
      warning: { main: selectedTheme.accent },
      info: { main: selectedTheme.primary.light },
      success: { main: selectedTheme.secondary.light }
    },
    typography: {
      fontFamily: ['iansui', 'Noto Sans TC', 'Microsoft JhengHei', 'sans-serif'].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        textShadow: `0 0 10px ${selectedTheme.primary.main}40`
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        textShadow: `0 0 8px ${selectedTheme.primary.main}30`
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
        textShadow: `0 0 6px ${selectedTheme.primary.main}20`
      },
      button: { textTransform: 'none', fontWeight: 500 }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            padding: '12px 32px',
            boxShadow: `0 8px 32px ${selectedTheme.primary.main}30`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            '&:hover': {
              boxShadow: `0 12px 40px ${selectedTheme.primary.main}50`,
              transform: 'translateY(-3px) scale(1.02)'
            }
          },
          contained: {
            background: selectedTheme.gradient,
            '&:hover': {
              background: selectedTheme.gradient.replace(/0\./g, '0.8').replace(/50%/g, '60%').replace(/100%/g, '80%')
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '24px',
            background: `linear-gradient(135deg, ${selectedTheme.background.paper}e6 0%, ${selectedTheme.background.paper}cc 100%)`,
            border: `1px solid ${selectedTheme.primary.main}30`,
            boxShadow: '0 16px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px) scale(1.02)',
              boxShadow: `0 24px 80px ${selectedTheme.primary.main}40, 0 0 0 1px ${selectedTheme.primary.main}50`
            }
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '18px',
              background: `${selectedTheme.background.paper}99`,
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '& fieldset': {
                borderColor: `${selectedTheme.primary.main}50`,
                borderWidth: '2px'
              },
              '&:hover fieldset': {
                borderColor: `${selectedTheme.primary.main}80`,
                boxShadow: `0 0 20px ${selectedTheme.primary.main}30`
              },
              '&.Mui-focused fieldset': {
                borderColor: selectedTheme.primary.main,
                boxShadow: `0 0 24px ${selectedTheme.primary.main}60, 0 0 0 4px ${selectedTheme.primary.main}20`
              }
            }
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: selectedTheme.gradient,
            boxShadow: `0 8px 32px ${selectedTheme.primary.main}60`,
            backdropFilter: 'blur(20px)',
            borderRadius: '0 0 24px 24px'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${selectedTheme.background.paper}e6 0%, ${selectedTheme.background.paper}cc 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${selectedTheme.primary.main}30`
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: '24px',
            background: `linear-gradient(135deg, ${selectedTheme.background.paper}f2 0%, ${selectedTheme.background.paper}e6 100%)`,
            backdropFilter: 'blur(30px)',
            border: `1px solid ${selectedTheme.primary.main}50`
          }
        }
      }
    }
  });
};

// 應用主題到頁面
export const applyThemeToPage = (themeName) => {
  const theme = colorThemes[themeName];
  if (!theme) {
    console.error(`主題 ${themeName} 不存在`);
    return null;
  }

  console.log(`正在應用主題: ${theme.name}`);

  // 設置 CSS 變數
  const root = document.documentElement;
  root.style.setProperty('--primary-color', theme.primary.main);
  root.style.setProperty('--secondary-color', theme.secondary.main);
  root.style.setProperty('--accent-color', theme.accent);
  root.style.setProperty('--bg-default', theme.background.default);
  root.style.setProperty('--bg-paper', theme.background.paper);
  root.style.setProperty('--gradient', theme.gradient);
  root.style.setProperty('--bg-gradient', `linear-gradient(135deg, ${theme.background.default} 0%, ${theme.background.paper} 100%)`);

  // 直接更新頁面背景
  document.body.style.background = `linear-gradient(135deg, ${theme.background.default} 0%, ${theme.background.paper} 100%)`;
  
  const appElement = document.querySelector('.App');
  if (appElement) {
    appElement.style.background = `linear-gradient(135deg, ${theme.background.default} 0%, ${theme.background.paper} 100%)`;
  }

  // 保存到本地存儲
  localStorage.setItem('selectedTheme', themeName);
  
  console.log(`✅ 主題 ${theme.name} 已成功應用`);
  
  // 返回新的主題對象
  return createDynamicTheme(themeName);
};

export { colorThemes };