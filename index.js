import * as cmd from './commands.js';
import { InputDisplay, OutputDisplay, ReceiveInput } from './uxVisitor.js';
import { datastore, uxInput, uxOutput } from './uxClass.js';


const SARSPAYE2023TAXTABLE = [
  [226000, 0.18],
  [353100, 0.26],
  [488700, 0.31],
  [641400, 0.36],
  [817600, 0.39],
  [1731600, 0.41],
  [null, 0.45],
];

const SARS2023THRESHOLD = [
  [65, 91250],
  [75, 141250],
  [null, 157900],
];

const SARS2023REBATE = [
  [65, 16425],
  [75, 9000],
  [null, 2997],
];

const UIF = [
  [17712, 0.01],
  [null, 0.0],
];

const inputs = new cmd.Plan(
  new uxInput('GrossIncome', 'grossIncome', 'number', 'Enter your gross earnings', 'inputID'),
  new uxInput('Age', 'ageInput', 'number', 'Enter your age', 'inputID'),
  new uxInput('Periods', 'periodInput', 'number', 'Enter the number of periods', 'inputID')
);

export function uxElementsIn() {
  inputs.accept(new InputDisplay());
}

export function uxElementsOut() {

  inputs.accept(new ReceiveInput());

  const calculations = new cmd.Plan(
    new cmd.Annualize('AnnualEarnings', 'GrossIncome', 'Periods'),
    new cmd.LookupInPercentageTable('PercentageTotal', SARSPAYE2023TAXTABLE, 'AnnualEarnings'),
    new cmd.LookupValueInTable('ThresholdValue', SARS2023THRESHOLD, 'Age'),
    new cmd.LookupSumInTable('RebateValue', SARS2023REBATE, 'Age'),
    new cmd.Calculate('RebateInclusion', 'SUBTRACT', 'PercentageTotal', 'RebateValue'),
    new cmd.Deannualise('DeannualisedValue', 'RebateInclusion', 'Periods'),
    new cmd.PercentageValueWithCeiling('ContributionValue', 'AnnualEarnings', UIF),
    new cmd.NettAmount('NettValue', 'GrossIncome', 'DeannualisedValue', 'ContributionValue')
  );

  calculations.execute(datastore);

  const display = new cmd.Plan(
  new uxOutput('DeannualisedValue','deannual','result'),
  new uxOutput('ContributionValue','contibution','result'),
  new uxOutput('NettValue','nett','result')
  );

  display.accept(new OutputDisplay());

  console.log(datastore);

}