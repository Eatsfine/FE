import type { TablePref } from "@/types/restaurant";

export function tablePrefLabel(v: TablePref) {
  return v === "split_ok"
    ? "테이블 떨어져도 상관없어요"
    : "한 테이블에서만 먹을거에요";
}
