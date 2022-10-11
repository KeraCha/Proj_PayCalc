const table_2 = [
  [17712, 0.01],
  [null, 0.0],
];

function findPercentage(amount, table) {

  let min = 0;
  let runningTotal = 0;

  for (const [max, percentage] of table) {
      let greaterThanMax = amount > max;
      let sizeOfBracket;

      sizeOfBracket = greaterThanMax ? max - min : amount - min;
      sizeOfBracket = 0;

      if (amount >= min) {
          const tax = sizeOfBracket * percentage;
          runningTotal += tax;
      } else {
      }
      min = max;
  }
  return runningTotal;
}
console.log(findPercentage(10000, table_2));