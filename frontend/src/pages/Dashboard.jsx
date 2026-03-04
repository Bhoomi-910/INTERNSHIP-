import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Upload, Briefcase, BookOpen, AlertCircle, Check, Search, MapPin, Building, TrendingUp, Users, Calendar } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [skills, setSkills] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loadingRecs, setLoadingRecs] = useState(false);
    const [gapAnalysis, setGapAnalysis] = useState(null);
    const [analyzingGap, setAnalyzingGap] = useState(false);
    const [targetRole, setTargetRole] = useState('');

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const skillsRes = await axios.get('/user/skills');
                setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
            } catch (error) {
                console.error("Failed to fetch skills", error);
                setSkills([]);
            }
            try {
                const appsRes = await axios.get('/user/applications');
                setApplications(Array.isArray(appsRes.data) ? appsRes.data : []);
            } catch (error) {
                console.error("Failed to fetch applications", error);
                setApplications([]);
            }
        };
        fetchDashboardData();
    }, []);

    useEffect(() => {
        if (skills.length > 0) {
            fetchRecommendations();
        }
    }, [skills]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('resume', file);

        try {
            const res = await axios.post('/upload_resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSkills(res.data.extracted_skills);
            alert("Resume parsed successfully!");
        } catch (error) {
            console.error(error);
            alert('Failed to upload resume.');
        } finally {
            setUploading(false);
        }
    };

    const fetchRecommendations = async () => {
        setLoadingRecs(true);
        try {
            const res = await axios.get('/recommendations');
            setRecommendations(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error(error);
            setRecommendations([]);
        } finally {
            setLoadingRecs(false);
        }
    };

    const handleGapAnalysis = async () => {
        if (!targetRole) return;

        setAnalyzingGap(true);
        setGapAnalysis(null);
        try {
            const res = await axios.post('/skill_gap', { target_role: targetRole });
            setGapAnalysis(res.data);
        } catch (e) {
            alert(e.response?.data?.message || "Analysis failed");
        } finally {
            setAnalyzingGap(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans animate-fade-in-up">
            {/* Welcome Section */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 font-display tracking-tight hover:text-indigo-600 transition-colors cursor-default">
                        Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium">Here's what's happening with your job search today.</p>
                </div>
                <div className="hidden md:block">
                    <span className="bg-white/80 backdrop-blur-sm text-indigo-700 px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200/60 shadow-sm flex items-center gap-2">
                        <Calendar size={18} className="text-indigo-500" /> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
                        <Briefcase size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-bold tracking-wide uppercase">Internships Applied</p>
                        <h3 className="text-3xl font-black text-slate-900 font-display mt-0.5">{applications.length}</h3>
                    </div>
                </div>
                <div className="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
                        <TrendingUp size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-bold tracking-wide uppercase">Profile Views</p>
                        <h3 className="text-3xl font-black text-slate-900 font-display mt-0.5">12</h3>
                    </div>
                </div>
                <div className="group bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300">
                    <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
                        <BookOpen size={28} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-bold tracking-wide uppercase">Skills Identified</p>
                        <h3 className="text-3xl font-black text-slate-900 font-display mt-0.5">{skills.length}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Resume Upload Card */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                        <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-2 relative z-10 font-display">
                            <Upload size={22} className="text-indigo-600" /> Upload Resume
                        </h2>
                        <form onSubmit={handleUpload} className="space-y-4 relative z-10">
                            <div className="border-2 border-dashed border-indigo-200/60 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-white hover:border-indigo-400 transition-all duration-300 cursor-pointer group shadow-sm">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 shadow-inner">
                                    <Upload size={24} />
                                </div>
                                <p className="text-sm text-slate-800 font-bold mb-1 truncate px-2">
                                    {file ? file.name : "Drop your PDF here"}
                                </p>
                                <p className="text-xs text-slate-400 font-medium">or click to browse</p>
                            </div>
                            <button
                                type="submit"
                                disabled={!file || uploading}
                                className={`w-full py-3.5 px-4 rounded-xl shadow-lg text-sm font-bold text-white transition-all duration-300 transform group-hover:-translate-y-0.5
                                    ${!file || uploading
                                        ? 'bg-slate-300 cursor-not-allowed shadow-none'
                                        : 'bg-slate-900 hover:bg-indigo-600 hover:shadow-indigo-500/30 hover:-translate-y-1'}`}
                            >
                                {uploading ? 'Analyzing via AI...' : 'Run Parser'}
                            </button>
                        </form>
                    </div>

                    {/* Skills Summary Card */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 font-display">
                                <BookOpen size={22} className="text-emerald-500" /> Top Skills
                            </h2>
                            <Link to="/dashboard/skills" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">View All</Link>
                        </div>
                        {skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {skills.slice(0, 10).map((skill, index) => (
                                    <span key={index} className="bg-slate-50 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-200/60 shadow-sm hover:border-indigo-300 hover:text-indigo-700 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                                {skills.length > 10 && (
                                    <span className="bg-slate-100/50 text-slate-500 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 border-dashed">
                                        +{skills.length - 10} more
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-slate-50 rounded-2xl border-2 border-slate-200 border-dashed">
                                <p className="text-slate-400 text-sm font-medium">Upload resume to extract skills.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column (8 cols) */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Career Analyzer (Skill Gap) */}
                    <div className="bg-slate-900 rounded-[2rem] shadow-2xl p-8 relative overflow-hidden group">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-purple-500 opacity-20 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-400 group-hover:scale-110 transition-all duration-700"></div>
                        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-400 group-hover:scale-110 transition-all duration-700"></div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-8">
                            <div className="flex-1">
                                <h2 className="text-3xl font-extrabold mb-3 flex items-center gap-3 text-white font-display">
                                    <span className="p-2.5 bg-white/10 rounded-xl shadow-inner backdrop-blur-sm border border-white/5 group-hover:rotate-12 transition-transform duration-500"><AlertCircle size={24} className="text-yellow-400" /></span>
                                    Career Path Analyzer
                                </h2>
                                <p className="text-slate-300 mb-6 text-sm leading-relaxed max-w-lg font-medium">
                                    Not sure if you're ready? Enter a target job title (e.g., "Data Scientist") and our AI will analyze your skill gap immediately.
                                </p>

                                <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md focus-within:bg-white/10 focus-within:border-indigo-400/50 transition-all duration-300">
                                    <Search className="text-indigo-400 ml-3 self-center" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Enter target role..."
                                        className="flex-1 bg-transparent border-0 text-white placeholder-slate-400 focus:ring-0 text-sm py-3 font-bold px-2 w-full outline-none"
                                        value={targetRole}
                                        onChange={(e) => setTargetRole(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleGapAnalysis()}
                                    />
                                    <button
                                        onClick={handleGapAnalysis}
                                        disabled={analyzingGap}
                                        className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                                    >
                                        {analyzingGap ? 'Analyzing...' : 'Check Match'}
                                    </button>
                                </div>
                            </div>

                            {/* Result Area */}
                            {gapAnalysis && (
                                <div className="md:w-72 bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20 animate-fade-in-up shadow-2xl">
                                    <div className="text-center mb-4 border-b border-white/10 pb-4">
                                        <div className="text-xs text-indigo-300 uppercase tracking-widest font-black mb-1">Match Score</div>
                                        <div className={`text-4xl font-extrabold font-display ${gapAnalysis.match_percentage > 70 ? 'text-emerald-400' : gapAnalysis.match_percentage > 40 ? 'text-yellow-400' : 'text-rose-400'}`}>
                                            {gapAnalysis.match_percentage}%
                                        </div>
                                    </div>
                                    {gapAnalysis.missing_skills.length > 0 ? (
                                        <div>
                                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3 text-center">Missing Skills</div>
                                            <div className="flex flex-wrap justify-center gap-1.5">
                                                {gapAnalysis.missing_skills.slice(0, 3).map((s, i) => (
                                                    <span key={i} className="bg-rose-500/20 text-rose-200 border border-rose-500/30 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide shadow-sm">
                                                        {s}
                                                    </span>
                                                ))}
                                                {gapAnalysis.missing_skills.length > 3 && (
                                                    <span className="text-[10px] text-slate-400 font-bold pt-1">+{gapAnalysis.missing_skills.length - 3} more</span>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-emerald-400 text-sm font-bold bg-emerald-500/10 py-2 rounded-lg border border-emerald-500/20">Perfect Match!</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recommendations Feed */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 font-display">
                                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Briefcase size={22} /></div> Recommended Internships
                            </h2>
                            <div className="flex gap-2">
                                <button className="p-2.5 text-slate-400 hover:text-indigo-600 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 hover:bg-slate-50 transition-all hover:-translate-y-0.5">
                                    <FilterIcon />
                                </button>
                            </div>
                        </div>

                        {loadingRecs ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-44 bg-slate-100 rounded-[2rem] shadow-sm border border-slate-100 p-6 animate-pulse">
                                    </div>
                                ))}
                            </div>
                        ) : recommendations.length > 0 ? (
                            <div className="grid gap-5">
                                {recommendations.map((rec) => (
                                    <div key={rec.id} className="group bg-white rounded-[2rem] shadow-sm border border-slate-200/60 p-6 md:p-8 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
                                            {/* Company Logo Placeholder */}
                                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-black text-3xl flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                                {rec.company?.charAt(0) || 'C'}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex flex-col md:flex-row md:justify-between items-start mb-3 gap-2">
                                                    <div>
                                                        <h3 className="text-xl font-extrabold text-slate-900 font-display group-hover:text-indigo-600 transition-colors">{rec.title}</h3>
                                                        <p className="text-sm text-slate-500 font-bold flex items-center gap-1.5 mt-1">
                                                            <Building size={14} className="text-slate-400" /> {rec.company}
                                                        </p>
                                                    </div>
                                                    <span className={`px-3 py-1.5 rounded-full text-xs font-black tracking-wide border shadow-sm ${rec.match_score >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                                                        {rec.match_score}% Match
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
                                                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-400" /> {rec.location || 'Remote'}</span>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                                    <span className="flex items-center gap-1.5"><Users size={14} className="text-indigo-400" /> 10+ Applicants</span>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                                                    {rec.required_skills.slice(0, 4).map((s, i) => (
                                                        <span key={i} className="bg-slate-50 text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-200/60 font-bold group-hover:border-indigo-200 transition-colors">
                                                            {s}
                                                        </span>
                                                    ))}
                                                    {rec.required_skills.length > 4 && (
                                                        <span className="text-xs text-slate-400 font-bold py-1 px-1">+ {rec.required_skills.length - 4}</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-center items-start md:items-end min-w-[140px]">
                                                <Link to={`/dashboard/internships/${rec.id}`} className="w-full py-3.5 px-6 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:-translate-y-1 text-center group-hover:shadow-indigo-500/30">
                                                    Apply Now
                                                </Link>
                                                <Link to={`/dashboard/internships/${rec.id}`} className="w-full mt-3 text-xs font-bold text-slate-500 text-center hover:text-indigo-600 transition-colors">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 hover:border-indigo-300 transition-colors group">
                                <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-12 group-hover:rotate-0 transition-transform duration-300 border border-slate-100 shadow-inner">
                                    <Search className="text-slate-300 transform -rotate-12 group-hover:rotate-0 transition-transform" size={40} />
                                </div>
                                <h3 className="text-slate-900 font-extrabold text-2xl mb-2 font-display">No matches found yet</h3>
                                <p className="text-slate-500 text-base max-w-md mx-auto mb-8 font-medium">Upload your resume to let our AI find the perfect internships for you.</p>
                                <button onClick={() => document.querySelector('input[type="file"]').click()} className="text-indigo-600 font-bold hover:bg-indigo-50 px-6 py-2.5 rounded-xl transition-colors border border-transparent hover:border-indigo-100">
                                    Upload Resume Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Simple Icon component for filter
const FilterIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
);

export default Dashboard;
