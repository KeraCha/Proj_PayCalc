function calcPercentageUsingAmount(amount, table) {
  let min = 0;
  let runningTotal = 0;

  for (const [max, percent] of table) {
    let multipliedValue = 0;
    let difference = 0;
    if (amount >= min) {
      if (max === null) {
        difference = amount - min;
      } else if (amount > max) {
        difference = max - min;
      } else {
        difference = amount - min;
      }
      multipliedValue = difference * percent;
    }
    runningTotal = runningTotal + multipliedValue;
    min = max;
  }
  return runningTotal;
}

function calcValueUsingAmount(amount, table) {
  let min = 0;
  let thresholdValue = 0;
  for (const [max, value] of table) {
    if (amount >= min) {
      if (max === null) {
        thresholdValue = value;
      } else if (amount > max) {
        thresholdValue = value;
      } else {
        thresholdValue = value;
      }
    }
    min = max;
  }
  return thresholdValue;
}

//create a new function to compile the duplicated code and pass that into each that is same
function calcSumUsingAmount(amount, table) {
  let min = 0;
  let runningTotal = 0;
  let rebateSum;
  for (const [max, value] of table) {
    if (amount >= min) {
      if (max === null) {
        rebateSum = value;
      } else rebateSum = value;
    runningTotal += rebateSum;
    }
    min = max;
  }
  return runningTotal;
}

export function smart_table_lookup(amount, table, style) {
  switch (style) {
    case 'percent':
      return calcPercentageUsingAmount(amount, table);
    case 'value':
      return calcValueUsingAmount(amount, table);
    case 'sum':
      return calcSumUsingAmount(amount, table);
    default:
      throw Error("Style isn't one of percent, amount, value", style);
  }
}

