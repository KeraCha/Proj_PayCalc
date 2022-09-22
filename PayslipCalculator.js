//input
//let earnings = 20000;
//let age = 25;
//let gross_Earnings = 0;
//let current_Period = 1;
let tax_Periods = 12;
const datastore = {"tax_Periods":12};

//SARS Thresholds
let under65 = 91250;
let over65 = 141250;
let over75 = 157900;

let ageValue = 0;

let min = 0;
let max = 0;
let perc = 0;
let base = 0;;
let PAYE = 0;

let UIFPerc = 0.01;
let UIFCeiling = 177.12;

let nett = 0;

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

class GetUserInput {
    constructor(name) {
      this.name = name;
    }
    execute(datastore) {
        datastore[this.name] = parseInt(document.getElementById(this.name).value);
        return datastore;
    }
  };
 
//Create class to replace Annualize function inputting the variables from the getUserInput class 
//sample usage: annual_Gross, gross_Earnings, tax_Periods - this could differ with different inputs. specific. Can generalise the namings more. 
//AnnualisedAmt, grossamt, Periods
  class Annualize {
    constructor(annual_Gross, gross_Earnings, tax_Periods) {
        this.annual_Gross = annual_Gross;
        this.gross_Earnings = gross_Earnings;
        this.tax_Periods = tax_Periods;
    }
    calcAnnualGross(datastore) {
        //adding them into the datastore object
        datastore[this.annual_Gross] = datastore[this.gross_Earnings] * datastore[this.tax_Periods];
        return datastore;
    }
  };
  
class GetTaxAmount {
    constructor (annual_Gross, sars_Bracket, base_Value, threshold_Value, tax_Amount) {
        this.annual_Gross = annual_Gross;
        this.sars_Bracket = sars_Bracket;
        this.base_Value = base_Value;
        this.threshold_Value = threshold_Value;
        this.tax_Amount = tax_Amount;
    }
    calcSARSBrackets(datastore) {
        for (var option of SARSBrackets) {
            if (datastore[this.annual_Gross] > option.Min && datastore[this.annual_Gross] < option.Max)  {
                min = option.Min;
                max = option.Max;
                perc = option.Perc;
            //console.log(option);
            datastore[this.sars_Bracket] = option;
            }
        }
        return datastore;
    }
    calcBaseAmount(datastore) {
        var R0 = 0;
        var R1 = R0 + (SARSBrackets[0].Max - SARSBrackets[0].Min) * SARSBrackets[0].Perc;
        var R2 = R1 + (SARSBrackets[1].Max - SARSBrackets[1].Min) * SARSBrackets[1].Perc;
        var R3 = R2 + (SARSBrackets[2].Max - SARSBrackets[2].Min) * SARSBrackets[2].Perc;
        var R4 = R3 + (SARSBrackets[3].Max - SARSBrackets[3].Min) * SARSBrackets[3].Perc;
        var R5 = R4 + (SARSBrackets[4].Max - SARSBrackets[4].Min) * SARSBrackets[4].Perc;
        var R6 = R5 + (SARSBrackets[5].Max - SARSBrackets[5].Min) * SARSBrackets[5].Perc;

    //started with the lower level as more emps will be calcing in lower bracket, so will move out the if faster?
        if (datastore[this.annual_Gross] > SARSBrackets[0].Min && datastore[this.annual_Gross] < SARSBrackets[0].Max) {
            datastore[this.base_Value] = R0;
          } else if (datastore[this.annual_Gross] > SARSBrackets[1].Min && datastore[this.annual_Gross] < SARSBrackets[1].Max) {
            datastore[this.base_Value] = R1;
          } else if (datastore[this.annual_Gross] > SARSBrackets[2].Min && datastore[this.annual_Gross] < SARSBrackets[2].Max) {    
            datastore[this.base_Value] = R2;
          } else if (datastore[this.annual_Gross] > SARSBrackets[3].Min && datastore[this.annual_Gross] < SARSBrackets[3].Max) {  
            datastore[this.base_Value] = R3;
          } else if (datastore[this.annual_Gross] > SARSBrackets[4].Min && datastore[this.annual_Gross] < SARSBrackets[4].Max) {
            datastore[this.base_Value] = R4;
          } else if (datastore[this.annual_Gross] > SARSBrackets[5].Min && datastore[this.annual_Gross] < SARSBrackets[5].Max) {
            datastore[this.base_Value] = R5;
          } else if (datastore[this.annual_Gross] > SARSBrackets[6].Min && datastore[this.annual_Gross] < SARSBrackets[6].Max) {
            datastore[this.base_Value] = R6;
          } else {"whyyyyyyyy"};
        return datastore;
    }
    calcThresholdAmount(datastore) {
        var Perc = (SARSBrackets[0].Perc);
        var Primary = (under65 * Perc);
        var Secondary = (over65 - under65);
        var Tertiary = (over75 - over65);

        if (datastore.Age >= 75) {
            ageValue = over75,
            datastore[this.threshold_Value] = (Primary + (Secondary * Perc) + (Tertiary * Perc));
        } else if (datastore.Age >= 65) {
            ageValue = over65,
            datastore[this.threshold_Value] = (Primary + (Secondary * Perc));
        } else 
            ageValue = under65,
            datastore[this.threshold_Value] = Primary;
        return datastore;
    }
    calcTaxAmount(datastore) {
        let TAX
        TAX = (datastore[this.annual_Gross] - min);
        TAX = TAX * perc;
        TAX = TAX + datastore[this.base_Value];
        TAX = TAX - datastore[this.threshold_Value];
        TAX = TAX * tax_Periods;
    
        if (TAX < 0) {
            TAX = 0;
        };
        datastore[this.tax_Amount] = TAX;
        return datastore;
    }
}

class CalcContribution {
    constructor (gross_Earnings, contrib_Amount, ceiling_Check) {
        this.gross_Earnings = gross_Earnings;
        this.contrib_Amount = contrib_Amount;
        this.ceiling_Check = ceiling_Check;
    }
    calcValue(datastore) {
        this.contrib_Amount = datastore[this.gross_Earnings] * UIFPerc;
        return datastore;
    }
    ceilingCheck(datastore) {
        if (this.contrib_Amount > UIFCeiling) {
            this.contrib_Amount = UIFCeiling;
        };
        return datastore;
    }
}

function Nett() {
    nett = datastore[this.gross_Earnings] - (PAYE + UIF);
}

let myGrossEarnings = new GetUserInput('GrossEarnings'); //ID from the HTML
let myAge = new GetUserInput('Age'); //ID from the HTML
let myAnnualGross = new Annualize('AnnualGross', 'GrossEarnings', 'tax_Periods');
let myTaxAmount = new GetTaxAmount('AnnualGross','sarsBracket','BaseValue','ThresholdValue','TaxAmount');
let myContribValue = new CalcContribution('GrossEarnings','ContribAmount','CeilingCheck');

function calculate() {
    
myGrossEarnings.execute(datastore);
myAge.execute(datastore);
myAnnualGross.calcAnnualGross(datastore);
myTaxAmount.calcSARSBrackets(datastore);
myTaxAmount.calcBaseAmount(datastore);
myTaxAmount.calcThresholdAmount(datastore);
myTaxAmount.calcTaxAmount(datastore);

//console.log("TRYING: " + myTaxAmount[tax_Amount]);
document.getElementById("paye-result").value = datastore.TaxAmount;
//document.getElementById("uif-result").value = UIF;
document.getElementById("nettpay_result").value = nett;

console.log(datastore);
}
