import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, CheckCircle, AlertCircle, Save, Shield } from 'lucide-react';

const Settings = () => {
    const { user, login } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        if (password && password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        setSaving(true);
        try {
            const data = { name, email };
            if (password) data.password = password;

            const res = await axios.put('/user/profile', data);
            setMessage({ type: 'success', text: 'Profile updated successfully' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans animate-fade-in-up">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 font-display tracking-tight">Account Configuration</h1>
                <p className="text-slate-500 max-w-xl mx-auto text-lg">Manage your personal information and adjust security preferences.</p>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-indigo-500/5 border border-slate-100 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"></div>

                {message && (
                    <div className={`mb-10 p-4 rounded-xl flex items-center gap-3 border backdrop-blur-sm relative z-10 ${message.type === 'success' ? 'bg-emerald-50/80 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-500/10' : 'bg-rose-50/80 text-rose-700 border-rose-200 shadow-sm shadow-rose-500/10'} animate-fade-in-down`}>
                        {message.type === 'success' ? <CheckCircle size={20} className="text-emerald-500" /> : <AlertCircle size={20} className="text-rose-500" />}
                        <span className="font-bold text-sm tracking-wide">{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                    {/* Public Profile Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-10 border-b border-slate-100">
                        <div className="col-span-1">
                            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3 font-display">
                                <span className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg shadow-indigo-500/20"><User size={20} /></span>
                                Public Profile
                            </h2>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                This information will be displayed on your public profile and visible to potential employers.
                            </p>
                        </div>
                        <div className="col-span-2 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 py-3.5 px-4 bg-slate-50 focus:bg-white transition-all duration-300 font-medium text-slate-800"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-11 w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 py-3.5 bg-slate-50 focus:bg-white transition-all duration-300 font-medium text-slate-800"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-6">
                        <div className="col-span-1">
                            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3 font-display">
                                <span className="p-2.5 bg-gradient-to-br from-rose-400 to-red-600 text-white rounded-xl shadow-lg shadow-red-500/20"><Shield size={20} /></span>
                                Security
                            </h2>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                Ensure your account is secure by using a strong password.
                            </p>
                        </div>
                        <div className="col-span-2 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide">New Password</label>
                                <input
                                    type="password"
                                    placeholder="Leave blank to keep current"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 py-3.5 px-4 bg-slate-50 focus:bg-white transition-all duration-300 font-medium text-slate-800 placeholder-slate-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 tracking-wide">Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 py-3.5 px-4 bg-slate-50 focus:bg-white transition-all duration-300 font-medium text-slate-800"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-8 border-t border-slate-100">
                        <button
                            type="submit"
                            disabled={saving}
                            className={`bg-slate-900 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 hover:bg-indigo-600 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 ${saving ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {saving ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Saving Changes...
                                </>
                            ) : (
                                <><Save size={18} /> Update Profile</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
