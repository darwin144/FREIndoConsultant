import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './style.css'
import './animate.min.css'
import './all.min.css'
import './magnific-popup.min.css'
import './slick.min.css'
import './style-pemeriksaan-dan penilaian.css'
import './style-enviro.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
