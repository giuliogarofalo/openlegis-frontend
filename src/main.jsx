import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.js'
import App from './App.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import './styles.css'
import './analytics.js'   // analytics privacy-friendly (Umami) — no-op senza VITE_UMAMI_WEBSITE_ID

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </I18nextProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
