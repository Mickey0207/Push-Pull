import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { createDynamicTheme, applyThemeToPage } from '../user/utils/dynamicThemeProvider'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import MainDashboard from './components/MainDashboard'
import CollaborationApp from '../collaboration/CollaborationApp'
import MaintenanceApp from '../maintenance/MaintenanceApp'
import InspectionApp from '../inspection/InspectionApp'
import ProjectApp from '../project/ProjectApp'
import ReportApp from '../report/ReportApp'
import UserApp from '../user/UserApp'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('selectedTheme') || 'cyberpunk'
    return createDynamicTheme(savedTheme)
  })


  useEffect(() => {
    // 載入保存的主題
    const savedTheme = localStorage.getItem('selectedTheme') || 'cyberpunk'
    applyThemeToPage(savedTheme)
    
    // 監聽主題變更事件
    const handleThemeChange = (event) => {
      const { theme } = event.detail
      if (theme) {
        setCurrentTheme(theme)
        console.log('App.js: 主題已更新')
      }
    }
    
    window.addEventListener('themeChanged', handleThemeChange)
    
    // 檢查本地存儲的token
    const token = localStorage.getItem('authToken')
    if (token) {
      // 驗證token
      fetch('/api/verify-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsAuthenticated(true)
          setUser(data.user)
        } else {
          localStorage.removeItem('authToken')
        }
        setLoading(false)
      })
      .catch(() => {
        localStorage.removeItem('authToken')
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
    
    // 清理事件監聽器
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange)
    }
  }, [])

  const handleLogin = (token, userData) => {
    localStorage.setItem('authToken', token)
    setIsAuthenticated(true)
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setIsAuthenticated(false)
    setUser(null)
  }

  if (loading) {
    return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? 
                <LoginPage onLogin={handleLogin} /> : 
                <Navigate to="/dashboard" replace />
              } 
            />
            <Route 
              path="/register" 
              element={
                !isAuthenticated ? 
                <RegisterPage /> : 
                <Navigate to="/dashboard" replace />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <MainDashboard user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/collaboration/*" 
              element={
                isAuthenticated ? 
                <CollaborationApp user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/maintenance/*" 
              element={
                isAuthenticated ? 
                <MaintenanceApp user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/inspection/*" 
              element={
                isAuthenticated ? 
                <InspectionApp user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/project/*" 
              element={
                isAuthenticated ? 
                <ProjectApp user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/report/*" 
              element={
                isAuthenticated ? 
                <ReportApp user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/user/*" 
              element={
                isAuthenticated ? 
                <UserApp user={user} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/" 
              element={
                <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
              } 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App