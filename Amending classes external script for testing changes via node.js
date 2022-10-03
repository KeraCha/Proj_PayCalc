
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

class GetUserInput {
    constructor(name) {
      this.name = name;
    }
    execute(datastore) {
        datastore[this.name] = parseFloat(getElementById(this.name).value);
        return datastore;
    }
  };
 
//Create class to replace Annualize function inputting the variables from the getUserInput class 
//sample usage: annual_Gross, gross_Earnings, tax_Periods - this could differ with different inputs. specific. Can generalise the namings more. 
//AnnualisedAmt, grossamt, Periods
  class Annualize {
    //CHANGES: ABSTRACT NAMING CONVENTIONS: resultOut, resultIn, Periods 
    constructor(annual_Gross, gross_Earnings, tax_Periods) {
        this.annual_Gross = annual_Gross;
        this.gross_Earnings = gross_Earnings;
        this.tax_Periods = tax_Periods;
    }
    //calcAnnualGross
    execute(datastore) {
        //adding them into the datastore object
        datastore[this.annual_Gross] = datastore[this.gross_Earnings] * datastore[this.tax_Periods];
        return datastore;
    }
  };

  //CHANGES: ADD A class TO RETRIEVE MIN, MAX, PERC, TO BE USED BY OTHER classES LIKE THE UIF BECAUSE THE FUNCTION REMAINS THE SAME
  /////CHANGES: classES CALCPERCENTAGE, CALCVALUE, CALCSUMMATION
  //CHANGES: Separate these commands in GetTaxAmount into different classes
class GetTaxAmount {
    //CHANGES: NAMING CONVENTIONS ABSTRACTION
    constructor (annual_Gross, sars_Bracket, base_Value, threshold_Value, tax_Amount) {
        this.annual_Gross = annual_Gross;
        this.sars_Bracket = sars_Bracket;
        this.base_Value = base_Value;
        this.threshold_Value = threshold_Value;
        this.tax_Amount = tax_Amount;
    }
    //CHANGE TO USE NEW FUNCTIONS CREATED IN TABLESLEARNING
    //CHANGES: CHANGE NAMING TO GETMINS = class OF ITS OWN WHICH CAN BE USED IN OTHERS LIKE THRESHOLD AND REBATE
    //calcSARSBrackets
    execute(datastore) {
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
    //CHANGES: NO LONGER NEEDED AS BASE ALREADY INCPORPORATED WITH THE RUNNNG TOTALS USING MAX AND PERC
    //calcBaseAmount
    execute(datastore) {
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
//CHANGES: SEPARATE REBATE AND THRESHOLD CALCS. TRY GENERATE THE REABTE VIA CALC INSTEAD OF TABLE USING THREHSOLDS TABLE
//calcThresholdAmount    
execute(datastore) {
        var Perc = (SARSBrackets[0].Perc);
        var Primary = (under65 * Perc);
        var Secondary = (over65 - under65);
        var Tertiary = (over75 - over65);
//CHANGES: IS IT CORRECT TO BE USING DATASTORE.AGE TO UTILISE THE VALUE FROM THE INPUT IN THE GETUSERINPUT class
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
    //CHANGES: NEW class
    //calcTaxAmount
    execute(datastore) {
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

//ADD DEANNUALISE class.
//CHANGES: CHANGE THE METHOD NAMES TO "EXECUTE"
//CHANGES: ADD TABLE ARRAY FOR THE UIF VALUES LIKE WE DID IN TABLE LEARNING, CHANGE TO THAT FUNCTION. THEREFORE NO LONGER REQUIRE TWO classES.
class CalcContribution {
    constructor (gross_Earnings, contrib_Amount, ceiling_Check) {
        this.gross_Earnings = gross_Earnings;
        this.contrib_Amount = contrib_Amount;
        this.ceiling_Check = ceiling_Check;
    }
    //calcValue
    execute(datastore) {
        this.contrib_Amount = datastore[this.gross_Earnings] * UIFPerc;
        return datastore;
    }
    //ceilingCheck
    execute(datastore) {
        if (this.contrib_Amount > UIFCeiling) {
            this.contrib_Amount = UIFCeiling;
        };
        return datastore;
    }
}

//CHANGES MAKE GETNETT A CLASS
function Nett() {
    nett = datastore[this.gross_Earnings] - (PAYE + UIF);
}

let myGrossEarnings = new GetUserInput('GrossEarnings'); //ID from the HTML
let myAge = new GetUserInput('Age'); //ID from the HTML
let myPeriods = new GetUserInput('Periods'); //ID from the HTML
let myAnnualGross = new Annualize('AnnualGross', 'GrossEarnings', 'Periods');
//CHANGES NEED A COMMAND THAT PUSHES THE BRACKETS INTO THE CASE, NO DEPENDENCIES
//USE OBJECTS TO BRING BRACKETS INTO THE COMMAND
//PUT CALLS INTO AN ARRAY 
let myTaxAmount = new GetTaxAmount('AnnualGross','sarsBracket','BaseValue','ThresholdValue','TaxAmount');
let myContribValue = new CalcContribution('GrossEarnings','ContribAmount','CeilingCheck');

//CHANGES: CHANGE CALCULATE FUNCTION TO MAP TABLE
function calculate() {
    
myGrossEarnings.execute(datastore);
myAge.execute(datastore);
myPeriods.execute(datastore);
myAnnualGross.execute(datastore);
myTaxAmount.execute(datastore);
myTaxAmount.execute(datastore);
myTaxAmount.execute(datastore);
myTaxAmount.execute(datastore);

//console.log("TRYING: " + myTaxAmount[tax_Amount]);
getElementById("paye-result").value = datastore.TaxAmount;
//document.getElementById("uif-result").value = UIF;
getElementById("nettpay_result").value = nett;

console.log(datastore);
}
calculate();