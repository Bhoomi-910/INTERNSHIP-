import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 flex-col">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex flex-1 pt-16">
                <Sidebar sidebarOpen={sidebarOpen} />
                <main className="flex-1 overflow-y-auto w-full md:pl-64 p-8 transition-all duration-300">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
