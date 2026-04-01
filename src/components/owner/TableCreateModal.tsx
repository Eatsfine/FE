import React, { useState } from "react";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  onConfirm: (cols: number, rows: number) => void;
}

const TableCreateModal: React.FC<Props> = ({ onClose, onConfirm }) => {
  const [cols, setCols] = useState(4);
  const [rows, setRows] = useState(3);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[400px] rounded-3xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="table-create-modal-title"
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400"
          aria-label="모달 닫기"
        >
          <X />
        </button>
        <h3 id="table-create-modal-title" className="text-xl font-bold mb-6">
          테이블 생성하기
        </h3>

        <div className="space-y-4 mb-6">
          <div>
            <label
              htmlFor="table-cols"
              className="block text-sm font-medium mb-1"
            >
              가로 줄 수 (Columns)
            </label>
            <input
              id="table-cols"
              type="number"
              min={1}
              max={10}
              value={cols}
              onChange={(e) => {
                const next = Number.parseInt(e.target.value, 10);
                setCols(Number.isFinite(next) ? next : 1);
              }}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="table-rows"
              className="block text-sm font-medium mb-1"
            >
              세로 줄 수 (Rows)
            </label>
            <input
              id="table-rows"
              type="number"
              min={1}
              max={10}
              value={rows}
              onChange={(e) => {
                const next = Number.parseInt(e.target.value, 10);
                setRows(Number.isFinite(next) ? next : 1);
              }}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border rounded-xl font-bold text-gray-500 cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={() => {
              const safeCols = Number.isFinite(cols) ? cols : 1;
              const safeRows = Number.isFinite(rows) ? rows : 1;
              const colClamped = Math.min(
                Math.max(Math.trunc(safeCols), 1),
                10,
              );
              const rowClamped = Math.min(
                Math.max(Math.trunc(safeRows), 1),
                10,
              );
              onConfirm(colClamped, rowClamped);
            }}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold cursor-pointer"
          >
            생성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableCreateModal;
