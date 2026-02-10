import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import type { CreateTableRequest } from '@/api/owner/storeLayout';

interface AddTableModalProps {
  onClose: () => void;
  onConfirm: (data: CreateTableRequest) => void;
  gridCols: number;
  gridRows: number;
  existingTables?: { gridX: number; gridY: number }[];
}

const AddTableModal: React.FC<AddTableModalProps> = ({
   onClose, onConfirm, gridCols, gridRows, existingTables = [], }) => {
  const [gridX, setGridX] = useState(1);
  const [gridY, setGridY] = useState(1);
  const [minSeatCount, setMinSeatCount] = useState(2);
  const [maxSeatCount, setMaxSeatCount] = useState(4);

  const handleConfirm = () => {
    if (minSeatCount > maxSeatCount) {
    alert('최소 인원은 최대 인원보다 클 수 없습니다.');
    return;
    }

    if (gridX < 1 || gridX > gridCols || gridY < 1 || gridY > gridRows) {
        alert(`좌표가 배치도 범위를 벗어났습니다. (1~${gridCols}, 1~${gridRows})`);
        return;
    }

    // 테이블 겹침 확인
    const isOccupied = existingTables.some(t => t.gridX === gridX && t.gridY === gridY);
    if (isOccupied) {
      alert('해당 좌표에 이미 테이블이 있습니다.');
      return;
    }

    onConfirm({ 
        gridX, 
        gridY, 
        minSeatCount, 
        maxSeatCount, 
        seatsType: 'GENERAL', 
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 relative">
        <button className="absolute top-2 right-2" onClick={onClose}><X /></button>
        <h3 className="text-lg mb-4">새 테이블 추가</h3>
        <div className="flex flex-col gap-2 mb-4">
          <label>좌표 X (1~{gridCols})</label>
          <input type="number" className="border p-1 rounded w-full" value={gridX} onChange={e => setGridX(Number(e.target.value))}/>
          <label>좌표 Y (1~{gridRows})</label>
          <input type="number" className="border p-1 rounded w-full" value={gridY} onChange={e => setGridY(Number(e.target.value))}/>
          <label>최소 인원</label>
          <input type="number" className="border p-1 rounded w-full" value={minSeatCount} onChange={e => setMinSeatCount(Number(e.target.value))}/>
          <label>최대 인원</label>
          <input type="number" className="border p-1 rounded w-full" value={maxSeatCount} onChange={e => setMaxSeatCount(Number(e.target.value))}/>
        </div>
        <button 
          onClick={handleConfirm} 
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition-all"
        >
          <Check size={16}/> 생성
        </button>
      </div>
    </div>
  );
};

export default AddTableModal;
