import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import axios from 'axios'

// Set default base URL for API calls. In production, Vercel will inject VITE_API_URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
)
