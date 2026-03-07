import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, MapPin, Search, Check, AlertCircle, ArrowLeft, Building, Zap, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const InternshipDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [internship, setInternship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        // Fetch internship details
        const fetchInternship = async () => {
            try {
                const res = await axios.get('/internships');
                const found = res.data.find(i => i.id === parseInt(id));
                setInternship(found);
            } catch (error) {
                console.error("Error fetching details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInternship();
    }, [id]);

    const handleAnalyzeGap = async () => {
        if (!internship) return;
        setAnalyzing(true);
        try {
            const res = await axios.post('/skill_gap', { target_role: internship.title });
            setAnalysis(res.data);
            toast.success("Analysis complete!");
        } catch (error) {
            toast.error("Could not analyze gap. Try manually entering the role in Dashboard.");
        } finally {
            setAnalyzing(false);
        }
    };

    const handleApply = async () => {
        if (!internship) return;
        try {
            const res = await axios.post('/apply', { internship_id: internship.id });
            toast.success(res.data.message || "Application submitted!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit application.");
        }
    };

    if (loading) return <div className="p-12 text-center text-slate-500 font-bold font-sans animate-pulse">Loading internship details...</div>;
    if (!internship) return <div className="p-12 text-center text-slate-500 font-bold font-sans">Internship not found</div>;

    return (
        <div className="max-w-4xl mx-auto font-sans p-4 sm:p-6 pb-20 animate-fade-in-up">
            <Link to="/dashboard" className="inline-flex items-center text-slate-500 font-bold hover:text-indigo-600 mb-8 transition-colors group bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </Link>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                {/* Header Section */}
                <div className="relative bg-slate-900 p-8 sm:p-12 overflow-hidden overflow-visible border-b-4 border-indigo-500">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-purple-500 opacity-20 rounded-full blur-[80px]"></div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-[2rem] flex items-center justify-center font-black text-4xl shadow-2xl flex-shrink-0 border-4 border-white/10 group transform hover:-rotate-6 transition-transform duration-300">
                                {internship.company?.charAt(0) || 'C'}
                            </div>
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 font-display tracking-tight leading-tight">{internship.title}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-slate-300 font-medium">
                                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5 shadow-inner">
                                        <Building size={18} className="text-indigo-400" /> {internship.company}
                                    </span>
                                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5 shadow-inner">
                                        <MapPin size={18} className="text-indigo-400" /> {internship.location || 'Remote'}
                                    </span>
                                    <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5 shadow-inner">
                                        <Users size={18} className="text-indigo-400" /> Hiring Multiple
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 sm:p-12 space-y-12">
                    {/* About the role */}
                    <div className="prose max-w-none">
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><Briefcase size={18} /></span>
                            About the role
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg font-medium bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                            {internship.description || "No description provided for this role. Expect to learn in a fast-paced environment and contribute to real-world projects."}
                        </p>
                    </div>

                    {/* Required Skills */}
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><Zap size={18} /></span>
                            Required Skills
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {internship.required_skills.map((skill, index) => (
                                <span key={index} className="bg-white text-slate-700 font-bold px-4 py-2.5 rounded-xl border-2 border-slate-100 shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* AI Analysis Section */}
                    <div className="bg-slate-900 rounded-[2rem] p-8 sm:p-10 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-20 rounded-full blur-[80px] group-hover:bg-indigo-400 transition-colors duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                                <div>
                                    <h3 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-3 font-display">
                                        <span className="p-2.5 bg-white/10 rounded-xl shadow-inner backdrop-blur-sm border border-white/10"><Search size={22} className="text-indigo-400" /></span>
                                        AI Fit Analysis
                                    </h3>
                                    <p className="text-indigo-200 mt-2 font-medium">
                                        Check how well your current skill profile matches this role's requirements.
                                    </p>
                                </div>
                                {!analysis && (
                                    <button
                                        onClick={handleAnalyzeGap}
                                        disabled={analyzing}
                                        className="bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-indigo-400 transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                    >
                                        {analyzing ? 'Running Analysis...' : 'Analyze My Fit'}
                                    </button>
                                )}
                            </div>

                            {analysis && (
                                <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 shadow-inner animate-fade-in-up">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-4">
                                        <div>
                                            <span className="text-indigo-200 font-bold uppercase tracking-widest text-xs mb-1 block">Your Match Score</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className={`text-5xl font-black font-display ${analysis.match_percentage > 70 ? 'text-emerald-400' : analysis.match_percentage > 40 ? 'text-yellow-400' : 'text-rose-400'}`}>
                                                    {analysis.match_percentage}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full bg-slate-800/50 rounded-full h-3 mb-8 overflow-hidden border border-white/5 p-0.5">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${analysis.match_percentage > 70 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : analysis.match_percentage > 40 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 'bg-gradient-to-r from-rose-500 to-rose-400'}`}
                                            style={{ width: `${analysis.match_percentage}%` }}
                                        ></div>
                                    </div>

                                    {analysis.missing_skills.length > 0 ? (
                                        <div className="bg-slate-900/50 rounded-xl p-5 border border-white/5">
                                            <p className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                                                <AlertCircle size={16} /> Missing critical skills to acquire:
                                            </p>
                                            <div className="flex flex-wrap gap-2.5">
                                                {analysis.missing_skills.map((s, i) => (
                                                    <span key={i} className="bg-rose-500/10 text-rose-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-rose-500/20 shadow-sm">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 flex items-center gap-3">
                                            <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400">
                                                <Check size={20} />
                                            </div>
                                            <p className="text-emerald-400 text-lg font-bold">
                                                You are a perfect match based on current skills!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 flex justify-center sm:justify-end border-t border-slate-100 pt-8">
                        <button onClick={handleApply} className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-600 shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 focus:ring-4 focus:ring-indigo-500/20 flex items-center justify-center gap-3">
                            <Briefcase size={20} /> Submit Application
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternshipDetail;
