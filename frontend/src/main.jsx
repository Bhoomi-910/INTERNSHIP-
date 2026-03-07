import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import axios from 'axios'

// Set default base URL for API calls.
// In production without VITE_API_URL set, default to the live Render backend
axios.defaults.baseURL = import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'http://localhost:5001' : 'https://internai-backend.onrender.com');

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
)
