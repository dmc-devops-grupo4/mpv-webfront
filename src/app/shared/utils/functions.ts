
export function roundTo(n: number, digits = 0) {
  var negative = false;

  if (n < 0) {
      negative = true;
      n = n * -1;
  }
  const multiplicator = Math.pow(10, digits);
  n = Number(parseFloat((n * multiplicator).toFixed(11)));
  n = Number((Math.round(n) / multiplicator).toFixed(digits));
  if (negative) {
      n = Number((n * -1).toFixed(digits));
  }
  return n;
}
