let Earnings = 10000;
let Age = 75;
let CurrentPeriod = 1;
let TaxPeriods = 12;

//SARS Thresholds
let Under65 = 91250;
let Over65 = 141250;
let Over75 = 157900;

//SARSBrackets
let SARSBrackets = [
    {
        "Max":226000,
        "Perc":0.18
    },
    {
        "Max":353100,
        "Perc":0.26
    },
    {
        "Max":488700,
        "Perc":0.31
    },
    {
        "Max":641400,
        "Perc":0.36
    },
    {
        "Max":817600,
        "Perc":0.39
    },
    {
        "Max":1731600,
        "Perc":0.41
    },
    {
        "Max":226000,
        "Perc":0.18
    },
];

console.log(SARSBrackets)

function Annualise() {
    console.log("Annualise: " + Earnings * TaxPeriods / CurrentPeriod);
};

Annualise();

function RebateAndThreshold() {

var Primary = (Under65 * 0.18)
var Secondary = (Over65 - Under65)
var Tertiary = (Over75 - Over65)

if (Age >= 75) {
    var AgeValue = Over75,
    ThresholdValue = (Primary + (Secondary * 0.18) + (Tertiary * 0.18));
    //console.log(test);
} else if (Age >= 65) {
    AgeValue = Over65,
    ThresholdValue = (Primary + (Secondary * 0.18));
    //console.log(Over65);
} else 
    AgeValue = Under65,
    ThresholdValue = Primary;
    //console.log(Under65);

    console.log("Age: " + Age)
    console.log("AgeValue: " + AgeValue)
    console.log("ThresholdValue: " + ThresholdValue)

};

RebateAndThreshold();

//  function TaxRebate() {

//     if (Age >= 75) {
//         AgeValue = Over75;
//         //console.log(test);
//     } else if (Age >= 65) {
//         AgeValue = Over65;
//         //console.log(Over65);
//     } else 
//         AgeValue = Under65;
//         //console.log(Under65);

//         console.log(AgeValue);
//         console.log(Threshold1)
        
//       };
    
// TaxRebate();