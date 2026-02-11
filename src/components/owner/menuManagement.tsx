import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { mockMenusByRestaurantId } from '../../mock/menus';
import MenuFormModal from './menuFormModal';

interface MenuManagementProps {
  storeId?: string;
}

interface Category {
  id: string;
  label: string;
}

type CategoryType = string;

const MenuManagement: React.FC<MenuManagementProps> = ({storeId}) => {

  const restaurantId = storeId;

  const STORAGE_KEY_CAT = restaurantId ? `menu-categories-${restaurantId}` : 'menu-categories-temp';
  const STORAGE_KEY_MENU = restaurantId ? `menu-items-${restaurantId}` : 'menu-items-temp';

  const DEFAULT_CATEGORIES: Category[] = [
    { id: 'ALL', label: '전체' },
    { id: 'MAIN', label: '메인 메뉴' },
    { id: 'SIDE', label: '사이드 메뉴' },
    { id: 'DRINK', label: '음료' },
  ];


  const [menus, setMenus] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<any>(null);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [tempCatLabel, setTempCatLabel] = useState('');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);


  useEffect(() => {
  if (!restaurantId) return;

  const currentMenus = mockMenusByRestaurantId[restaurantId] || [];
    setMenus(currentMenus);

    const savedCats = localStorage.getItem(STORAGE_KEY_CAT);
    if (savedCats) {
      setCategories(JSON.parse(savedCats));
    } else {
      setCategories(DEFAULT_CATEGORIES);
    }

    const savedMenus = localStorage.getItem(STORAGE_KEY_MENU);
    if (savedMenus) {
      setMenus(JSON.parse(savedMenus));
    } else {
      const initialMenus = mockMenusByRestaurantId[restaurantId] || [];
      setMenus(initialMenus);
      localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(initialMenus));
    }
  }, [restaurantId]);

  useEffect(() => {
    if (categories.length > 0 && restaurantId) {
      localStorage.setItem(STORAGE_KEY_CAT, JSON.stringify(categories));
    }
  }, [categories, restaurantId]);

  useEffect(() => {
    if (restaurantId && menus.length > 0) {
      localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(menus));
    }
  }, [menus, restaurantId]);


  const handleDragStart = (idx: number) => {
    if (categories[idx].id === 'ALL') return;
    setDraggedIdx(idx);
  };

const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault()
};

const handleDrop = (targetIdx: number) => {
  if (draggedIdx === null || draggedIdx === targetIdx) return;

  const newCategories = [...categories];
  const draggedItem = newCategories[draggedIdx];

  newCategories.splice(draggedIdx, 1);
  newCategories.splice(targetIdx, 0, draggedItem);

  setCategories(newCategories);
  setDraggedIdx(null);
};

  const toggleActive = (id: string) => {
    setMenus(prev => prev.map(menu => 
      menu.id === id ? { ...menu, isActive: !menu.isActive } : menu
    ));
  };

const handleFormSubmit = (menuData: any) => {
  if (editingMenu) {
    setMenus(prev => prev.map(m => m.id === menuData.id ? { ...m, ...menuData } : m));
  } else {
    const newMenu = { ...menuData, id: menuData.id || `MENU_${Date.now()}` };
    setMenus(prev => [menuData, ...prev]);
  }
  setIsModalOpen(false);
};

const deleteMenu = (id: string) => {
  if (window.confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
    setMenus(prev => prev.filter(m => m.id !== id));
  }
};

const handleEditClick = (menu: any) => {
  setEditingMenu(menu);
  setIsModalOpen(true);
};

const handleAddClick = () => {
  setEditingMenu(null);
  setIsModalOpen(true);
};

  const handleAddCategory = () => {
    const newId = `CAT_${Date.now()}`;
    const newCat = { id: newId, label: '새 카테고리' };
    setCategories([...categories, newCat]);
    setEditingCatId(newId);
    setTempCatLabel('새 카테고리');
  };

  const startEditCategory = (id: string, label: string) => {
    setEditingCatId(id);
    setTempCatLabel(label);
  };

  const saveCategory = (id: string) => {
    if (!tempCatLabel.trim()) return;
    setCategories(prev => prev.map(c => c.id === id ? { ...c, label: tempCatLabel } : c));
    setEditingCatId(null);
  };

  const deleteCategory = (id: string) => {
    const fallback = categories.find(c => c.id !== id && c.id !== 'ALL')?.id;
    if (window.confirm('카테고리를 삭제하시겠습니까?')) {
      if (!fallback) return alert('최소 하나의 카테고리는 필요합니다.');
      setMenus(prev => prev.map(m => m.category === id ? { ...m, category: fallback } : m));
      setCategories(prev => prev.filter(c => c.id !== id));
      if (activeCategory === id) setActiveCategory('ALL');
    }
  }

  const filteredMenus = activeCategory === 'ALL' 
    ? menus 
    : menus.filter(menu => menu.category === activeCategory);

  if (isLoading) return <div className="px-8 py-10 text-gray-500 font-medium">데이터를 불러오는 중...</div>;
  if (error) return <div className="px-8 py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* 헤더 섹션 */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-2xl text-gray-900 mb-1">메뉴 관리</h2>
          <p className="text-gray-500 text-sm font-medium">총 {menus.length}개의 메뉴가 등록되어 있습니다</p>
        </div>
        <button className="cursor-pointer bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
        onClick={handleAddClick}>
          <Plus size={18} /> 메뉴 추가
        </button>
      </div>

      {/* 카테고리 탭 */}
      <div className="overflow-x-auto flex gap-3 mb-8 p-4 rounded-lg bg-white">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
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
                  {categories.find(c => String(c.id) === String(menu.category))?.label || menu.category}
                </p>
                <p className="flex-1 text-md text-gray-500 leading-relaxed mb-6 line-clamp-2">
                  {menu.description}
                </p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="cursor-pointer p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  onClick={() => handleEditClick(menu)}
                  aria-label={`${menu.name} 수정`}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="cursor-pointer p-2 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => deleteMenu(menu.id)}
                  aria-label={`${menu.name} 삭제`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <span className="text-lg text-gray-900">{menu.price.toLocaleString()}원</span>
              
              {/* 활성 토글 스위치 */}
              <button 
                onClick={() => toggleActive(menu.id)}
                 role="switch"
                 aria-checked={menu.isActive}
                 aria-label={`${menu.name} 활성화 상태`}
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
  <div className="flex justify-between items-center mb-6">
    <h3 className="text-lg text-gray-700 font-semibold uppercase tracking-widest">카테고리 관리</h3>
    <p className="text-xs text-gray-400">드래그하여 순서를 변경할 수 있습니다</p>
  </div>
  
  <div className="space-y-2">
    {categories.filter(c => c.id !== 'ALL').map((cat) => {
      // 'ALL'을 제외했으므로 실제 원본 배열에서의 인덱스를 구함
      const realIdx = categories.findIndex(c => c.id === cat.id);
      
      return (
        <div 
          key={cat.id} 
          draggable // 드래그 가능하게 설정
          onDragStart={() => handleDragStart(realIdx)}
          onDragOver={(e) => {
            e.preventDefault();
            setHoverIdx(realIdx);
          }}
          onDrop={() => {
            handleDrop(realIdx);
            setHoverIdx(null);
          }}
          className={`flex items-center justify-between p-4 border-2 border-transparent hover:border-blue-100 hover:bg-blue-50/50 rounded-2xl transition-all group cursor-move ${
            draggedIdx === realIdx ? 'opacity-40 bg-gray-100 border-blue-400 bg-blue-50' : 'bg-white'
          }`}
        >
          <div className="flex items-center gap-4 flex-1">
            {/* 드래그 핸들 아이콘 (점 6개) */}
            <div className="flex flex-col gap-0.5 opacity-30 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
              </div>
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
              </div>
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
                <div className="w-1 h-1 bg-gray-400 rounded-full" />
              </div>
            </div>

            {editingCatId === cat.id ? (
              <div className="flex items-center gap-2 flex-1" onClick={(e) => e.stopPropagation()}>
                <input 
                  autoFocus
                  className="border-b-2 border-blue-500 outline-none bg-transparent px-1 py-1 text-gray-700 w-full max-w-[200px]"
                  value={tempCatLabel}
                  onChange={(e) => setTempCatLabel(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveCategory(cat.id)}
                />
                <button onClick={() => saveCategory(cat.id)} className="p-1 text-blue-600"><Check size={18}/></button>
                <button onClick={() => setEditingCatId(null)} className="p-1 text-gray-400"><X size={18}/></button>
              </div>
            ) : (
              <span className="text-gray-700">{cat.label}</span>
            )}
          </div>

          {!editingCatId && (
            <div className="flex gap-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); startEditCategory(cat.id, cat.label); }}
                className="text-blue-600 hover:text-blue-700"
              >
                수정
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteCategory(cat.id); }}
                className="text-red-500 hover:text-red-600"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      );
    })}
  </div>
        <button 
          onClick={handleAddCategory}
          className="cursor-pointer w-full mt-4 py-4 border-2 border-dashed border-gray-100 rounded-2xl text-gray-700 text-sm font-bold hover:bg-gray-50 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={16} /> 카테고리 추가
        </button>
      </section>

      <MenuFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleFormSubmit}
        categories={categories}
        editingMenu={editingMenu}
      />
    </div>
  );
};

export default MenuManagement;