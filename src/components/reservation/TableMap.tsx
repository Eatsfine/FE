import { cn } from "@/lib/utils";
import type { SeatLayout, SeatTable } from "@/types/restaurant";

type Props = {
  layout: SeatLayout;
  visibleTables: SeatTable[];
  availableIds: Set<string>;
  selectedTableId: string | null;
  onSelectTable: (tableId: string) => void;
};

export default function TableMap({
  layout,
  visibleTables,
  availableIds,
  selectedTableId,
  onSelectTable,
}: Props) {
  return (
    <div className="border rounded-xl bg-gray-50 p-3">
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 border rounded bg-white" /> 선택 가능
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 border rounded bg-gray-200" /> 예약 불가
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 border border-blue-400 rounded bg-blue-100" />{" "}
          선택됨
        </span>
      </div>
      <div
        className="w-full"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout.gridCols}, minmax(0,1fr))`,
          gridTemplateRows: `repeat(${layout.gridRows}, 56px)`,
          gap: 8,
        }}
      >
        {visibleTables.map((t) => {
          const isAvailable = availableIds.has(t.id);
          const isSelected = selectedTableId === t.id;

          return (
            <button
              key={t.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => onSelectTable(t.id)}
              className={cn(
                "border rounded-lg text-left px-2 py-2 transition-colors",
                isAvailable
                  ? "bg-white hover:bg-gray-100 cursor-pointer"
                  : "bg-gray-200 text-muted-foreground cursor-not-allowed",
                isSelected && "bg-blue-100 border-blue-400 border-2"
              )}
              style={{
                gridColumnStart: t.gridX + 1,
                gridRowStart: t.gridY + 1,
              }}
            >
              <div className="text-sm">{t.tableNo}번</div>
              <div className="text-[11px] text-muted-foreground">
                {t.minPeople}~{t.maxPeople}명
              </div>
            </button>
          );
        })}
      </div>
      {visibleTables.length === 0 && (
        <p className="mt-3 text-sm text-muted-foreground text-center">
          조건에 맞는 테이블이 없습니다. (좌석유형 또는 인원수 변경을
          추천드립니다)
        </p>
      )}
    </div>
  );
}
