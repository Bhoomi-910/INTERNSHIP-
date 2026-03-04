import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Briefcase, Settings, LogOut, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Close sidebar on route change on mobile
    useEffect(() => {
        if (sidebarOpen && setSidebarOpen) {
            setSidebarOpen(false);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Briefcase, label: 'Internships', path: '/dashboard/internships' },
        { icon: BookOpen, label: 'My Skills', path: '/dashboard/skills' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    if (user && user.role === 'admin') {
        navItems.push({ icon: User, label: 'Admin Dashboard', path: '/dashboard/admin' });
    }

    return (
        <React.Fragment>
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden animate-fade-in-up"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <div className={`flex flex-col w-[280px] bg-white border-r border-slate-100 min-h-screen fixed left-0 top-[72px] md:top-0 z-50 md:z-30 font-sans shadow-xl md:shadow-sm transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex flex-col flex-1 pt-6 pb-4 overflow-y-auto mt-2 md:mt-[72px]">
                    <nav className="flex-1 px-4 space-y-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                end={item.path === '/dashboard'}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 ${isActive
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 translate-x-1'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-0.5'
                                    }`
                                }
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div className="p-5 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl mb-4 border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate tracking-wide">{user?.name}</p>
                            <p className="text-xs font-semibold text-slate-500 truncate uppercase tracking-widest mt-0.5">{user?.role || 'Student'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center px-4 py-3 text-sm font-bold text-rose-600 border border-rose-100 rounded-xl hover:bg-rose-50 hover:border-rose-200 transition-colors shadow-sm"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Sidebar;
