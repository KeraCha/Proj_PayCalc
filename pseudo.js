
function operator(choice) {
  let useOperator;
  let firstValue = 10000;
  let secondValue = 2000;
  switch (choice) {
    case 'ADD':
      useOperator = '+';
    //return datastore[this.pre_Deannualise] = datastore[this.percent_Total] + datastore[this.sum_Rebate];
    case 'SUBTRACT':
      useOperator = '-';
    //return datastore[this.pre_Deannualise] = datastore[this.percent_Total] - datastore[this.sum_Rebate];
    // default:
    //     throw Error("Not a valid sum inclusion", this.operator);   
  }
  total = firstValue, useOperator, secondValue;
  console.log(firstValue, useOperator, secondValue, total);
}
operator('ADD');