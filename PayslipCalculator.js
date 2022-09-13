//input
let earnings = 0;
let age = 0;
let currentPeriod = 1;
let taxPeriods = 12;

let annualise = 0

//SARS Thresholds
let under65 = 91250;
let over65 = 141250;
let over75 = 157900;
let ageValue = 0

let min = 0;
let max = 0;
let perc = 0;
let base = 0
let PAYE = 0;

let UIF = 0;
let UIFPerc = 0.01;
let UIFCeiling = 177.12;


let nett = 0

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

//Annualise earning and retrieve SARS tax bracket
function Annualisation() {
    
    annualise = (earnings * taxPeriods / currentPeriod)
    console.log("annualise: " + earnings * taxPeriods / currentPeriod);

    for (option of SARSBrackets) {
        //console.log(option);
        if (annualise > option.Min && annualise < option.Max)  {
            min = option.Min;
            max = option.Max;
            perc = option.Perc
            console.log(option);
        }
    }
    console.log(min);
    console.log(max);

    //return Annualise;

};


function Base() {

    R0 = 0;
    R1 = R0 + (SARSBrackets[0].Max - SARSBrackets[0].Min) * SARSBrackets[0].Perc;
    R2 = R1 + (SARSBrackets[1].Max - SARSBrackets[1].Min) * SARSBrackets[1].Perc;
    R3 = R2 + (SARSBrackets[2].Max - SARSBrackets[2].Min) * SARSBrackets[2].Perc;
    R4 = R3 + (SARSBrackets[3].Max - SARSBrackets[3].Min) * SARSBrackets[3].Perc;
    R5 = R4 + (SARSBrackets[4].Max - SARSBrackets[4].Min) * SARSBrackets[4].Perc;
    R6 = R5 + (SARSBrackets[5].Max - SARSBrackets[5].Min) * SARSBrackets[5].Perc;

    // console.log('Base: ' + R0)
    // console.log('Base: ' + R1)
    // console.log('Base: ' + R2)
    // console.log('Base: ' + R3)
    // console.log('Base: ' + R4)
    // console.log('Base: ' + R5)
    // console.log('Base: ' + R6)
    
    // console.log("annualise base: " + annualise)

    //started with the lower level as more emps will be calcing in lower bracket, so will move out the if faster?
        if (annualise > SARSBrackets[0].Min && annualise < SARSBrackets[0].Max) {
          base = R0;
          //console.log("base final 1: " + base)
          } else if (annualise > SARSBrackets[1].Min && annualise < SARSBrackets[1].Max) {
            base = R1;
            //console.log("base final 2: " + base)
          } else if (annualise > SARSBrackets[2].Min && annualise < SARSBrackets[2].Max) {    
            base = R2;
            //console.log("base final 3: " + base)
          } else if (annualise > SARSBrackets[3].Min && annualise < SARSBrackets[3].Max) {  
            base = R3;
            //console.log("base final 4: " + base)
          } else if (annualise > SARSBrackets[4].Min && annualise < SARSBrackets[4].Max) {
            base = R4;
            //console.log("base final 5: " + base)
          } else if (annualise > SARSBrackets[5].Min && annualise < SARSBrackets[5].Max) {
            base = R5;
            //console.log("base final 6: " + base)
          } else if (annualise > SARSBrackets[6].Min && annualise < SARSBrackets[6].Max) {
            base = R6;
            //console.log("base final 7: " + base)
          } else {"whyyyyyyyy"}

      console.log("base finale: " + base)
}


function RebateAndThreshold() {

var Perc = (SARSBrackets[0].Perc)
var Primary = (under65 * Perc)
var Secondary = (over65 - under65)
var Tertiary = (over75 - over65)

if (age >= 75) {
    ageValue = over75,
    ThresholdValue = (Primary + (Secondary * Perc) + (Tertiary * Perc));
    //console.log(over75);
} else if (age >= 65) {
    ageValue = over65,
    ThresholdValue = (Primary + (Secondary * Perc));
    //console.log(over65);
} else 
    ageValue = under65,
    ThresholdValue = Primary;
    //console.log(under65);

    console.log("age: " + age)
    console.log("ageValue: " + ageValue)
    console.log("ThresholdValue: " + ThresholdValue)

};


//Tax Calc from SARS rates
function TaxCalc() {
    console.log(annualise);
    console.log("ageValue: " + ageValue);
    
    PAYE = (annualise - min);
    PAYE = PAYE * perc;
    PAYE = PAYE + base;
    PAYE = PAYE - ThresholdValue;
    PAYE = PAYE * currentPeriod / taxPeriods;

    if (PAYE < 0) {
        PAYE = 0
    }

    console.log("PAYE: " + PAYE);

};

function UIFCalc() {

    UIF = earnings * UIFPerc;
    
    if (UIF > UIFCeiling) {
        UIF = UIFCeiling
    }

    console.log("UIF: " + UIF);

};

function Nett() {
    
    nett = earnings - (PAYE + UIF)
    console.log("nett: " + nett);

};

function calculate() {
 earnings = document.getElementById("GrossEarnings").value
 age = document.getElementById("Age").value

    
Annualisation();
Base();
RebateAndThreshold();
TaxCalc();
UIFCalc();
Nett();
console.log("here")
document.getElementById("paye-result").innerHTML = PAYE
document.getElementById("nettpay_result").innerText = nett

}
//Calculate();