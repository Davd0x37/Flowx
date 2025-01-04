import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/app'
import './lib/i18n'

const root = document.getElementById('app')

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
