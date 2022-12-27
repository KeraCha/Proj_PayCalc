import * as cmd from './commands.js';
import { Plan } from './composite.js';
import { AsyncVisitor } from './asyncVisitor.js';
import { InputDisplay, ReceiveInput, OutputDisplay } from './interfaceVisitor.js';
// import { datastore } from './commands.js';

export async function getPlan() { 
 const calculations = new Plan(
    new cmd.DefineInput('GrossIncome', 'number', 'Enter your gross earnings'),
    new cmd.DefineInput('Age', 'number', 'Enter your age'),
    new cmd.DefineInput('Periods', 'number', 'Enter the number of periods'),
    //gettables for each table, loaded in as commands, used for async. 
    new cmd.LoadTable('TaxBracket', './assets/tax_bracket.json'),
    new cmd.LoadTable('TaxRebate', './assets/tax_rebate.json'),
    new cmd.LoadTable('TaxThreshold', './assets/tax_threshold.json'),
    new cmd.LoadTable('UIF', './assets/uif.json'),
    new cmd.Annualize('AnnualEarnings', 'GrossIncome', 'Periods'),
    new cmd.LookupPercentageTable('PercentageTotal', 'TaxBracket', 'AnnualEarnings'),
    new cmd.LookupValueTable('ThresholdValue', 'TaxThreshold', 'Age'),
    new cmd.LookupSumTable('RebateValue', 'TaxRebate', 'Age'),
    //Calculate can include operators SUBTRACT, ADD, MULTIPLY, DIVIDE
    new cmd.Calculate('RebateInclusion', 'SUBTRACT', 'PercentageTotal', 'RebateValue'),
    new cmd.Deannualize('DeannualisedValue', 'RebateInclusion', 'Periods'),
    new cmd.LookupPercentageTable('ContributionValue', 'UIF', 'AnnualEarnings'),
    new cmd.CalculateDeductions('Deductions', 'DeannualisedValue', 'ContributionValue'),
    new cmd.CalculateNett('NettValue', 'GrossIncome', 'Deductions'),

    new cmd.DefineOutput('DeannualisedValue','monthly PAYE'),//monthlyPAYE
    new cmd.DefineOutput('ContributionValue','UIF'),//UIF
    new cmd.DefineOutput('NettValue','NETT')//NETT
    );
    
    await calculations.accept(new AsyncVisitor()).asyncInit();
 
    return calculations;
    
 }