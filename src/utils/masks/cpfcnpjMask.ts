export default function cpfcnpjMask(rawNum: string): string {
  rawNum = rawNum.replace(/\D/g, '');
  if (rawNum.length > 11) {
    rawNum = rawNum.replace(/(\d{2})(\d)/, '$1.$2');
    rawNum = rawNum.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    rawNum = rawNum.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
    rawNum = rawNum.replace(
      /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/,
      '$1.$2.$3/$4-$5'
    );
  } else {
    rawNum = rawNum.replace(/^(\d{3})(\d)/g, '$1.$2');
    rawNum = rawNum.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    rawNum = rawNum.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    rawNum = rawNum.replace(
      /^(\d{3})\.(\d{3})\.(\d{3})\/(\d{2})(\d)/,
      '$1.$2.$3-$4'
    );
  }

  return rawNum;
}
