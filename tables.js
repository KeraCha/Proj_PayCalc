//Calculate tax amount
function calculatePercentage(amount, table) {
  let min = 0;
  let total = 0;
  
  for (const [max, value] of table) {

    //assign diff
    let diff;
    if (amount >= min) {
      if (max !== null && amount > max) {
        diff = max - min;
      } else {
        diff = amount - min;
      }
    } else {
      diff = 0;
    }

    const percAmount = diff * value;
    total = percAmount + total;
    min = max;
  }

  return total;
}

//calculate rebate
function calculateSum(amount, table) {
  let min = 0;
  let total = 0;
  let result;

  for (const [max, value] of table) {
    if (amount >= min) {
      result = value;
    } else {
      result = 0;
    }
    if (result <= 0) {
      break;
    }
    total = result + total;
    min = max;
  }
  return total;
}

//calculate threshold
function calculateValue(amount, table) {
  let min = 0;
  let result;

  for (const [max, value] of table) {
    if (max != null) {
      if (amount >= min && amount < max) {
        result = value;
      }
    } else {
      if (amount >= min) {
        result = value;
      }
    }
    min = max;
  }
  return result;
}

export function commaSeperator(amount) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function smart_table_lookup(amount, table, style) {
  switch (style) {
    case "percent":
      return calculatePercentage(amount, table);
    case "sum":
      return calculateSum(amount, table);
    case "value":
      return calculateValue(amount, table);
    default:
      throw Error("Style isn't one of percent, amount, value", style);
  }
}

export function add() {
  let sum = 0;
  for (const item of arguments[0]) {
    sum += parseFloat(item);
  }
  return sum;
}

