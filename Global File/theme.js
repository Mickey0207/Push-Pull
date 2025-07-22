import { createTheme } from '@mui/material/styles'

// 暗紫主題配色
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a855f7',
      light: '#c084fc',
      dark: '#7c3aed',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ec4899',
      light: '#f9a8d4',
      dark: '#be185d',
      contrastText: '#ffffff'
    },
    background: {
      default: '#1a0b2e',
      paper: '#2d1b4e'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0'
    },
    error: {
      main: '#ef4444'
    },
    warning: {
      main: '#3b82f6'
    },
    info: {
      main: '#c084fc'
    },
    success: {
      main: '#f9a8d4'
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
      textShadow: '0 0 10px #a855f740'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      textShadow: '0 0 8px #a855f730'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      textShadow: '0 0 6px #a855f720'
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
          boxShadow: '0 8px 32px #a855f730',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            boxShadow: '0 12px 40px #a855f750',
            transform: 'translateY(-3px) scale(1.02)'
          }
        },
        contained: {
          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 60%, #3b82f6 80%)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #2d1b4ee6 0%, #2d1b4ecc 100%)',
          border: '1px solid #a855f730',
          boxShadow: '0 16px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 24px 80px #a855f740, 0 0 0 1px #a855f750'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '18px',
            background: '#2d1b4e99',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '& fieldset': {
              borderColor: '#a855f750',
              borderWidth: '2px'
            },
            '&:hover fieldset': {
              borderColor: '#a855f780',
              boxShadow: '0 0 20px #a855f730'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#a855f7',
              boxShadow: '0 0 24px #a855f760, 0 0 0 4px #a855f720'
            }
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #3b82f6 100%)',
          boxShadow: '0 8px 32px #a855f760',
          backdropFilter: 'blur(20px)',
          borderRadius: '0 0 24px 24px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #2d1b4ee6 0%, #2d1b4ecc 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid #a855f730'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #2d1b4ef2 0%, #2d1b4ee6 100%)',
          backdropFilter: 'blur(30px)',
          border: '1px solid #a855f750'
        }
      }
    }
  }
})

export default darkTheme
