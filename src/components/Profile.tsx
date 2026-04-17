import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Shield, CreditCard, LogOut, ChevronRight } from 'lucide-react';

export const Profile: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-2 lg:pt-6 pb-24 max-w-[1400px] mx-auto"
        >
            <div className="mb-10 w-full">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">
                        Configuration
                    </span>
                </div>
                <h1 className="text-5xl lg:text-[64px] font-black text-zinc-900 tracking-[-0.04em] leading-none mb-4">Profile & Settings</h1>
                <p className="text-base text-zinc-500 font-medium max-w-2xl">Manage your account credentials, view billing statements, and update your personal footprint.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Personal Info & Subs */}
                <div className="lg:col-span-2 space-y-6">
                    {/* ID Card */}
                    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-zinc-200/60 flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-zinc-200 relative z-10">
                                <img src="https://ui-avatars.com/api/?name=Max&background=f4f4f5&color=18181b&size=256" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <button className="absolute bottom-0 right-0 w-10 h-10 bg-zinc-900 border-2 border-white text-white rounded-full flex items-center justify-center hover:bg-zinc-800 transition-colors shadow-lg z-20">
                                <Settings size={18} />
                            </button>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-2">Maximus Aurelius</h2>
                            <p className="text-lg text-zinc-500 font-medium mb-6">Chief Financial Officer • Paradigm Shift LLC</p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <span className="px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full uppercase tracking-wider">Verified Identity</span>
                                <span className="px-4 py-2 bg-zinc-100 text-zinc-600 font-bold text-xs rounded-full uppercase tracking-wider">Enterprise User</span>
                            </div>
                        </div>
                    </div>

                    {/* Subscription & Usage */}
                    <div className="bg-zinc-900 text-white p-8 rounded-[40px] shadow-lg relative overflow-hidden flex flex-col xl:flex-row justify-between xl:items-center lg:p-10 gap-8">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-zinc-100">
                            <CreditCard size={120} />
                        </div>
                        <div className="relative z-10 w-full xl:max-w-md">
                            <h3 className="text-2xl font-bold tracking-tight mb-2">Pro Business Tier</h3>
                            <p className="text-zinc-400 font-medium mb-6">Your current cycle ends in 12 days. You're approaching your document processing threshold.</p>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm font-bold">
                                    <span>Usage</span>
                                    <span className="text-zinc-300">850 / 1000 PDF Ops</span>
                                </div>
                                <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="bg-white h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                        initial={{ width: 0 }}
                                        animate={{ width: "85%" }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 flex flex-col items-center xl:items-end w-full xl:w-auto">
                            <div className="text-5xl font-black tracking-tighter mb-4">$499<span className="text-xl text-zinc-500 font-bold">/mo</span></div>
                            <button className="w-full xl:w-auto px-8 py-3 bg-white text-zinc-900 font-bold rounded-xl hover:bg-zinc-200 transition-colors">
                                Manage Billing
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings & Security */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-[40px] shadow-sm border border-zinc-200/60 overflow-hidden">
                        <div className="p-6 md:p-8 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer group border-b border-zinc-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-zinc-100 text-zinc-600 rounded-2xl flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-900">Personal Info</h4>
                                    <p className="text-xs font-semibold text-zinc-500">Name, email, passwords</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                        </div>

                        <div className="p-6 md:p-8 flex items-center justify-between hover:bg-zinc-50 transition-colors cursor-pointer group border-b border-zinc-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-900">Security & 2FA</h4>
                                    <p className="text-xs font-semibold text-zinc-500">Authenticator active</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                        </div>

                        <div className="p-6 md:p-8 flex items-center justify-between hover:bg-red-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-100/50 text-red-500 rounded-2xl flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <LogOut size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-600">Sign Out</h4>
                                    <p className="text-xs font-semibold text-red-400">End current session</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-red-300 group-hover:text-red-600 transition-colors" />
                        </div>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};
