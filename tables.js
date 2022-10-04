
function calculatePercentageUsingValue(amount, table) {

  let min = 0;
  let runningTotal = 0;

  for (const [max, percent] of table) {
    let percentage_idx = 0;
    let bracket_idx = 0;
    if (amount >= min) {
      if (max === null) {
        bracket_idx = (amount - min);
      } else
        if (amount > max) {
          bracket_idx = max - min;
        } else {
          bracket_idx = amount - min;
        }
      percentage_idx = bracket_idx * percent;
    }
    runningTotal = runningTotal + percentage_idx;
    min = max;
  }
  return runningTotal;
}

function calcThreshold(amount, table) {
  let min = 0;
  for (const [max, value] of table) {
    if (amount >= min) {
      if (max === null) {
        thresholdVal = value;
      } else
        if (amount > max) {
          thresholdVal = value;
        } else {
          thresholdVal = value;
        }
    }
    runningTotal = thresholdVal;
    min = max;
  }
  return runningTotal;
}

function calcRebate(amount, table) {
  let min = 0;
  let runningTotal = 0;
  for (const [max, value] of table) {
    if (amount >= min) {
      if (max === null) {
        rebateVal = value;
      } else
        if (amount > max) {
          rebateVal = value;
        } else {
          rebateVal = value;
        };
      runningTotal = runningTotal + rebateVal;
    };
    min = max;
  };
  return runningTotal;
}

export function smart_table_lookup(amount, table, style) {

  switch (style) {
    case "percent":
      return calculatePercentageUsingValue(amount, table);
    case "sum":
      return calcRebate(amount, table);
    case "value":
      return calcThreshold(amount, table);
    default:
      throw Error("Style isn't one of percent, amount, value", style);
  }
}
