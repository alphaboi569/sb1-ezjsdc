import React, { useState } from 'react';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import BlockedSites from './components/BlockedSites';
import Analytics from './components/Analytics';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <LanguageProvider>
      <div className="w-[400px] h-[600px] bg-white flex flex-col">
        <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'blocked' && <BlockedSites />}
          {activeTab === 'stats' && <Analytics />}
        </main>
      </div>
    </LanguageProvider>
  );
};

export default App;