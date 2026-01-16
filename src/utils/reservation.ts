import type { TablePref } from "@/types/restaurant";

export function toYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function tablePrefLabel(v: TablePref) {
  return v === "split_ok" ? "테이블 떨어져도 ok" : "한 테이블만";
}
