export default function cepMask(rawNum: string): string {
  rawNum = rawNum.replace(/\D/g, '');
  rawNum = rawNum.replace(/^(\d{5})(\d)/g, '$1-$2');

  return rawNum;
}
