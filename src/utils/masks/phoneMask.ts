export default function phoneMask(rawNum: string): string {
  rawNum = rawNum.replace(/\D/g, '');
  if (rawNum.length > 10) {
    rawNum = rawNum.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1)$2$3-$4');
  } else {
    rawNum = rawNum.replace(/(\d{2})(\d)/, '($1)$2');
    rawNum = rawNum.replace(/(\d{4})(\d{1,2})/, '$1-$2');
  }

  return rawNum;
}
