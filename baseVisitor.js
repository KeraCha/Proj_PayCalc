export class BaseVisitor {

    visit_DefineInput(o) { }
    visit_DefineOutput(o) { }
    visit_ReceiveInput(o) { }

    visit_Annualize(o) { }
    visit_PercentageTable(o) { }
    visit_ValueTable(o) { }
    visit_SumTable(o) { }
    visit_Calculate(o) { }
    visit_Deannualize(o) { }
    visit_Deductions(o) { }
    visit_Nett(o) { }
    visit_AsyncVisitor(o) { }
    visit_LoadTable(o) { }

    enter_Plan(o) { }
    exit_Plan(o) { }
}