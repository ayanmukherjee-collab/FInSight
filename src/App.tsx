import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { LoadingView } from './components/LoadingView';
import { Dashboard } from './components/Dashboard';
import { Analytics } from './components/Analytics';
import { DocumentCenter } from './components/DocumentCenter';
import { Profile } from './components/Profile';

type AppState = 'DASHBOARD' | 'LOADING';
export type TabState = 'dashboard' | 'analytics' | 'documents' | 'profile';

const App: React.FC = () => {
    const [state, setState] = useState<AppState>('DASHBOARD');
    const [activeTab, setActiveTab] = useState<TabState>('dashboard');

    const handleUpload = () => {
        setState('LOADING');
        // Simulate AI extraction delay
        setTimeout(() => {
            setState('DASHBOARD');
        }, 3500);
    };

    return (
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
            {state === 'DASHBOARD' && activeTab === 'dashboard' && <Dashboard onUpload={handleUpload} onNavigateToAnalytics={() => setActiveTab('analytics')} />}
            {state === 'DASHBOARD' && activeTab === 'analytics' && <Analytics />}
            {state === 'DASHBOARD' && activeTab === 'documents' && <DocumentCenter onUpload={handleUpload} />}
            {state === 'DASHBOARD' && activeTab === 'profile' && <Profile />}
            {state === 'LOADING' && <LoadingView />}
        </Layout>
    );
};

export default App;
