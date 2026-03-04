import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, LayoutDashboard, Home, Menu, X } from 'lucide-react';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100 font-sans shadow-sm shadow-indigo-500/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-[72px] items-center">
                    <div className="flex items-center gap-3">
                        {user && setSidebarOpen && (
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="md:hidden p-2 -ml-2 mr-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors focus:outline-none"
                            >
                                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        )}
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">I</div>
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent font-display tracking-tight group-hover:from-indigo-600 group-hover:to-purple-600 transition-colors hidden sm:block">InternAI</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-6">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="hidden md:flex text-slate-600 hover:text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold items-center gap-2 transition-all hover:bg-slate-50">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                                <div className="hidden md:block h-8 w-px bg-slate-200 indent-hidden"></div>
                                <div className="flex flex-row items-center gap-2 md:gap-3">
                                    <span className="text-slate-700 text-sm font-bold flex items-center gap-2 md:gap-3 bg-slate-50 py-1.5 pl-1.5 pr-2 md:pr-4 rounded-full border border-slate-100">
                                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-md">
                                            {user?.name?.charAt(0)?.toUpperCase()}
                                        </div>
                                        <span className="hidden lg:block truncate max-w-[120px]">{user?.name}</span>
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-slate-400 hover:text-rose-600 p-2 rounded-xl text-sm font-medium flex items-center transition-all hover:bg-rose-50 border border-transparent hover:border-rose-100"
                                        title="Log out"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3 md:gap-4">
                                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-bold text-sm transition-colors py-2 px-2 md:px-3">
                                    Sign In
                                </Link>
                                <Link to="/register" className="bg-slate-900 text-white hover:bg-indigo-600 px-5 md:px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 border border-transparent whitespace-nowrap">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
