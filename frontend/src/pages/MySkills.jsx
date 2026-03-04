
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, X, Trash2, BookOpen, AlertCircle, ShieldCheck } from 'lucide-react';

const MySkills = () => {
    const { user } = useAuth();
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSkill, setNewSkill] = useState('');
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (user) {
            fetchSkills();
        }
    }, [user]);

    const fetchSkills = async () => {
        try {
            const res = await axios.get('/user/skills');
            setSkills(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Failed to fetch skills", error);
            setSkills([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.trim()) return;

        setAdding(true);
        try {
            const res = await axios.post('/user/skills', { skill: newSkill });
            if (res.status === 201) {
                // Use the normalized skill name from backend if available, else current input
                const addedSkillName = res.data.skill || newSkill;
                setSkills([...skills, addedSkillName]);
                setNewSkill('');
            } else {
                // Determine if it was a success message (like "already exists") or error
                alert(res.data.message);
            }
        } catch (error) {
            console.error("Add skill error:", error);
            const msg = error.response?.data?.message || 'Failed to add skill. Please try again.';
            alert(msg);
        } finally {
            setAdding(false);
        }
    };

    const handleRemoveSkill = async (skillName) => {
        try {
            await axios.delete('/user/skills', { data: { skill: skillName } });
            setSkills(skills.filter(s => s !== skillName));
        } catch (error) {
            alert('Failed to remove skill');
        }
    };

    return (
        <div className="font-sans max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up transition-all duration-300">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4 font-display tracking-tight">Skill Portfolio</h1>
                <p className="text-slate-500 max-w-2xl mx-auto text-lg">Curate your technical expertise to unlock the most relevant internship matches.</p>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-indigo-500/5 border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
                <div className="p-8 border-b border-slate-100 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg shadow-indigo-500/30">
                            <BookOpen size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 font-display">Expertise Profile</h2>
                            <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5 mt-1">
                                <ShieldCheck size={16} className="text-emerald-500" /> automatically verified via NLP
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <span className="bg-white text-indigo-700 px-5 py-2.5 rounded-xl text-sm font-bold border border-indigo-100 shadow-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            {skills.length} Skills Registered
                        </span>
                    </div>
                </div>

                <div className="p-8 relative z-10">
                    {/* Add Skill Form */}
                    <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row gap-3 mb-12 bg-white p-2 rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200 focus-within:ring-4 focus-within:ring-indigo-100 focus-within:border-indigo-300 transition-all duration-300 max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Add a new skill (e.g. React, Data structure)..."
                            className="flex-1 rounded-xl border-0 py-3.5 px-5 focus:ring-0 text-slate-800 placeholder-slate-400 font-medium bg-transparent"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={adding || !newSkill}
                            className={`bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 ${adding ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <Plus size={18} />
                            {adding ? 'Adding...' : 'Add Skill'}
                        </button>
                    </form>

                    {/* Skills Grid */}
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
                            <div className="h-10 bg-slate-100 rounded-xl w-2/3 mx-auto"></div>
                        </div>
                    ) : skills.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-3">
                            {skills.map((skill, index) => (
                                <div key={index} className="group flex items-center gap-3 bg-white text-slate-700 font-semibold px-5 py-3.5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/10 hover:bg-slate-50 hover:text-indigo-700 transition-all duration-300 cursor-default select-none animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                                    <span>{skill}</span>
                                    <button
                                        onClick={() => handleRemoveSkill(skill)}
                                        className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                                        title="Remove Skill"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50">
                            <div className="mx-auto w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                                <Plus className="text-slate-300" size={40} />
                            </div>
                            <h3 className="text-slate-900 font-bold text-xl mb-2 font-display">No skills added yet</h3>
                            <p className="text-slate-500 text-sm max-w-sm mx-auto">Start typing above to build your profile or upload your resume from the dashboard.</p>
                        </div>
                    )}
                </div>

                <div className="bg-slate-900 p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                    <p className="text-indigo-200 text-sm flex items-center justify-center gap-2 relative z-10 font-medium">
                        <AlertCircle size={18} className="text-amber-400" /> Pro Tip: Uploading your resume on the dashboard automatically extracts skills for you!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MySkills;
