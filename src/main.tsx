import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { App } from '@/App'
import '@/styles/globals.css'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister()
    }
  }).catch((err) => console.log('Service Worker unregistration failed: ', err))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

