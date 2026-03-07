import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Upload, Cpu, Award, ArrowRight, Zap, Briefcase, UserCheck } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-[#FAF9F6] font-sans">
            {/* Hero Section */}
            <div className="relative overflow-hidden min-h-screen flex items-center">
                {/* Decorative background blurs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 opacity-20 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
                        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left animate-fade-in-up">
                            <div className="inline-flex items-center px-4 py-2 rounded-full border border-indigo-200/50 bg-indigo-50/50 backdrop-blur-sm text-indigo-700 font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
                                <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
                                AI-Powered Career Growth
                            </div>
                            <h1 className="text-5xl tracking-tight font-extrabold text-slate-900 sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl mb-6">
                                <span className="block font-display">Launch your career</span>
                                <span className="block text-gradient">
                                    with intelligent matching
                                </span>
                            </h1>
                            <p className="mt-4 text-lg text-slate-600 sm:mt-5 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-light leading-relaxed">
                                Stop applying blindly. Upload your resume, let our AI analyze your skills, and get matched with internships that actually fit your profile.
                            </p>
                            <div className="mt-10 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                                <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
                                    <Link
                                        to="/register"
                                        className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl w-full sm:w-auto"
                                    >
                                        Get Started Free
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="flex items-center justify-center px-8 py-4 border border-slate-200 text-base font-bold rounded-2xl text-slate-700 bg-white hover:bg-slate-50 focus:ring-4 focus:ring-slate-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md w-full sm:w-auto"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                                <p className="mt-4 text-sm text-slate-500 font-medium">
                                    No credit card required &middot; Free for students
                                </p>
                            </div>
                        </div>
                        <div className="mt-16 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="relative mx-auto w-full lg:max-w-lg transform lg:-rotate-2 hover:rotate-0 transition-all duration-500 ease-out">
                                <div className="glass-panel rounded-3xl overflow-hidden p-2">
                                    <div className="bg-white rounded-2xl h-full w-full shadow-inner border border-slate-100 overflow-hidden">
                                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center backdrop-blur-md">
                                            <div className="flex space-x-2">
                                                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                            </div>
                                            <div className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider">AI_ANALYSIS.EXE</div>
                                        </div>
                                        <div className="p-8 space-y-8 bg-white">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-5">
                                                    <div className="h-14 w-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                                                        <Cpu size={28} />
                                                    </div>
                                                    <div>
                                                        <div className="text-base font-bold text-slate-900">Skill Analysis Complete</div>
                                                        <div className="text-xs text-emerald-600 font-bold tracking-wide mt-1">98% MATCH FOUND</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm font-semibold text-slate-700">
                                                    <span>Python</span>
                                                    <span className="text-indigo-600">Advanced</span>
                                                </div>
                                                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full w-[85%] bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm font-semibold text-slate-700">
                                                    <span>React</span>
                                                    <span className="text-purple-600">Intermediate</span>
                                                </div>
                                                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full w-[60%] bg-gradient-to-r from-purple-500 to-purple-400 rounded-full relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t border-slate-100">
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Extracted Tags</div>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="text-xs font-semibold bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg text-indigo-700">Data Science</span>
                                                    <span className="text-xs font-semibold bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg text-purple-700">Frontend</span>
                                                    <span className="text-xs font-semibold bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg text-emerald-700">Machine Learning</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative elements behind the card */}
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-[40px] opacity-60 mix-blend-multiply z-[-1]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted By Section (Marquee) */}
            <div className="py-10 bg-white border-y border-slate-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                    <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                        Trusted by industry leaders
                    </p>
                </div>
                <div className="relative flex overflow-x-hidden group">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-12 sm:gap-24 px-6 sm:px-12 group-hover:[animation-play-state:paused]">
                        {/* First set of companies */}
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Google</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Microsoft</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Amazon</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Apple</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Meta</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Netflix</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Tesla</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Spotify</span>
                    </div>
                    {/* Duplicate for seamless looping */}
                    <div className="absolute top-0 animate-marquee whitespace-nowrap flex items-center gap-12 sm:gap-24 px-6 sm:px-12 group-hover:[animation-play-state:paused]" style={{ left: '100%' }}>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Google</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Microsoft</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Amazon</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Apple</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Meta</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Netflix</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Tesla</span>
                        <span className="text-xl sm:text-2xl font-black text-slate-300 font-display uppercase tracking-wider">Spotify</span>
                    </div>
                </div>
                {/* Gradient Fades for Marquee */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-fade-in-up">
                        <h2 className="text-sm text-indigo-600 font-bold tracking-widest uppercase mb-3">Why Choose InternAI?</h2>
                        <p className="mt-2 text-4xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl font-display">
                            Everything you need to land the job
                        </p>
                    </div>

                    <div className="mt-20">
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: Upload,
                                    title: 'Smart Resume Parsing',
                                    desc: 'Upload your PDF resume and our NLP engine extracts your technical skills instantly.',
                                    color: 'from-blue-500 to-indigo-600'
                                },
                                {
                                    icon: Cpu,
                                    title: 'AI Matching Engine',
                                    desc: 'We use advanced algorithms to match your unique profile with the best internship opportunities.',
                                    color: 'from-indigo-500 to-purple-600'
                                },
                                {
                                    icon: Award,
                                    title: 'Skill Gap Analysis',
                                    desc: 'Find out exactly what skills you are missing for your dream role and how to get them.',
                                    color: 'from-purple-500 to-pink-600'
                                }
                            ].map((feature, index) => (
                                <div key={index} className="pt-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="flow-root bg-[#FAF9F6] rounded-3xl px-8 pb-8 h-full border border-slate-200/60 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-2 group">
                                        <div className="-mt-8">
                                            <div>
                                                <span className={`inline-flex items-center justify-center p-4 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg shadow-indigo-500/30 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300`}>
                                                    <feature.icon className="h-7 w-7 text-white" aria-hidden="true" />
                                                </span>
                                            </div>
                                            <h3 className="mt-8 text-2xl font-bold text-slate-900 tracking-tight">{feature.title}</h3>
                                            <p className="mt-5 text-base text-slate-600 leading-relaxed font-medium">
                                                {feature.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-[100px] animate-float"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl font-extrabold sm:text-5xl font-display">How it works</h2>
                        <p className="mt-4 text-slate-300 text-lg">Three simple steps to your dream internship.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 z-0 opacity-50"></div>

                        {[
                            { step: '1', title: 'Create Profile', desc: 'Sign up and tell us a bit about your career interests and goals.' },
                            { step: '2', title: 'Upload Resume', desc: 'Our system extracts your skills and experiences automatically.' },
                            { step: '3', title: 'Get Matched', desc: 'Receive personalized recommendations and apply with one click.' }
                        ].map((item, index) => (
                            <div key={index} className="relative z-10 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="w-24 h-24 mx-auto bg-slate-900 rounded-2xl flex items-center justify-center text-3xl font-bold mb-8 shadow-[0_0_30px_rgba(99,102,241,0.3)] border border-slate-700 transform rotate-45 group hover:rotate-0 hover:scale-110 transition-all duration-300">
                                    <span className="transform -rotate-45 group-hover:rotate-0 transition-all duration-300 bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-purple-400 font-display">{item.step}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 font-display">{item.title}</h3>
                                <p className="text-slate-300 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 mt-auto pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-500/30">I</div>
                                <span className="text-2xl font-black text-slate-900 font-display tracking-tight">InternAI</span>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                Empowering students to find their perfect career match through artificial intelligence.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-6 font-display tracking-wide uppercase text-sm">Platform</h4>
                            <ul className="space-y-3 text-sm text-slate-600 font-medium">
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Internships</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Resume Parser</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Skill Analysis</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-6 font-display tracking-wide uppercase text-sm">Resources</h4>
                            <ul className="space-y-3 text-sm text-slate-600 font-medium">
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Career Blog</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Resume Tips</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Interview Prep</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-6 font-display tracking-wide uppercase text-sm">Legal</h4>
                            <ul className="space-y-3 text-sm text-slate-600 font-medium">
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-slate-500 font-medium">
                            &copy; 2026 InternAI. All rights reserved.
                        </div>
                        <div className="flex space-x-6">
                            {/* Social Icons Placeholder */}
                            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </a>
                            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                <span className="sr-only">GitHub</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
