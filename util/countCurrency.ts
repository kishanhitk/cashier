export type Currency = {
  note: number;
  count: number;
};

export function countCurrency(amount: number): Currency[] {
  var notes = [2000, 500, 100, 20, 10, 5, 2, 1];
  var result: Currency[] = [];
  for (var i = 0; i < notes.length; i++) {
    var count = Math.floor(amount / notes[i]);
    if (count > 0) {
      result.push({ note: notes[i], count: count });
      amount -= count * notes[i];
    }
  }
  return result;
}
