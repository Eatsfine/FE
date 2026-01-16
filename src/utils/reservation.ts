import type { TablePref } from "@/types/restaurant";

export function tablePrefLabel(v: TablePref) {
  return v === "split_ok" ? "테이블 떨어져도 ok" : "한 테이블만";
}
