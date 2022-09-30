const table_1= [
    [226000, 0.18],
    [353100, 0.26],
    [488700, 0.31],
    [641400, 0.36],
    [817600, 0.39],
    [1731600, 0.41],
    [null, 0.45]
];

const table_2 = [
    [12544, 0.01],
    [null, 0.00]
];

const table_3= [
    [226000, 0.18],
    [227000, 0.20],
    [302700, 0.22],
    [353100, 0.26],
    [488700, 0.30],
    [502900, 0.31],
    [641400, 0.36],
    [817600, 0.39],
    [1231600, 0.41],
    [null, 0.453]
];

const table_amount_1 = [
    [100, 1000],
    [200, 5000],
    [null, 10000]];

const table_threshold = [
    [65, 91250],
    [75, 141250],
    [null, 157900]
];

const table_rebate = [
    [65, 9000],
    [75, 16425],
    [null, 2997]
];

function calculate(amount, table) {

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
    //console.log(min, max, percent, bracket_idx, percentage_idx, runningTotal);
    min = max;
}
return runningTotal;
}
// let output1 = calculate(488700,table_1);
// console.log(output1);

// let output2 = calculate(1,table_2);
// console.log(output2);

// let output3 = calculate(1,table_3);
// console.log(output3);

function calcThreshold (amount, table) {
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

// let thresholdOutput1 = calcThreshold(64, table_threshold);
// console.log(thresholdOutput1);

// let thresholdOutput2 = calcThreshold(65);
// console.log(thresholdOutput2);
// let thresholdOutput3 = calcThreshold(75);
// console.log(thresholdOutput3);

// function calcRebate (inputAge) {
//     let totalRebate = 0;
//     for (const [age, value] of table_rebate) {
//         if (inputAge >= age) {
//             addRebate = value;
//             totalRebate = totalRebate + addRebate;
//         };
//     };
//     return totalRebate;
// }
// //calcRebate(75);

// let rebateOutput1 = calcRebate(25);
// console.log(rebateOutput1);
// let rebateOutput2 = calcRebate(65);
// console.log(rebateOutput2);
// let rebateOutput3 = calcRebate(75);
// console.log(rebateOutput3);

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

// let rebateOutput1 = calcRebate(75, table_rebate);
// console.log(rebateOutput1);




function smart_table_lookup(amount, table, style) {

    switch (style) {
  
      case "percent":
  
        return calculate(amount, table);
  
      case "sum":
  
        return calcRebate(amount, table);
  
      case "value":
  
        return calcThreshold(amount, table);
  
      default:
  
        throw Error("Style isn't one of percent, amount, value", style);
  
    }
  
  }
  
  
  
  console.log("Smart table lookup:");
  
  console.log("______________________");
  
  
  
  const table = [
  
    [225999, table_1],
  
    [226000, table_1],
  
    [226001, table_1],
  
  ];
  
  
  
  table.map(([amount, table]) => {
  
    console.log(
  
      `PERCENT: amount=${amount}=`,
  
      smart_table_lookup(amount, table, "percent")
  
    );
  
    console.log(
  
      `SUM: amount=${amount}=`,
  
      smart_table_lookup(amount, table, "sum")
  
    );
  
    console.log(
  
      `VALUE: amount=${amount}=`,
  
      smart_table_lookup(amount, table, "value")
  
    );
  
  });