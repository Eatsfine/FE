import React, { useState } from 'react';
import { Store, Plus, Clock, Pencil, Check, X, Lightbulb } from 'lucide-react';
import TableCreateModal from './tableCreateModal';
import TableDetailModal from './tableDetailModal';
import BreakTimeModal, { type BreakTime } from './BreakTimeModal';

interface TableInfo {
  numValue: number;
  minCapacity: number;
  maxCapacity: number;
  isEditingCapacity: boolean;
  isEditingNum: boolean;
}

const TableDashboard: React.FC = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [config, setConfig] = useState({ columns: 4, rows: 3 });
  const [isBreakModalOpen, setIsBreakModalOpen] = useState(false);
const [breakTimes, setBreakTimes] = useState<BreakTime[]>([]);
  const [tableData, setTableData] = useState<Record<number, TableInfo>>({});

  const getTableData = (id: number): TableInfo => {
    return tableData[id] || {
      numValue: id,
      minCapacity: 2,
      maxCapacity: 4,
      isEditingCapacity: false,
      isEditingNum: false,
    };
  };

  const updateTable = (id: number, updates: Partial<TableInfo>) => {
    setTableData(prev => ({
      ...prev,
      [id]: { ...getTableData(id), ...updates }
    }));
  };

  const getTableStyle = (capacity: number) => {
    if (capacity <= 4)
    return {
      border: 'border-yellow-300',
      bg: 'bg-yellow-100',
      badge: 'bg-yellow-500',
      hover: 'hover:bg-yellow-200',
    };

  if (capacity <= 8)
    return {
      border: 'border-blue-300',
      bg: 'bg-blue-100',
      badge: 'bg-blue-500',
      hover: 'hover:bg-blue-200',
    };

  return {
    border: 'border-purple-300',
    bg: 'bg-purple-100',
    badge: 'bg-purple-500',
    hover: 'hover:bg-purple-200',
  };
};

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <main className="max-w-7xl mx-auto px-8 py-10">
        
        {/* 1. 상단 헤더 섹션 */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-xl text-gray-900 mb-1">테이블 관리</h2>
            <p className="text-gray-500 text-md">총 {config.columns * config.rows}개의 테이블이 관리되고 있습니다</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsBreakModalOpen(true)}
              className="flex items-center gap-2 border border-gray-200 px-5 py-2.5 rounded-lg bg-white text-gray-700 text-md hover:bg-gray-50 transition-all"
            >
              <Clock size={18} className="text-gray-400" />
              브레이크 타임 설정
            </button>
            <button 
              onClick={() => setCreateModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-md hover:bg-blue-700 transition-all"
            >
              <Plus size={18} /> 테이블 재생성
            </button>
          </div>
        </div>

        {/* 브레이크 타임 목록 */}
        {breakTimes.length > 0 && (
          <div className="mb-8">
            <div className="bg-white border border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4">
                브레이크 타임 목록
              </div>

              <div className="flex flex-wrap gap-3">
                {breakTimes.map((bt, idx) => (
                  <div
                    key={`${bt.start}-${bt.end}-${idx}`}
                    className="w-full bg-orange-50 flex items-center gap-2 border border-orange-200 px-4 py-4 rounded-lg"
                  >
                    <Clock size={18} color='orange' />
                    <span className="text-md text-orange-900">
                      {bt.start} ~ {bt.end}
                    </span>
                    <button
                      onClick={() =>
                        setBreakTimes(prev =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                      className="ml-auto text-orange-400 hover:text-red-500 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* 2. 3개 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-md">
              <Store size={20} color='blue' /> 총 가게 수
            </div>
            <p className="text-md">1개</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-md">
              📅 총 테이블 수
            </div>
            <p className="text-2md">
              {config.columns * config.rows}개
            </p>
          </div>
        </div>



        {/* 3. 메인 영역 (배치도) */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl text-gray-900">테이블 배치도</h3>
            <span className="text-gray-900 text-sm tracking-widest uppercase">{config.columns} X {config.rows} 그리드</span>
          </div>

          <div className="grid gap-8 mb-12" style={{ gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))` }}>
            {Array.from({ length: config.columns * config.rows }).map((_, i) => {
              const id = i + 1;
              const table = getTableData(id);
              const style = getTableStyle(table.maxCapacity);

              return (
                <div 
                  key={id} 
                  onClick={() => !table.isEditingCapacity && setSelectedTable(id)}
                  className={`border-2 ${style.border} rounded-lg p-5 ${style.bg} flex flex-col items-center cursor-pointer ${style.hover} transition-all relative group aspect-[4/5] justify-center`}
                >
                  <div className="flex items-center gap-1.5 mb-5 text-gray-800 text-md h-8">
                    {table.isEditingCapacity ? (
                      <span className="text-[#4A5568]">인원 설정</span>
                    ) : table.isEditingNum ? (
                      <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          autoFocus
                          type="number"
                          className="bg-white/60 border-b border-orange-400 outline-none text-center w-10 font-bold"
                          value={table.numValue}
                          onChange={(e) => updateTable(id, { numValue: Number(e.target.value) })}
                          onBlur={() => updateTable(id, { isEditingNum: false })}
                          onKeyDown={(e) => e.key === 'Enter' && updateTable(id, { isEditingNum: false })}
                        />
                        <span className="ml-1">번 테이블</span>
                      </div>
                    ) : (
                      <>
                        {table.numValue}번 테이블 
                        <Pencil 
                          size={14} 
                          className="text-orange-400 fill-orange-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
                          onClick={(e) => { e.stopPropagation(); updateTable(id, { isEditingNum: true }); }}
                        />
                      </>
                    )}
                  </div>

                  {/* 인원 설정 버튼 및 컨트롤러 */}
                  <div className="relative w-full flex flex-col items-center">
                    {table.isEditingCapacity ? (
                      <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="bg-white rounded-lg border border-blue-200 p-1 flex items-center shadow-sm">
                            <span className="text-base px-1.5">{table.minCapacity}</span>
                            <div className="flex flex-col border-l pl-0.5 text-[8px]">
                                <button onClick={() => updateTable(id, { minCapacity: table.minCapacity + 1 })} className="hover:text-blue-500">▲</button>
                                <button onClick={() => updateTable(id, { minCapacity: Math.max(1, table.minCapacity - 1) })} className="hover:text-blue-500">▼</button>
                            </div>
                          </div>
                          <span className="text-sm text-gray-400">~</span>
                          <div className="bg-white rounded-lg border border-blue-200 p-1 w-9 text-center shadow-sm">
                             <input 
                                type="number"
                                className="w-full text-base outline-none text-center bg-transparent"
                                value={table.maxCapacity}
                                onChange={(e) => updateTable(id, { maxCapacity: Number(e.target.value) })}
                             />
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button onClick={() => updateTable(id, { isEditingCapacity: false })} className="bg-[#6BCB77] p-1.5 rounded-lg text-white active:scale-90 shadow-sm"><Check size={14}/></button>
                          <button onClick={() => updateTable(id, { isEditingCapacity: false })} className="bg-[#FF6B6B] p-1.5 rounded-lg text-white active:scale-90 shadow-sm"><X size={14}/></button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={(e) => { e.stopPropagation(); updateTable(id, { isEditingCapacity: true }); }}
                        className={`${style.badge} text-white px-3 py-1 rounded-md text-md shadow-md min-w-[80px] text-center transition-transform active:scale-95`}
                      >
                        {table.minCapacity}~{table.maxCapacity}인
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. 하단 팁 및 범례 섹션 */}
          <div className="bg-gray-50 border border-gray-100 rounded-[28px] p-7 mt-8">
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
              <Lightbulb size={20} className="text-yellow-400 fill-yellow-400" />
              <span>Tip: 테이블을 클릭하면 상세 정보를 확인하고 예약 시간대를 관리할 수 있습니다.</span>
            </div>
            <div className="flex gap-10 text-sm text-gray-600 pl-8 uppercase tracking-wider">
              <div className="flex items-center gap-1"><div className="w-5 h-5 rounded-sm bg-[#D4A017]" /> 소형 (4인 이하)</div>
              <div className="flex items-center gap-1"><div className="w-5 h-5 rounded-sm bg-blue-500" /> 중형 (5~8인)</div>
              <div className="flex items-center gap-1"><div className="w-5 h-5 rounded-sm bg-purple-500" /> 단체석 (9인 이상)</div>
            </div>
          </div>
        </div>
      </main>

      {/* 모달 컴포넌트들 */}
      {isCreateModalOpen && <TableCreateModal onClose={() => setCreateModalOpen(false)} onConfirm={(c, r) => { setConfig({ columns: c, rows: r }); setCreateModalOpen(false); }} />}
      {selectedTable && <TableDetailModal tableNumber={selectedTable} onClose={() => setSelectedTable(null)} breakTimes={breakTimes} />}
      {isBreakModalOpen && (
        <BreakTimeModal
          openTime="11:00"
          closeTime="22:00"
          onClose={() => setIsBreakModalOpen(false)}
          onConfirm={(bt) =>
            setBreakTimes((prev) => [...prev, bt])
          }
        />
      )}
    </div>
  );
};

export default TableDashboard;