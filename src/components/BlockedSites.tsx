import React, { useState } from 'react';
import { Plus, X, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BlockedSites = () => {
  const { t } = useLanguage();
  const [sites, setSites] = useState([
    { url: 'facebook.com', timeLimit: 30, timeUsed: 15 },
    { url: 'youtube.com', timeLimit: 60, timeUsed: 45 },
    { url: 'twitter.com', timeLimit: 45, timeUsed: 20 },
  ]);

  const [newSite, setNewSite] = useState('');
  const [newTimeLimit, setNewTimeLimit] = useState('30');

  const addSite = () => {
    if (newSite && newTimeLimit) {
      setSites([...sites, { url: newSite, timeLimit: parseInt(newTimeLimit), timeUsed: 0 }]);
      setNewSite('');
      setNewTimeLimit('30');
    }
  };

  const removeSite = (index: number) => {
    setSites(sites.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">{t('blockedSites')}</h1>
        <p className="text-gray-600">{t('manageRestrictions')}</p>
      </header>

      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl p-6 text-white shadow-[0_0_25px_rgba(99,102,241,0.2)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <AlertCircle size={24} />
            <h2 className="text-xl font-semibold">{t('blockingStatus')}</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <Clock size={20} className="mb-2" />
            <p className="font-medium">{t('activeBlocks')}</p>
            <p className="text-2xl font-bold mt-1">{sites.length}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <AlertCircle size={20} className="mb-2" />
            <p className="font-medium">{t('timeSaved')}</p>
            <p className="text-2xl font-bold mt-1">2h 15m</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1 space-y-3">
            <input
              type="text"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
              placeholder={t('enterWebsite') as string}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex space-x-3">
              <input
                type="number"
                value={newTimeLimit}
                onChange={(e) => setNewTimeLimit(e.target.value)}
                placeholder={t('minutesPerDay') as string}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={addSite}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>{t('add')}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {sites.map((site, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">{site.url}</p>
                <button
                  onClick={() => removeSite(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{site.timeUsed} / {site.timeLimit} {t('minutesUsed')}</span>
                  <span>{Math.round((site.timeUsed / site.timeLimit) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all"
                    style={{ width: `${(site.timeUsed / site.timeLimit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockedSites;