import * as cmd from './commands.js'

const datastore = {};
const brackets = {};

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

const sarsPAYE2023TaxTable = [
    [226000, 0.18],
    [353100, 0.26],
    [488700, 0.31],
    [641400, 0.36],
    [817600, 0.39],
    [1731600, 0.41],
    [null, 0.45]
];



function getNett() {
    nett = datastore[this.gross_Earnings] - (PAYE + UIF);
}

let myGrossEarnings = new cmd.GetUserInput('GrossEarnings'); //ID from the HTML
let myAge = new cmd.GetUserInput('Age'); //ID from the HTML
let myPeriods = new cmd.GetUserInput('Periods'); //ID from the HTML
let myAnnualGross = new cmd.Annualize('AnnualGross', 'GrossEarnings', 'Periods');
let percentageLookupResult = new cmd.LookupInPercentageTable('sumValue', sarsPAYE2023TaxTable, 'AnnualGross');
// let myTaxAmount = new cmd.GetTaxAmount('AnnualGross','sarsBracket','BaseValue','ThresholdValue','TaxAmount');
// let myContribValue = new cmd.CalcContribution('GrossEarnings','ContribAmount','CeilingCheck');

//CHANGES: CHANGE CALCULATE FUNCTION TO MAP TABLE?
export function calculate() {
    
myGrossEarnings.execute(datastore);
myAge.execute(datastore);
myPeriods.execute(datastore);
myAnnualGross.execute(datastore);
percentageLookupResult.execute(datastore);
// myTaxAmount.execute(datastore);
// myTaxAmount.execute(datastore);
// myTaxAmount.execute(datastore);
// myTaxAmount.execute(datastore);

document.getElementById("paye-result").value = datastore.TaxAmount;
//document.getElementById("uif-result").value = UIF;
document.getElementById("nettpay_result").value = nett;

console.log(datastore);
}
