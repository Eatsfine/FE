import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';
import { getStore, updateStore, updateBusinessHours } from '@/api/owner/stores';


interface StoreSettingsProps {
  storeId?: string;
}


const days = ['월', '화', '수', '목', '금', '토', '일'];

const dayMapFromApi: Record<string, string> = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
};

const dayMapToApi: Record<string, any> = {
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
  일: 'SUNDAY',
};

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

useEffect(() => {
  if (!storeId) return;

  getStore(storeId).then(res => {
    const store = res.data.result;

    setStoreName(store.storeName);
    setDescription(store.description ?? '');
    setPhone(store.phone ?? '');
    setAddress(store.address ?? '');

    if (store.businessHours?.length) {
      const open = store.businessHours.find(b => !b.isClosed);
      if (open?.openTime && open?.closeTime) {
        setOpenTime(open.openTime);  
        setCloseTime(open.closeTime); 
      }


      const closed = store.businessHours
        .filter(b => b.isClosed)
        .map(b => dayMapFromApi[b.day]);

      setClosedDays(closed);
    }
   }).catch(() => {
    alert('가게 정보를 불러오는 데 실패했습니다.');
    });
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
        </div>
      </section>

      <div className="flex justify-end mb-20">
        <button 
          onClick={async () => {
  if (!isValid()) {
    alert('가게 이름, 설명, 전화번호, 이메일, 주소는 필수 입력 항목입니다.');
    return;
  }

  if (!storeId) return;

  try {
    await updateStore(storeId, {
      storeName,
      description,
      phoneNumber: phone,
    });
      } catch (e) {
    alert('기본 정보 저장에 실패했습니다.');
    return;
  }

  try {


    const businessHours = days.map(day => ({
  day: dayMapToApi[day],
  isClosed: closedDays.includes(day),
  openTime: closedDays.includes(day) ? null : openTime,
  closeTime: closedDays.includes(day) ? null : closeTime,
}));


    await updateBusinessHours(storeId, businessHours);


  } catch (e) {
    alert('영업시간 저장에 실패했습니다. 기본 정보는 저장되었습니다.');
    return;
  }
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