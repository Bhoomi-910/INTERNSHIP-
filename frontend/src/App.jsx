import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InternshipDetail from './pages/InternshipDetail';
import AdminDashboard from './pages/AdminDashboard';
import Internships from './pages/Internships';
import MySkills from './pages/MySkills';
import Settings from './pages/Settings';
import { useAuth } from './context/AuthContext';

import DashboardLayout from './layouts/DashboardLayout';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};



function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<><Navbar /><Home /></>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Dashboard Layout handles sidebar and navbar for its children */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="internships" element={<Internships />} />
                        <Route path="internships/:id" element={<InternshipDetail />} />
                        <Route path="skills" element={<MySkills />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="admin" element={<AdminDashboard />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
