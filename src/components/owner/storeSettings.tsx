import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';

interface StoreSettingsProps {
  storeId?: string;
}

interface StoreSettingsData {
  storeName: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  openTime: string;
  closeTime: string;
  closedDays: string[];
  reservationPeriod: string;
  minGuests: number;
  maxGuests: number;
  sameDayBooking: boolean;
  noShowPolicy: boolean;
}


const days = ['월', '화', '수', '목', '금', '토', '일'];

const StoreSettings: React.FC<StoreSettingsProps> = ({storeId}) => {
  const [storeName, setStoreName] = useState('맛있는 레스토랑');
  const [description, setDescription] = useState('신선한 재료로 만드는 정성 가득한 음식을 제공합니다.');
  const [phone, setPhone] = useState('02-1234-5678');
  const [email, setEmail] = useState('store@example.com');
  const [address, setAddress] = useState('서울특별시 강남구 테헤란로 123');
  
  const [openTime, setOpenTime] = useState('11:00');
  const [closeTime, setCloseTime] = useState('22:00');
  const [closedDays, setClosedDays] = useState<string[]>([]);
  
  const [reservationPeriod, setReservationPeriod] = useState('1주일 전까지');
const [minGuests, setMinGuests] = useState<number | string>(1);
  const [maxGuests, setMaxGuests] = useState<number | string>(20);
  const [sameDayBooking, setSameDayBooking] = useState(false);
  const [noShowPolicy, setNoShowPolicy] = useState(true);

  const STORAGE_KEY = storeId
  ? `store-settings-${storeId}`
  : 'store-settings-temp';

  useEffect(() => {
  if (!storeId) return;

  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const data: StoreSettingsData = JSON.parse(saved);

    setStoreName(data.storeName);
    setDescription(data.description);
    setPhone(data.phone);
    setEmail(data.email);
    setAddress(data.address);
    setOpenTime(data.openTime);
    setCloseTime(data.closeTime);
    setClosedDays(data.closedDays);
    setReservationPeriod(data.reservationPeriod);
    setMinGuests(data.minGuests);
    setMaxGuests(data.maxGuests);
    setSameDayBooking(data.sameDayBooking);
    setNoShowPolicy(data.noShowPolicy);
  }
}, [storeId]);



  const toggleDay = (day: string) => {
    setClosedDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const inputStyle = "w-full border border-gray-200 rounded-lg p-4 mt-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400";
  const labelStyle = "block text-md text-gray-700";
  const sectionStyle = "bg-white border border-gray-200 rounded-lg p-8 mb-6";

  const isValid = () => {
  return (
    storeName.trim() &&
    description.trim() &&
    phone.trim() &&
    email.trim() &&
    address.trim()
  );
};

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* 기본 정보 섹션 */}
      <section className={sectionStyle}>
        <h3 className="text-lg mb-8">기본 정보</h3>
        <div className="space-y-6">
          <div>
            <label htmlFor="store-name" className={labelStyle}>가게 이름</label>
            <input 
              id='store-name'
              type="text" 
              value={storeName} 
              onChange={(e) => setStoreName(e.target.value)} 
              placeholder="가게 이름을 입력하세요"
              className={inputStyle} 
            />
          </div>
          <div>
            <label htmlFor='store-description' className={labelStyle}>가게 설명</label>
            <textarea 
            id='store-description'
              rows={4} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="가게 설명을 입력하세요"
              className={`${inputStyle} resize-none`} 
            />
          </div>
          <div>
            <label htmlFor='store-phone' className={labelStyle}>전화번호</label>
            <div className="relative">
              <Phone size={18} className="absolute left-4 top-[26px] text-gray-400" />
              <input 
              id='store-phone'
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="전화번호를 입력하세요"
                className={`${inputStyle} pl-12`} 
              />
            </div>
          </div>
          <div>
            <label htmlFor='store-email' className={labelStyle}>이메일</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-[26px] text-gray-400" />
              <input 
              id='store-email'
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="이메일 주소를 입력하세요"
                className={`${inputStyle} pl-12`} 
              />
            </div>
          </div>
          <div>
            <label className={labelStyle}>주소</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-[26px] text-gray-400" />
              <input 
                type="text" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                placeholder="가게 주소를 입력하세요"
                className={`${inputStyle} pl-12`} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 영업 시간 섹션 */}
      <section className={sectionStyle}>
        <h3 className="text-lg mb-8">영업 시간</h3>
        <div className="space-y-6 mb-8">
          <div>
            <label className={labelStyle}>오픈 시간</label>
            <div className="relative">
              <Clock size={18} className="absolute left-4 top-[26px] text-gray-400" />
              <input 
                type="time" 
                value={openTime} 
                onChange={(e) => setOpenTime(e.target.value)} 
                className={`${inputStyle} pl-12 cursor-pointer`} 
              />
            </div>
          </div>
          <div>
            <label className={labelStyle}>마감 시간</label>
            <div className="relative">
              <Clock size={18} className="absolute left-4 top-[26px] text-gray-400" />
              <input 
                type="time" 
                value={closeTime} 
                onChange={(e) => setCloseTime(e.target.value)} 
                className={`${inputStyle} pl-12 cursor-pointer`} 
              />
            </div>
          </div>
        </div>
        <div>
          <label className={`${labelStyle} mb-4`}>정기 휴무일</label>
          <div className="flex gap-3">
            {days.map(day => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                aria-pressed={closedDays.includes(day)}
                aria-label={`${day}요일 휴무`}
                className={`w-12 h-12 rounded-xl border transition-all cursor-pointer ${
                  closedDays.includes(day) 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-200 shadow-sm'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 예약 정책 섹션 */}
      <section className={sectionStyle}>
        <h3 className="text-lg mb-8">예약 정책</h3>
        <div className="space-y-8">
          <div>
            <label className={labelStyle}>예약 가능 기간</label>
            <div className="relative mt-2">
              <select 
                value={reservationPeriod} 
                onChange={(e) => setReservationPeriod(e.target.value)}
                className="cursor-pointer w-full border border-gray-200 rounded-lg p-4 text-sm appearance-none outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>당일만</option>
                <option>1주일 전까지</option>
                <option>1개월 전까지</option>
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div>
            <label className={labelStyle}>최소 예약 인원</label>
            <input 
              type="number" 
              value={minGuests} 
              min={1}
              max={maxGuests}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setMinGuests('');
                  return;
                }
                setMinGuests(Number(value));
              }}
              onBlur={() => {
                if (minGuests === '' || Number(minGuests) < 1) {
                  setMinGuests(1);
                }
              }}
              placeholder="최소 인원을 입력하세요"
              className={inputStyle} 
            />
          </div>

          <div>
            <label className={labelStyle}>최대 예약 인원</label>
            <input 
              type="number" 
              value={maxGuests} 
              min={minGuests}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setMaxGuests('');
                  return;
                }
                setMaxGuests(Number(value));
              }}
              onBlur={() => {
                const minVal = Number(minGuests) || 1;
                if (maxGuests === '' || Number(maxGuests) < minVal) {
                  setMaxGuests(minVal);
                }
              }}
              placeholder="최대 인원을 입력하세요"
              className={inputStyle} 
            />
          </div>

          {/* 토글 스위치 영역 */}
          <div className="space-y-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-800 text-base">당일 예약 허용</p>
                <p className="text-sm text-gray-500 mt-1">당일 예약을 받을 수 있습니다</p>
              </div>
              <button 
                onClick={() => setSameDayBooking(!sameDayBooking)}
                role='switch'
                aria-checked={sameDayBooking}
                aria-label='당일 예약 허용'
                className={`cursor-pointer w-14 h-7 rounded-full transition-colors relative ${sameDayBooking ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${sameDayBooking ? 'left-8' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-800 text-base">노쇼 방지 정책</p>
                <p className="text-sm text-gray-500 mt-1">예약 시 결제 정보를 받습니다</p>
              </div>
              <button 
                onClick={() => setNoShowPolicy(!noShowPolicy)}
                role='switch'
                aria-checked={noShowPolicy}
                aria-label='노쇼 방지 정책'
                className={`cursor-pointer w-14 h-7 rounded-full transition-colors relative ${noShowPolicy ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${noShowPolicy ? 'left-8' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 저장 버튼 */}
      <div className="flex justify-end mb-20">
        <button 
          onClick={() => {
            if (!isValid) {
              alert('가게 이름, 설명, 전화번호, 이메일, 주소는 필수 입력 항목입니다.');
              return;
            }

            if (!storeId) return;

            const data: StoreSettingsData = {
              storeName,
              description,
              phone,
              email,
              address,
              openTime,
              closeTime,
              closedDays,
              reservationPeriod,
              minGuests: Number(minGuests),
              maxGuests: Number(maxGuests),
              sameDayBooking,
              noShowPolicy,
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

            alert('설정이 저장되었습니다.');
          }}
          className="cursor-pointer bg-blue-600 text-white px-12 py-4 rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all text-lg"
        >
          설정 저장
        </button>
      </div>
    </div>
  );
};

export default StoreSettings;