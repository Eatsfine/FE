import React, { useState } from 'react';
import { X, User, Calendar, Clock, Pencil, Check, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import type { BreakTime } from '../../components/owner/BreakTimeModal';

interface Props {
  tableNumber: number;
  onClose: () => void;
  breakTimes: BreakTime[];
  onManageReservation?: () => void; 
}

type Step = 'DETAIL' | 'CALENDAR' | 'SLOTS';
const TableDetailModal: React.FC<Props> = ({
  tableNumber,
  onClose,
  breakTimes,
}) => {
  const [step, setStep] = useState<Step>('DETAIL');
  
  const [isEditing, setIsEditing] = useState(false);
  const [capacity, setCapacity] = useState('2~4인');
  const [tempCapacity, setTempCapacity] = useState('2~4인');

  const [viewDate, setViewDate] = useState(new Date()); 
  const [selectedFullDate, setSelectedFullDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState(
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      time: `${String(Math.floor(i / 2) + 11).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`,
      isAvailable: true,
    }))
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (offset: number) => setViewDate(new Date(year, month + offset, 1));
  const handleBack = () => step === 'SLOTS' ? setStep('CALENDAR') : setStep('DETAIL');
  const confirmCapacity = () => { setCapacity(tempCapacity); setIsEditing(false); };

  const isBreakTime = (time: string, breakTimes: BreakTime[]) => {
    return breakTimes.some(
      (bt) => time >= bt.start && time < bt.end
    );
  };

  type TableType = '소형' | '중형' | '단체석';

  const getTableType = (capacity: string): TableType => {
    const numbers = capacity.match(/\d+/g);
    
    if (!numbers) return '소형'; // 숫자가 없을 경우 기본값

    const targetCapacity = numbers.length > 1 
      ? Number(numbers[1]) 
      : Number(numbers[0]);


    if (targetCapacity <= 4) return '소형';
    if (targetCapacity <= 8) return '중형';
    return '단체석';
  };

  const tableType = getTableType(capacity);

  const tableTypeStyle = {
    소형: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      text: 'text-yellow-700',
      label: '소형 테이블',
    },
    중형: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-700',
      label: '중형 테이블',
    },
    단체석: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      text: 'text-purple-700',
      label: '단체석',
    },
  };

  const [tableImageUrl, setTableImageUrl] = useState<string | null>(null);


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
    onClick={onClose}>
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      onClick={(e)=>e.stopPropagation()}>
        
        {/* 헤더 */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            {step !== 'DETAIL' && (
              <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
            )}
            <h3 className="text-lg text-gray-900">
              {step === 'DETAIL' ? `${tableNumber}번 테이블` : step === 'CALENDAR' ? `${tableNumber}번 테이블 예약 시간대` : '시간대 설정'}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"><X size={24} /></button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* [Step 1] 상세 정보 */}
          {step === 'DETAIL' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="w-full h-70 rounded-lg border border-gray-100 overflow-hidden">
                {tableImageUrl ? (
                  <img
                    src={tableImageUrl}
                    alt={`${tableNumber}번 테이블 이미지`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center border-dashed">
                    <span className="text-5xl">🪑</span>
                    <p className="text-gray-400 text-md mt-2">
                      등록된 이미지가 없습니다
                    </p>
                  </div>
                )}
              </div>


              <div className="grid grid-col-1">
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg min-h-[95px] flex flex-col justify-center transition-all">
                  <div className="flex items-center gap-1.5 text-gray-600 mb-1.5 text-md"><User size={14} color='purple' /> 인원</div>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input autoFocus type="text" value={tempCapacity} onChange={(e) => setTempCapacity(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && confirmCapacity()} className="w-full text-sm font-bold bg-white border border-yellow-300 rounded px-1 outline-none" />
                      <button onClick={confirmCapacity} className="text-green-600"><Check size={18} strokeWidth={3}/></button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-gray-800">
                      <span className="text-sm">{capacity}</span>
                      <button onClick={() => { setTempCapacity(capacity); setIsEditing(true); }} className="text-gray-300 hover:text-purple-600"><Pencil size={14} /></button>
                    </div>
                  )}
                </div>
              </div>

              <button onClick={() => setStep('CALENDAR')} className="cursor-pointer w-full bg-blue-600 text-white py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition-all active:scale-[0.98]">
                <Calendar size={18} /> 예약 정보 및 시간대 관리
              </button>

              <div className="bg-green-50/50 border border-green-100 p-4 rounded-lg flex items-center gap-4">
                <Clock size={20} className="text-green-500" />
                <div>
                  <p className="text-lg text-green-900 mb-0.5">예약 가능한 시간대</p>
                  <p className="text-lg text-green-900 leading-tight">{slots.filter(s => s.isAvailable).length}개 예약 가능</p>
                </div>
              </div>
            <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-lg gap-4">
                <div>
                  <p className="text-lg text-gray-900 mb-1">테이블 타입 및 좌석 정보</p>
                </div>
                <div className='w-40'>
                  <div className={`
                    flex items-center gap-1.5 px-2 py-2 rounded-lg border
                    ${tableTypeStyle[tableType].bg} 
                    ${tableTypeStyle[tableType].border}
                  `}>
                    <span className="text-lg">🎉</span> {/* 아이콘/이모지 */}
                    <span className={`text-sm ${tableTypeStyle[tableType].text}`}>
                      {tableTypeStyle[tableType].label}
                    </span>
                  </div>
                </div>
              </div>

          </div>
          )}

          {/* [Step 2] 달력 */}
          {step === 'CALENDAR' && (
            <div className="animate-in slide-in-from-right-5 duration-300 space-y-5">
              <div className="px-1 space-y-1">

                <p className="text-md text-gray-900">
                  날짜를 먼저 선택하세요
                </p>
              </div>

              <div className="flex justify-between items-center bg-blue-50 border border-blue-100 p-4 rounded-lg text-blue-900">
                <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-white rounded-full transition-colors cursor-pointer"><ChevronLeft /></button>
                <span className="text-lg">{year}년 {month + 1}월</span>
                <button onClick={() => changeMonth(1)} className="p-1 hover:bg-white rounded-full transition-colors cursor-pointer"><ChevronRight /></button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {['일','월','화','수','목','금','토'].map(d => <span key={d} className="text-center text-sm text-gray-400 mb-1">{d}</span>)}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateObj = new Date(year, month, day);
                  const isPast = dateObj < today;
                  const isTodayFlag = dateObj.getTime() === today.getTime();
                  return (
                    <button key={day} disabled={isPast} onClick={() => { setSelectedFullDate(dateObj); setStep('SLOTS'); }} className={`cursor-pointer h-14 rounded-xl border-2 flex flex-col items-center justify-center font-bold transition-all ${isPast ? 'bg-gray-50 border-gray-50 text-gray-300 cursor-not-allowed' : isTodayFlag ? 'bg-blue-50 border-gray-200 text-black shadow-lg hover:border-blue-300' : 'bg-white border-gray-100 text-gray-700 hover:border-blue-300 hover:bg-blue-50'}`}>
                      <span className="text-sm">{day}</span>
                      {isTodayFlag && <span className="text-[9px] mt-0.5 opacity-90">오늘</span>}
                    </button>
                  );
                })}
              </div>
              <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-lg gap-4">
                <div>
                  <p className="flex text-md text-gray-900 mb-1"> <Calendar className='mr-2' />날짜를 선택하여 예약 시간대를 관리하세요</p>
                  <p className="text-sm text-gray-900 mb-1 ml-8">과거 날짜는 선택할 수 없습니다</p>
                </div>
                </div>
            </div>
          )}

          {/* [Step 3] 시간 설정 */}
          {step === 'SLOTS' && (
            <div className="animate-in slide-in-from-right-5 duration-300 space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center text-blue-900">
                <div className="flex items-center gap-2"><Calendar size={18} /> <span>{selectedFullDate?.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}</span></div>
                <button onClick={() => setStep('CALENDAR')} className="text-sm underline text-blue-500 cursor-pointer">날짜 변경</button>
              </div>
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar">
                {slots.map(slot => {
                  const isBreak = isBreakTime(slot.time, breakTimes);

                  const isDisabled = isBreak;
                  const isAvailable = !isBreak && slot.isAvailable;

                  return (
                    <div
                      key={slot.id}
                      onClick={() => {
                        if (isDisabled) return;
                        setSlots(slots.map(s =>
                          s.id === slot.id
                            ? { ...s, isAvailable: !s.isAvailable }
                            : s
                        ));
                      }}
                      className={`flex justify-between items-center p-4 rounded-lg border-2 transition-all
                        ${
                          isBreak
                            ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                            : isAvailable
                              ? 'border-green-300 bg-green-50 cursor-pointer'
                              : 'border-red-300 bg-red-50 cursor-pointer'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 text-gray-700">
                        {isBreak ? (
                          <AlertCircle size={25} className="text-gray-400" />
                        ) : isAvailable ? (
                          <CheckCircle2 size={25} className="text-green-500" />
                        ) : (
                          <XCircle size={25} className="text-red-400" />
                        )}

                        <span className="text-sm">{slot.time}</span>
                      </div>

                      <span
                        className={`text-[10px] font-black px-2 py-1 rounded-lg
                          ${
                            isBreak
                              ? 'bg-gray-300 text-gray-600'
                              : isAvailable
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                          }
                        `}
                      >
                        {isBreak ? '미운영' : isAvailable ? '예약 가능' : '미운영'}
                      </span>
                    </div>
                  );
                })}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableDetailModal;