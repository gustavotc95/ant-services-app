export default function onlyTexUpperCasetMask(rawNum: string): string {
  rawNum = rawNum.replace(/[^A-Za-z]/g, '');
  rawNum = rawNum.toUpperCase();

  return rawNum;
}
