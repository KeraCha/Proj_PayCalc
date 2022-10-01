export class GetUserInput {
    constructor(name) {
      this.name = name;
    }
    execute(datastore) {
        datastore[this.name] = parseInt(document.getElementById(this.name).value); //parsefloat(lose data)
        return datastore;
    }
  };
 
//Create export class to replace Annualize function inputting the variables from the getUserInput export class 
//sample usage: annual_Gross, gross_Earnings, tax_Periods - this could differ with different inputs. specific. Can generalise the namings more. 
//AnnualisedAmt, grossamt, Periods
  export class Annualize {
    //CHANGES: ABSTRACT NAMING CONVENTIONS: resultOut, resultIn, Periods 
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

  //CHANGES: ADD A export class TO RETRIEVE MIN, MAX, PERC, TO BE USED BY OTHER export classES LIKE THE UIF BECAUSE THE FUNCTION REMAINS THE SAME
  /////CHANGES: export classES CALCPERCENTAGE, CALCVALUE, CALCSUMMATION
  //CHANGES: Separate these commands in GetTaxAmount into different export classes
export class GetTaxAmount {
    //CHANGES: NAMING CONVENTIONS ABSTRACTION
    constructor (annual_Gross, sars_Bracket, base_Value, threshold_Value, tax_Amount) {
        this.annual_Gross = annual_Gross;
        this.sars_Bracket = sars_Bracket;
        this.base_Value = base_Value;
        this.threshold_Value = threshold_Value;
        this.tax_Amount = tax_Amount;
    }
    //CHANGE TO USE NEW FUNCTIONS CREATED IN TABLESLEARNING
    //CHANGES: CHANGE NAMING TO GETMINS = export class OF ITS OWN WHICH CAN BE USED IN OTHERS LIKE THRESHOLD AND REBATE
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
    //CHANGES: NO LONGER NEEDED AS BASE ALREADY INCPORPORATED WITH THE RUNNNG TOTALS USING MAX AND PERC
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
//CHANGES: SEPARATE REBATE AND THRESHOLD CALCS. TRY GENERATE THE REABTE VIA CALC INSTEAD OF TABLE USING THREHSOLDS TABLE
    calcThresholdAmount(datastore) {
        var Perc = (SARSBrackets[0].Perc);
        var Primary = (under65 * Perc);
        var Secondary = (over65 - under65);
        var Tertiary = (over75 - over65);
//CHANGES: IS IT CORRECT TO BE USING DATASTORE.AGE TO UTILISE THE VALUE FROM THE INPUT IN THE GETUSERINPUT export class
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
    //CHANGES: NEW export class
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

//ADD DEANNUALISE export class.
//CHANGES: CHANGE THE METHOD NAMES TO "EXECUTE"
//CHANGES: ADD TABLE ARRAY FOR THE UIF VALUES LIKE WE DID IN TABLE LEARNING, CHANGE TO THAT FUNCTION. THEREFORE NO LONGER REQUIRE TWO export classES.
export class CalcContribution {
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