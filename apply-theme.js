// 應用選定的主題配色
const fs = require('fs');
const colorThemes = require('./color-themes.js');

// 從命令行參數獲取主題名稱
const themeName = process.argv[2];

if (!themeName || !colorThemes[themeName]) {
  console.log('❌ 請指定有效的主題名稱！');
  console.log('\n可用主題:');
  Object.keys(colorThemes).forEach(key => {
    console.log(`  - ${key} (${colorThemes[key].name})`);
  });
  console.log('\n使用方法: node apply-theme.js [主題名稱]');
  console.log('例如: node apply-theme.js cyberpunk');
  process.exit(1);
}

const selectedTheme = colorThemes[themeName];
console.log(`🎨 正在應用主題: ${selectedTheme.name}`);

// 生成新的主題文件內容
const themeContent = `import { createTheme } from '@mui/material/styles'

// ${selectedTheme.name}主題配色
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '${selectedTheme.primary.main}',
      light: '${selectedTheme.primary.light}',
      dark: '${selectedTheme.primary.dark}',
      contrastText: '${selectedTheme.primary.contrastText}'
    },
    secondary: {
      main: '${selectedTheme.secondary.main}',
      light: '${selectedTheme.secondary.light}',
      dark: '${selectedTheme.secondary.dark}',
      contrastText: '${selectedTheme.secondary.contrastText}'
    },
    background: {
      default: '${selectedTheme.background.default}',
      paper: '${selectedTheme.background.paper}'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0'
    },
    error: {
      main: '#ef4444'
    },
    warning: {
      main: '${selectedTheme.accent}'
    },
    info: {
      main: '${selectedTheme.primary.light}'
    },
    success: {
      main: '${selectedTheme.secondary.light}'
    }
  },
  typography: {
    fontFamily: [
      'iansui',
      'Noto Sans TC',
      'Microsoft JhengHei',
      'sans-serif'
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      textShadow: '0 0 10px ${selectedTheme.primary.main}40'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      textShadow: '0 0 8px ${selectedTheme.primary.main}30'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      textShadow: '0 0 6px ${selectedTheme.primary.main}20'
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          padding: '12px 32px',
          boxShadow: '0 8px 32px ${selectedTheme.primary.main}30',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            boxShadow: '0 12px 40px ${selectedTheme.primary.main}50',
            transform: 'translateY(-3px) scale(1.02)'
          }
        },
        contained: {
          background: '${selectedTheme.gradient}',
          '&:hover': {
            background: '${selectedTheme.gradient.replace(/0\./g, '0.8').replace(/50%/g, '60%').replace(/100%/g, '80%')}'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          background: 'linear-gradient(135deg, ${selectedTheme.background.paper}e6 0%, ${selectedTheme.background.paper}cc 100%)',
          border: '1px solid ${selectedTheme.primary.main}30',
          boxShadow: '0 16px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 24px 80px ${selectedTheme.primary.main}40, 0 0 0 1px ${selectedTheme.primary.main}50'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '18px',
            background: '${selectedTheme.background.paper}99',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
              borderColor: '${selectedTheme.primary.main}50',
              borderWidth: '2px'
            },
            '&:hover fieldset': {
              borderColor: '${selectedTheme.primary.main}80',
              boxShadow: '0 0 20px ${selectedTheme.primary.main}30'
            },
            '&.Mui-focused fieldset': {
              borderColor: '${selectedTheme.primary.main}',
              boxShadow: '0 0 24px ${selectedTheme.primary.main}60, 0 0 0 4px ${selectedTheme.primary.main}20'
            }
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '${selectedTheme.gradient}',
          boxShadow: '0 8px 32px ${selectedTheme.primary.main}60',
          backdropFilter: 'blur(20px)',
          borderRadius: '0 0 24px 24px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          background: 'linear-gradient(135deg, ${selectedTheme.background.paper}e6 0%, ${selectedTheme.background.paper}cc 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid ${selectedTheme.primary.main}30'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '24px',
          background: 'linear-gradient(135deg, ${selectedTheme.background.paper}f2 0%, ${selectedTheme.background.paper}e6 100%)',
          backdropFilter: 'blur(30px)',
          border: '1px solid ${selectedTheme.primary.main}50'
        }
      }
    }
  }
})

export default darkTheme
`;

// 寫入主題文件
fs.writeFileSync('Global File/theme.js', themeContent);

console.log('✅ 主題已成功應用！');
console.log(`🎨 主題: ${selectedTheme.name}`);
console.log(`🎯 主色調: ${selectedTheme.primary.main}`);
console.log(`🎯 次色調: ${selectedTheme.secondary.main}`);
console.log(`🎯 強調色: ${selectedTheme.accent}`);
console.log('\n現在請重新構建應用以查看效果:');
console.log('npm run manual-build && npm run dev');