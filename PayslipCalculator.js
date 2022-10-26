import * as cmd from './commands.js';

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

export function calculate() {
    
    const datastore = {};

    const instructions = new cmd.Plan (
        new cmd.GetUserInput('GrossPeriodEarnings'), //ID from the HTML
        new cmd.GetUserInput('Age'), //ID from the HTML
        new cmd.GetUserInput('Periods'), //ID from the HTML
        new cmd.Annualize('AnnualEarnings', 'GrossPeriodEarnings', 'Periods'),
        new cmd.LookupInPercentageTable('PercentageTotal', SARSPAYE2023TAXTABLE, 'AnnualEarnings'),
        new cmd.LookupValueInTable('ThresholdValue', SARS2023THRESHOLD, 'Age'),
        new cmd.LookupSumInTable('RebateValue', SARS2023REBATE, 'Age'),
        new cmd.Calculate('RebateInclusion', 'SUBTRACT', 'PercentageTotal', 'RebateValue'),
        new cmd.Deannualise('DeannualisedValue', 'RebateInclusion', 'Periods'),
        new cmd.PercentageValueWithCeiling('ContributionValue', 'AnnualEarnings', UIF),
        new cmd.NettAmount('NettValue', 'GrossPeriodEarnings', 'DeannualisedValue', 'ContributionValue'),
        new cmd.ValuesDefinedForUI('DeannualisedValue'),
        new cmd.ValuesDefinedForUI('ContributionValue'),
        new cmd.ValuesDefinedForUI('NettValue')
    );

    instructions.execute(datastore);

    // document.getElementById("paye-result").innerHTML = datastore.DeannualisedValue.toFixed(2);
    // document.getElementById('uif-result').innerHTML = datastore.ContributionValue.toFixed(2);
    // document.getElementById('nettpay_result').innerHTML = datastore.NettValue.toFixed(2);

    //new cmd.Plan(PayrollCommand.Plan(plannedsteps));
    console.log(datastore);
}
