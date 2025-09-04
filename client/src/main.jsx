import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'
// import { ChatProvider } from './contexts/ChatContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* <ChatProvider> */}
        <App />
      {/* </ChatProvider> */}
    </AuthProvider>
  </StrictMode>,
)