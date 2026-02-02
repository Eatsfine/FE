import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { mockMenusByRestaurantId } from '../../mock/menus';

type CategoryType = 'ALL' | 'MAIN' | 'SIDE' | 'DRINK';

const MenuManagement: React.FC = () => {

  const restaurantId = "1";
  const [menus, setMenus] = useState(mockMenusByRestaurantId[restaurantId] || []);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL');

  const categories = [
    { id: 'ALL', label: '전체' },
    { id: 'MAIN', label: '메인 메뉴' },
    { id: 'SIDE', label: '사이드 메뉴' },
    { id: 'DRINK', label: '음료' },
  ];

  const filteredMenus = activeCategory === 'ALL' 
    ? menus 
    : menus.filter(menu => menu.category === activeCategory);

  const toggleActive = (id: string) => {
    setMenus(prev => prev.map(menu => 
      menu.id === id ? { ...menu, isActive: !menu.isActive } : menu
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* 헤더 섹션 */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-2xl text-gray-900 mb-1">메뉴 관리</h2>
          <p className="text-gray-500 text-sm font-medium">총 {menus.length}개의 메뉴가 등록되어 있습니다</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          <Plus size={18} /> 메뉴 추가
        </button>
      </div>

      {/* 카테고리 탭 */}
      <div className="overflow-x-auto flex gap-3 mb-8 p-4 rounded-lg bg-white">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as CategoryType)}
            className={`cursor-pointer px-5 py-2.5 rounded-lg text-md transition-all ${
              activeCategory === cat.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 border border-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 메뉴 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredMenus.map(menu => (
          <div
            key={menu.id}
            className={`
              flex flex-col rounded-lg p-6 transition-all relative group border
              ${menu.isActive
                ? 'bg-white border-gray-100'
                : 'bg-gray-100 border-gray-200 opacity-60'}
            `}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg text-gray-900">{menu.name}</h4>
                  {menu.isSoldOut && (
                    <span className="bg-red-50 text-red-500 text-[10px] px-2 py-0.5 rounded-md font-black border border-red-100">품절</span>
                  )}
                </div>
                <p className="text-sm text-blue-500 mb-3">
                  {categories.find(c => c.id === menu.category)?.label}
                </p>
                <p className="flex-1 text-md text-gray-500 leading-relaxed mb-6 line-clamp-2">
                  {menu.description}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="cursor-pointer p-2 text-gray-400 hover:text-blue-600 transition-colors"><Pencil size={16} /></button>
                <button className="cursor-pointer p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <span className="text-lg text-gray-900">{menu.price.toLocaleString()}원</span>
              
              {/* 활성 토글 스위치 */}
              <button 
                onClick={() => toggleActive(menu.id)}
                className={`cursor-pointer w-12 h-6 rounded-full transition-colors relative ${menu.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${menu.isActive ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 카테고리 관리 섹션*/}
      <section className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
        <h3 className="text-lg text-gray-700 font-semibold uppercase tracking-widest mb-6">카테고리 관리</h3>
        <div className="space-y-1">
          {categories.filter(c => c.id !== 'ALL').map(cat => (
            <div key={cat.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group">
              <span className="text-gray-700">{cat.label}</span>
              <div className="flex gap-4 text-sm">
                <button className="text-blue-600 hover:text-blue-700 cursor-pointer">수정</button>
                <button className="text-red-500 hover:text-red-600 cursor-pointer">삭제</button>
              </div>
            </div>
          ))}
        </div>
        <button className="cursor-pointer w-full mt-4 py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-700 text-sm font-bold hover:bg-gray-50 hover:border-blue-200 transition-all flex items-center justify-center gap-2">
          <Plus size={16} /> 카테고리 추가
        </button>
      </section>
    </div>
  );
};

export default MenuManagement;