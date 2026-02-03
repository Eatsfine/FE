import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface MenuFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (menuData: any) => void;
  categories: { id: string; label: string }[];
  editingMenu?: any; // 수정 시 전달받을 데이터
}

const MenuFormModal: React.FC<MenuFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  categories, 
  editingMenu 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'MAIN',
    price: '',
    description: '',
  });

  // 수정 모드일 경우 기존 데이터를 폼에 채워넣음
  useEffect(() => {
    if (editingMenu) {
      setFormData({
        name: editingMenu.name,
        category: editingMenu.category,
        price: editingMenu.price.toString(),
        description: editingMenu.description || '',
      });
    } else {
      setFormData({ name: '', category: 'MAIN', price: '', description: '' });
    }
  }, [editingMenu, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: editingMenu?.id || Date.now().toString(), // 수정이면 기존 ID, 추가면 새 ID
      price: Number(formData.price),
      isActive: editingMenu ? editingMenu.isActive : true,
      isSoldOut: editingMenu ? editingMenu.isSoldOut : false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100">
        <div className="flex justify-between items-center px-8 py-6 border-b border-gray-50">
          <h3 className="text-xl text-gray-900">
            {editingMenu ? '메뉴 수정' : '새 메뉴 등록'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-500 ml-1">메뉴 이름</label>
            <input
              required
              type="text"
              placeholder="메뉴명을 입력하세요"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-500 ml-1">카테고리</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700 bg-white"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.filter(c => c.id !== 'ALL').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 ml-1">가격 (원)</label>
              <input
                required
                type="number"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500 ml-1">메뉴 설명</label>
            <textarea
              rows={3}
              placeholder="메뉴에 대한 설명을 입력하세요"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all text-sm font-medium"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all text-sm font-medium"
            >
              {editingMenu ? '수정 완료' : '메뉴 등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuFormModal;