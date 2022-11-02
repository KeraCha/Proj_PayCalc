export class BaseVisitor {
    constructor () {}

    visit_uxInput(o) {}
    visit_uxOutput(o) {}
    visit_ReceiveInput(o) {}
    visit_Annualize(o) {}
    visit_LookupInPercentageTable(o) {}
    visit_LookupValueInTable(o) {}
    visit_LookupSumInTable(o) {}
    visit_Calculate(o) {}
    visit_Deannualise(o) {}
    visit_PercentageValueWithCeiling(o) {}
    visit_NettAmount(o) {}
    

    enter_Plan() {}
    exit_Plan() {}
}