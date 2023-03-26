import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/assets/styles/reset.scss'
import '@/assets/styles/iconfont.scss'
import '@/assets/styles/common.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
