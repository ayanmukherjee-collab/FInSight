import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, Clock, AlertCircle, Download, Search } from 'lucide-react';
import { UploadWidget } from './UploadWidget';

interface DocumentCenterProps {
    onUpload: () => void;
}

const historicalFiles = [
    { id: 1, name: 'Q4_Profit_Loss_Statement_2023.pdf', size: '2.4 MB', date: 'Jan 14, 2024', status: 'parsed' },
    { id: 2, name: 'GSTR-3B_December_23.pdf', size: '1.1 MB', date: 'Jan 05, 2024', status: 'parsed' },
    { id: 3, name: 'Vendor_Invoices_Q4_Batch.pdf', size: '8.4 MB', date: 'Jan 02, 2024', status: 'failed' },
    { id: 4, name: 'Payroll_Ledger_Dec23.pdf', size: '0.8 MB', date: 'Dec 28, 2023', status: 'parsed' },
    { id: 5, name: 'Tax_Audit_Report_FY23.pdf', size: '14.2 MB', date: 'Nov 15, 2023', status: 'parsed' },
    { id: 6, name: 'Q3_Profit_Loss_Statement_2023.pdf', size: '2.1 MB', date: 'Oct 12, 2023', status: 'parsed' },
    { id: 7, name: 'GSTR-3B_November_23.pdf', size: '1.0 MB', date: 'Nov 04, 2023', status: 'parsed' },
    { id: 8, name: 'Contract_Agreements_Corp.pdf', size: '12.4 MB', date: 'Oct 28, 2023', status: 'parsed' },
    { id: 9, name: 'Expense_Reimbursements_Oct23.pdf', size: '3.3 MB', date: 'Oct 25, 2023', status: 'processing' },
    { id: 10, name: 'GSTR-3B_October_23.pdf', size: '1.1 MB', date: 'Oct 05, 2023', status: 'parsed' },
    { id: 11, name: 'Payroll_Ledger_Nov23.pdf', size: '0.8 MB', date: 'Nov 28, 2023', status: 'parsed' },
    { id: 12, name: 'Q2_Profit_Loss_Statement_2023.pdf', size: '2.2 MB', date: 'Jul 14, 2023', status: 'parsed' },
];

export const DocumentCenter: React.FC<DocumentCenterProps> = ({ onUpload }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-2 lg:pt-6 pb-24 max-w-[1400px] mx-auto"
        >
            <div className="mb-10 w-full flex flex-col xl:flex-row xl:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">
                            Repository
                        </span>
                    </div>
                    <h1 className="text-5xl lg:text-[64px] font-black text-zinc-900 tracking-[-0.04em] leading-none mb-4">Document Center</h1>
                    <p className="text-base text-zinc-500 font-medium max-w-2xl">Drop new fiscal filings to feed the AI engine or browse your historical ledger.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

                {/* Upload Widget Col */}
                <div className="lg:col-span-1 flex">
                    <UploadWidget onUpload={onUpload} />
                </div>

                {/* Historical Ledger */}
                <div className="bg-white rounded-[40px] shadow-sm border border-zinc-200/60 lg:col-span-2 overflow-hidden flex flex-col max-h-[600px]">
                    <div className="p-6 lg:p-8 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-50/50 shrink-0 gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-zinc-900 tracking-tight">Recent Filings</h3>
                            <p className="text-xs font-semibold text-zinc-500 mt-1">Showing all parsed and flagged documents</p>
                        </div>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search records..."
                                className="pl-9 pr-4 py-2 border border-zinc-200 rounded-full text-xs font-bold text-zinc-900 bg-white focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 w-full sm:w-64 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-x-auto overflow-y-auto mb-8 rounded-b-[16px]">
                        <table className="w-full text-left border-collapse relative">
                            <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                                <tr>
                                    <th className="pb-3 pt-4 px-6 lg:px-8 text-xs font-bold tracking-widest text-zinc-400 uppercase">Document</th>
                                    <th className="pb-3 pt-4 px-6 text-xs font-bold tracking-widest text-zinc-400 uppercase">Size</th>
                                    <th className="pb-3 pt-4 px-6 text-xs font-bold tracking-widest text-zinc-400 uppercase">Date</th>
                                    <th className="pb-3 pt-4 px-6 text-xs font-bold tracking-widest text-zinc-400 uppercase">Status</th>
                                    <th className="pb-3 pt-4 px-6 text-xs font-bold tracking-widest text-zinc-400 uppercase text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historicalFiles.map((file) => (
                                    <tr key={file.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors group">
                                        <td className="py-4 px-6 lg:px-8">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${file.status === 'failed' ? 'bg-red-100/50 text-red-600' : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-colors'}`}>
                                                    <FileText size={18} />
                                                </div>
                                                <p className="text-sm font-bold text-zinc-900 leading-tight">{file.name}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-semibold text-zinc-500 whitespace-nowrap">{file.size}</td>
                                        <td className="py-4 px-6 text-sm font-semibold text-zinc-500 whitespace-nowrap">{file.date}</td>
                                        <td className="py-4 px-6">
                                            {file.status === 'parsed' && (
                                                <div className="flex items-center gap-1.5 text-emerald-600 w-max">
                                                    <CheckCircle2 size={14} strokeWidth={3} />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Parsed</span>
                                                </div>
                                            )}
                                            {file.status === 'processing' && (
                                                <div className="flex items-center gap-1.5 text-blue-600 w-max">
                                                    <Clock size={14} strokeWidth={3} className="animate-spin-slow" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Indexing</span>
                                                </div>
                                            )}
                                            {file.status === 'failed' && (
                                                <div className="flex items-center gap-1.5 text-red-600 w-max">
                                                    <AlertCircle size={14} strokeWidth={3} />
                                                    <span className="text-xs font-bold uppercase tracking-wider">Failed</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button className="w-10 h-10 rounded-full inline-flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 transition-colors">
                                                <Download size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </motion.div>
    );
};
