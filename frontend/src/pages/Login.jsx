import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] flex font-sans overflow-hidden">
            {/* Left Side: Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2 relative z-10 animate-fade-in-up">

                {/* Decorative Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-300 opacity-20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="mx-auto w-full max-w-sm lg:w-[420px] relative z-10">
                    <div>
                        <Link to="/" className="text-indigo-600 font-bold text-2xl flex items-center gap-3 mb-10 group">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">I</div>
                            <span className="font-display tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">InternAI</span>
                        </Link>
                        <h2 className="mt-6 text-4xl font-extrabold text-slate-900 font-display tracking-tight">
                            Welcome back
                        </h2>
                        <p className="mt-3 text-base text-slate-500 font-medium">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-all">
                                Start your journey for free
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="mt-6">
                            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-rose-50/80 border border-rose-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm shadow-rose-500/10 animate-fade-in-down">
                                        <Lock className="h-5 w-5 text-rose-500 mt-0.5" aria-hidden="true" />
                                        <p className="text-sm text-rose-700 font-bold">{error}</p>
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 tracking-wide mb-2">
                                        Email address
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="appearance-none block w-full pl-12 px-4 py-3.5 border-slate-200 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 sm:text-sm font-medium text-slate-800 bg-white transition-all duration-300"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor="password" className="block text-sm font-bold text-slate-700 tracking-wide">
                                            Password
                                        </label>
                                        <a href="#" className="font-bold text-sm text-indigo-600 hover:text-indigo-500 transition-colors">
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="appearance-none block w-full pl-12 px-4 py-3.5 border-slate-200 rounded-2xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 sm:text-sm font-medium text-slate-800 bg-white transition-all duration-300"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded text-lg cursor-pointer transition-colors"
                                        />
                                        <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-700 font-medium cursor-pointer">
                                            Remember for 30 days
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-indigo-500/30 text-base font-bold text-white bg-slate-900 hover:bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        Sign in securely <ArrowRight size={18} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Visual/Branding Gen-Z style */}
            <div className="hidden lg:flex relative w-0 flex-1 bg-slate-900 overflow-hidden items-center justify-center">
                {/* Dynamic animated abstract background */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 opacity-40 rounded-full blur-[120px] animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-40 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10 max-w-xl mx-auto p-12 glass-panel rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300 group">
                        <Sparkles className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <h1 className="text-5xl font-extrabold text-white mb-6 font-display leading-tight">
                        Match with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">dream internship.</span>
                    </h1>
                    <p className="text-xl text-slate-300 font-medium leading-relaxed mb-8">
                        Our AI analyzes your skills, projects, and coursework to find opportunities where you'll thrive. Stop searching, start matching.
                    </p>

                    {/* Mock notification mini-card */}
                    <div className="bg-white/10 border border-white/20 p-5 rounded-2xl backdrop-blur-md flex items-center gap-4 transform rotate-2 hover:rotate-0 transition-all duration-500 cursor-default">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                            <span className="text-emerald-400 font-bold">98%</span>
                        </div>
                        <div>
                            <p className="text-white font-bold">Software Engineering Intern</p>
                            <p className="text-slate-400 text-sm">Google &middot; Perfect skill match</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
