import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Users, Briefcase, FileText, CheckCircle, PlusCircle, AlertCircle, TrendingUp, Settings } from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ users: 0, internships: 0, applications: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/admin/stats');
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.role === 'admin') {
            fetchStats();
        }
    }, [user]);

    if (!user || user.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center font-sans animate-fade-in-up">
                <div className="bg-rose-50 p-6 rounded-full mb-6">
                    <AlertCircle size={56} className="text-rose-500" />
                </div>
                <h2 className="text-4xl font-black text-slate-900 font-display mb-3">Access Denied</h2>
                <p className="text-lg text-slate-500 font-medium max-w-md">You need administrator privileges to view this highly secured page.</p>
            </div>
        );
    }

    return (
        <div className="font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-3">
                        <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl shadow-sm"><Settings size={28} /></span>
                        Admin Workspace
                    </h1>
                    <p className="text-lg text-slate-500 font-medium mt-2">Manage users, monitor internships, and oversee the platform.</p>
                </div>
                <div className="flex bg-white/80 backdrop-blur-md rounded-2xl p-1.5 border border-slate-200/60 shadow-sm">
                    <span className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md">
                        <TrendingUp size={16} /> Live Data
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="group bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                    <div className="p-5 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform shadow-inner relative z-10">
                        <Users size={32} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mb-1">Total Users</p>
                        <h3 className="text-4xl font-black text-slate-900 font-display">{loading ? '...' : stats.users}</h3>
                    </div>
                </div>

                <div className="group bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors"></div>
                    <div className="p-5 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform shadow-inner relative z-10">
                        <Briefcase size={32} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mb-1">Active Internships</p>
                        <h3 className="text-4xl font-black text-slate-900 font-display">{loading ? '...' : stats.internships}</h3>
                    </div>
                </div>

                <div className="group bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
                    <div className="p-5 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform shadow-inner relative z-10">
                        <FileText size={32} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mb-1">Applications</p>
                        <h3 className="text-4xl font-black text-slate-900 font-display">{loading ? '...' : stats.applications}</h3>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 rounded-[2rem] shadow-2xl p-8 sm:p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500 opacity-20 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-400 transition-colors duration-700"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-extrabold text-white mb-6 font-display flex items-center gap-3">
                        <span className="p-2 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm"><PlusCircle size={20} className="text-indigo-400" /></span>
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <button className="flex flex-col items-center justify-center gap-3 p-8 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-inner group/btn">
                            <PlusCircle size={28} className="group-hover/btn:scale-110 group-hover/btn:-rotate-90 transition-transform duration-300" />
                            <span className="font-bold tracking-wide">Post Internship</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-8 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:bg-slate-800 hover:text-white hover:border-white/20 transition-all duration-300 shadow-inner group/btn">
                            <Users size={28} className="group-hover/btn:scale-110 transition-transform duration-300" />
                            <span className="font-bold tracking-wide">Manage Users</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-8 bg-white/5 border border-white/10 rounded-2xl text-slate-300 hover:bg-slate-800 hover:text-white hover:border-white/20 transition-all duration-300 shadow-inner group/btn">
                            <CheckCircle size={28} className="group-hover/btn:scale-110 transition-transform duration-300" />
                            <span className="font-bold tracking-wide">Review Applications</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
