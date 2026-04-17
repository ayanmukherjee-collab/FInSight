import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Boxes, Sparkles } from 'lucide-react';

export const LoadingView: React.FC = () => {
    const [step, setStep] = useState(0);

    const steps = [
        'Parsing PDF tables...',
        'Extracting net turnover...',
        'Matching expense data...',
        'Generating health score...'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 900);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-[60vh] max-w-sm mx-auto">
            <div className="relative w-32 h-32 mb-10 flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[4px] border-zinc-200 rounded-full border-t-zinc-900"
                />
                {/* Inner App Icon replica */}
                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-lg relative">
                    <Boxes size={28} className="text-white relative z-10" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/40 rounded-2xl blur-md"
                    />
                </div>
            </div>

            <div className="text-center w-full px-2">
                <h2 className="text-2xl font-bold text-zinc-900 mb-2">Analyzing Data</h2>
                <p className="text-sm text-zinc-500 font-medium mb-10 h-6">
                    {steps[step]}
                </p>

                {/* Fun stylized bento loader box */}
                <div className="bg-white p-6 rounded-[32px] border border-zinc-200 shadow-sm w-full">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Sparkles size={18} />
                        </div>
                        <div className="flex-1 text-left">
                            <p className="text-sm font-bold text-zinc-800">Claude AI Engine</p>
                            <p className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">Processing Document</p>
                        </div>
                    </div>

                    <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden flex shadow-inner">
                        <motion.div
                            className="h-full bg-zinc-900 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
