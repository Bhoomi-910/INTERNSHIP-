import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Filter, X, Building, ArrowRight } from 'lucide-react';

const Internships = () => {
    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInternships, setFilteredInternships] = useState([]);

    useEffect(() => {
        fetchInternships();
    }, []);

    useEffect(() => {
        const results = internships.filter(internship =>
            internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.required_skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredInternships(results);
    }, [searchTerm, internships]);

    const fetchInternships = async () => {
        try {
            const res = await axios.get('/internships');
            setInternships(res.data);
            setFilteredInternships(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 font-display tracking-tight">Explore Opportunities</h1>
                    <p className="text-slate-500 mt-2 text-lg">Find the perfect internship to kickstart your career.</p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-white px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 shadow-sm text-indigo-700 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        {filteredInternships.length} Jobs Available
                    </span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 mb-10 flex items-center gap-3 max-w-3xl mx-auto sticky top-4 z-20 backdrop-blur-xl bg-white/80">
                <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-slate-50/50 rounded-xl border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:bg-white transition-all">
                    <Search className="text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by role, company, or skill..."
                        className="flex-1 bg-transparent border-0 outline-none text-slate-800 placeholder-slate-400 font-medium w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="text-slate-400 hover:text-slate-600 p-1 bg-slate-200/50 rounded-full transition-colors">
                            <X size={14} />
                        </button>
                    )}
                </div>
                <button className="bg-slate-900 text-white py-2.5 px-6 rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 font-bold text-sm transform hover:-translate-y-0.5">
                    <Filter size={18} />
                    <span className="hidden sm:inline">Filters</span>
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-80 bg-slate-100 rounded-[2rem] animate-pulse"></div>
                    ))}
                </div>
            ) : filteredInternships.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredInternships.map((internship, i) => (
                        <div key={internship.id} className="group bg-white rounded-[2rem] shadow-sm border border-slate-200/60 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                            {/* Decorative background orb */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

                            <div className="p-8 flex-1 relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                                        {internship.company?.charAt(0) || 'I'}
                                    </div>
                                    <span className="bg-slate-100/80 text-slate-700 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
                                        Full Time
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors font-display leading-tight">{internship.title}</h3>
                                <p className="text-slate-500 text-sm mb-5 font-semibold flex items-center gap-2">
                                    <Building size={16} className="text-slate-400" /> {internship.company}
                                </p>

                                <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-400" /> {internship.location || 'Remote'}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                    <span>Posted 2d ago</span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {internship.required_skills.slice(0, 3).map((skill, index) => (
                                        <span key={index} className="bg-slate-50 text-slate-600 text-xs px-3 py-1.5 rounded-lg border border-slate-200/60 font-semibold group-hover:bg-indigo-50/50 group-hover:text-indigo-700 group-hover:border-indigo-100 transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                    {internship.required_skills.length > 3 && (
                                        <span className="text-xs text-slate-400 py-1.5 font-bold px-2">
                                            +{internship.required_skills.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 relative z-10">
                                <Link to={`/dashboard/internships/${internship.id}`} className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border border-slate-200 hover:border-indigo-500 text-slate-700 rounded-xl text-sm font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg">
                                    View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 max-w-2xl mx-auto mt-12">
                    <div className="bg-slate-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-slate-100 transform rotate-12">
                        <Search className="text-slate-300 transform -rotate-12" size={48} />
                    </div>
                    <h3 className="text-slate-900 font-extrabold text-2xl mb-3 font-display">No internships found</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8 text-lg">We couldn't find any positions matching "{searchTerm}". Try adjusting your filters.</p>
                    <button onClick={() => setSearchTerm('')} className="text-indigo-600 font-bold hover:text-indigo-700 hover:bg-indigo-50 px-6 py-2.5 rounded-full transition-all border border-transparent hover:border-indigo-100">
                        Clear Search
                    </button>
                </div>
            )}
        </div>
    );
};

export default Internships;
