export function phoneNumber(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);;

  // 서울 지역번호
  if (numbers.startsWith("02")) {
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{2})(\d+)/, "$1-$2");
    if (numbers.length <= 9) return numbers.replace(/(\d{2})(\d{3})(\d+)/, "$1-$2-$3");
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  // 기타 지역 / 휴대폰
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) return numbers.replace(/(\d{3})(\d+)/, "$1-$2");
  if (numbers.length <= 10) return numbers.replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3");
  return numbers.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}
