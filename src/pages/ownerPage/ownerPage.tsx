import React, { useState } from 'react';
import TableDashboard from './tableDashboard';
import {Store} from 'lucide-react';
import StoreSettings from './storeSettings';
import MenuManagement from './menuManagement';

type TabType = 'dashboard' | 'settings' | 'menu';

const OwnerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* 상단 통합 헤더 */}
      <header className="bg-white border-b border-gray-200 pt-3">
        <div className="max-w-7xl mx-auto">
          <div className="text-lg text-gray-900 flex items-center gap-2 pb-4 border-b px-5">
            <Store className="text-blue-600" size={24} />
            내 가게 관리
          </div>

          {/* 탭 메뉴 */}
          <nav className="flex gap-5 pt-4 px-5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`pb-4 px-2 text-md transition-all relative ${
                activeTab === 'dashboard' ? 'text-blue-600' : 'text-gray-900 hover:text-gray-900'
              }`}
            >
              <div className="cursor-pointer flex items-center gap-2">
                대시보드
              </div>
              {activeTab === 'dashboard' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-4 px-2 text-md transition-all relative ${
                activeTab === 'settings' ? 'text-blue-600' : 'text-gray-900 hover:text-gray-900'
              }`}
            >
              <div className="cursor-pointer flex items-center gap-2">
                가게 설정
              </div>
              {activeTab === 'settings' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`pb-4 px-2 text-md transition-all relative ${
                activeTab === 'menu' ? 'text-blue-600' : 'text-gray-900 hover:text-gray-900'
              }`}
            >
              <div className="cursor-pointer flex items-center gap-2">
                메뉴 관리
              </div>
              {activeTab === 'menu' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* 탭 콘텐츠 영역 */}
      <main>
        {activeTab === 'dashboard' && <TableDashboard />}
        {activeTab === 'settings' && (
          <div className="max-w-7xl mx-auto text-gray-500">
            {activeTab === 'settings' && <StoreSettings />}
          </div>
        )}
        {activeTab === 'menu' && (
          <div className="max-w-7xl mx-auto text-gray-500">
            {activeTab === 'menu' && <MenuManagement />}
          </div>
        )}
      </main>
    </div>
  );
};

export default OwnerPage;