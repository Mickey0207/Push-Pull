// 主題應用工具
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

// 應用主題到頁面
export const applyThemeToPage = (themeName) => {
  const theme = colorThemes[themeName];
  if (!theme) return;

  // 設置 CSS 變數
  const root = document.documentElement;
  root.style.setProperty('--primary-color', theme.primary.main);
  root.style.setProperty('--secondary-color', theme.secondary.main);
  root.style.setProperty('--accent-color', theme.accent);
  root.style.setProperty('--bg-default', theme.background.default);
  root.style.setProperty('--bg-paper', theme.background.paper);
  root.style.setProperty('--gradient', theme.gradient);
  root.style.setProperty('--bg-gradient', `linear-gradient(135deg, ${theme.background.default} 0%, ${theme.background.paper} 100%)`);

  // 保存到本地存儲
  localStorage.setItem('selectedTheme', themeName);
  
  console.log(`主題 ${theme.name} 已應用`);
};

// 從本地存儲載入主題
export const loadSavedTheme = () => {
  const savedTheme = localStorage.getItem('selectedTheme') || 'cyberpunk';
  applyThemeToPage(savedTheme);
  return savedTheme;
};

export { colorThemes };