import React from 'react';
import { Home, BarChart2, Grid, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { TabState } from '../App';

interface LayoutProps {
    children: React.ReactNode;
    activeTab?: TabState;
    onTabChange?: (tab: TabState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab = 'dashboard', onTabChange }) => {
    return (
        <div className="min-h-screen bg-zinc-50 flex justify-center py-0 font-sans antialiased text-zinc-900 relative">
            {/* App Container - Fully expansive Desktop view */}
            <div className="w-full max-w-[1440px] relative flex flex-col min-h-screen">

                {/* Header removed as requested */}

                {/* Scrollable Content */}
                <main className="flex-1 w-full px-6 lg:px-10 pt-10 overflow-y-auto pb-32">
                    {children}
                </main>

                {/* Floating Bottom Nav */}
                <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none">
                    <div className="flex bg-zinc-950 p-2 rounded-full items-center gap-1 shadow-2xl shadow-zinc-900/50 pointer-events-auto">

                        {/* Dashboard Tab */}
                        <button
                            onClick={() => onTabChange?.('dashboard')}
                            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full z-10 ${activeTab === 'dashboard' ? 'text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                        >
                            {activeTab === 'dashboard' && (
                                <motion.div
                                    layoutId="navPill"
                                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                                />
                            )}
                            <span className="relative z-10"><Home size={18} strokeWidth={2.5} /></span>
                            {activeTab === 'dashboard' && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2, delay: 0.05 }}
                                    className="relative z-10 text-xs font-bold whitespace-nowrap"
                                >
                                    Dashboard
                                </motion.span>
                            )}
                        </button>

                        {/* Analytics Tab */}
                        <button
                            onClick={() => onTabChange?.('analytics')}
                            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full z-10 ${activeTab === 'analytics' ? 'text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                        >
                            {activeTab === 'analytics' && (
                                <motion.div
                                    layoutId="navPill"
                                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                                />
                            )}
                            <span className="relative z-10"><BarChart2 size={18} strokeWidth={2.5} /></span>
                            {activeTab === 'analytics' && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2, delay: 0.05 }}
                                    className="relative z-10 text-xs font-bold whitespace-nowrap"
                                >
                                    Analytics
                                </motion.span>
                            )}
                        </button>

                        {/* Repository Tab */}
                        <button
                            onClick={() => onTabChange?.('documents')}
                            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full z-10 ${activeTab === 'documents' ? 'text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                        >
                            {activeTab === 'documents' && (
                                <motion.div
                                    layoutId="navPill"
                                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                                />
                            )}
                            <span className="relative z-10"><Grid size={18} strokeWidth={2.5} /></span>
                            {activeTab === 'documents' && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2, delay: 0.05 }}
                                    className="relative z-10 text-xs font-bold whitespace-nowrap"
                                >
                                    Repository
                                </motion.span>
                            )}
                        </button>

                        <div className="w-[1px] h-8 bg-zinc-800 mx-1"></div>

                        {/* Settings Tab */}
                        <button
                            onClick={() => onTabChange?.('profile')}
                            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full z-10 ml-1 ${activeTab === 'profile' ? 'text-zinc-950' : 'text-zinc-400 hover:text-white'}`}
                        >
                            {activeTab === 'profile' && (
                                <motion.div
                                    layoutId="navPill"
                                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                                />
                            )}
                            <span className="relative z-10"><Settings size={18} strokeWidth={2.5} /></span>
                            {activeTab === 'profile' && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2, delay: 0.05 }}
                                    className="relative z-10 text-xs font-bold whitespace-nowrap"
                                >
                                    Settings
                                </motion.span>
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};
