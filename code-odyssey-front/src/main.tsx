import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
    <App />
    </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
