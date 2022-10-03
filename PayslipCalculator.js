import * as cmd from './commands.js';
//input
//let earnings = 20000;
//let age = 25;
//let gross_Earnings = 0;
//let current_Period = 1;
//CHANGES: CHANGE FROM A GLOBAL VARIABLE INTO A SWITCH IN GetUserInput (ADD SWITCH TO GET VALUE FROM UI INPUT?) //new class
//CHANGES: incorporate a switch that when monthly/biweekly/weekly are selected from UI that sets the value to 12/24/52. 

const datastore = {};

//CHANGES: CHANGE THRESHOLD TO ARRAY TABLE
//SARS Thresholds
let under65 = 91250;
let over65 = 141250;
let over75 = 157900;
//CHANGES: ADD REBATE TABLE

let ageValue = 0;

let min = 0;
let max = 0;
let perc = 0;
let base = 0;;
let PAYE = 0;

//CHANGES: NAMING CONVENTIONS TO EXCL UIF WORDING
let UIFPerc = 0.01;
let UIFCeiling = 177.12;

let nett = 0;

//CHANGE TO THE NEW FUNCTIONALITY FROM TABLESLEARNING TO USE ONLY MAX AND PERC
//CHANGE TABLE TO CONST AND CHANGE TO BE AN ARRAY WITHIN ARRAY INSTEAD OF THE OBJECT IN THE ARRAY
//SARSBrackets
let SARSBrackets = [
    {
        Min:0,
        Max:226000,
        Perc:0.18
    },
    {
        Min:226000,
        Max:353100,
        Perc:0.26
    },
    {
        Min:353100,
        Max:488700,
        Perc:0.31
    },
    {
        Min:488700,
        Max:641400,
        Perc:0.36
    },
    {
        Min:641400,
        Max:817600,
        Perc:0.39
    },
    {
        Min:817600,
        Max:1731600,
        Perc:0.41
    },
    {
        Min:1731600,
        Max:999999999,
        Perc:0.45
    },
];
//console.log(SARSBrackets[1])



//CHANGES MAKE GETNETT A CLASS
function Nett() {
    nett = datastore[this.gross_Earnings] - (PAYE + UIF);
}

let myGrossEarnings = new cmd.GetUserInput('GrossEarnings'); //ID from the HTML
let myAge = new cmd.GetUserInput('Age'); //ID from the HTML
let myPeriods = new cmd.GetUserInput('Periods'); //ID from the HTML
let myAnnualGross = new cmd.Annualize('AnnualGross', 'GrossEarnings', 'Periods');
//CHANGES NEED A COMMAND THAT PUSHES THE BRACKETS INTO THE CASE, NO DEPENDENCIES
//USE OBJECTS TO BRING BRACKETS INTO THE COMMAND
//PUT CALLS INTO AN ARRAY 
let myTaxAmount = new cmd.GetTaxAmount('AnnualGross','sarsBracket','BaseValue','ThresholdValue','TaxAmount');
let myContribValue = new cmd.CalcContribution('GrossEarnings','ContribAmount','CeilingCheck');

//CHANGES: CHANGE CALCULATE FUNCTION TO MAP TABLE
export function calculate() {
    
myGrossEarnings.execute(datastore);
myAge.execute(datastore);
myPeriods.execute(datastore);
myAnnualGross.execute(datastore);
myTaxAmount.execute(datastore);
myTaxAmount.execute(datastore);
myTaxAmount.execute(datastore);
myTaxAmount.execute(datastore);

//console.log("TRYING: " + myTaxAmount[tax_Amount]);
document.getElementById("paye-result").value = datastore.TaxAmount;
//document.getElementById("uif-result").value = UIF;
document.getElementById("nettpay_result").value = nett;


console.log(datastore);
}
