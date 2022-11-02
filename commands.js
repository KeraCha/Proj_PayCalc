import { smart_table_lookup } from './tables.js';

export class PayrollCommand {
    constructor() {
    }
    accept(_visitor) {
    }
    execute() {
        throw Error("Must be implemented in derived class");
    }
}

export class Annualize extends PayrollCommand {
    constructor(value_Annual, value_For_Periods, periods) {
        super();
        this.value_Annual = value_Annual;
        this.value_For_Periods = value_For_Periods;
        this.periods = periods; 
    }
    accept(visitor) {
        visitor.visit_Annualize(this);
    }
    execute(datastore) {
        datastore[this.value_Annual] = datastore[this.value_For_Periods] * datastore[this.periods];
        return datastore;
    }
}

export class LookupInPercentageTable extends PayrollCommand {
    constructor(percent_Total, table_data, value_Annual) {
        super();
        this.percent_Total = percent_Total;
        this.table_data = table_data;
        this.value_Annual = value_Annual;
    }
    accept(visitor) {
        visitor.visit_LookupInPercentageTable(this);
    }
    execute(datastore) {
        datastore[this.percent_Total] = smart_table_lookup(
            datastore[this.value_Annual],
            this.table_data,
            'percent'
        );
        return datastore;
    }
}

export class LookupValueInTable extends PayrollCommand {
    constructor(value_Threshold, table_data, input_age) {
        super();
        this.value_Threshold = value_Threshold; 
        this.table_data = table_data;
        this.input_age = input_age;
    }
    accept(visitor) {
        visitor.visit_LookupValueInTable(this);
    }
    execute(datastore) {
        datastore[this.value_Threshold] = smart_table_lookup(
            datastore[this.input_age],
            this.table_data,
            'value'
        );
        return datastore;
    }
}
export class LookupSumInTable extends PayrollCommand {
    constructor(sum_Rebate, table_data, input_age) {
        super();
        this.sum_Rebate = sum_Rebate;
        this.table_data = table_data;
        this.input_age = input_age;
    }
    accept(visitor) {
        visitor.visit_LookupSumInTable(this);
    }
    execute(datastore) {
        datastore[this.sum_Rebate] = smart_table_lookup(
            datastore[this.input_age],
            this.table_data,
            'sum'
        );
        return datastore;
    }
}

export class Calculate extends PayrollCommand {
    constructor(total_Value, operator, value_1, value_2) {
        super();
        this.total_Value = total_Value;
        this.operator = operator;
        this.value_1 = value_1;
        this.value_2 = value_2;
    }
    accept(visitor) {
        visitor.visit_Calculate(this);
    }
    //can return a lambda that returns two values for the operator
    execute(datastore) {
        const v1 = datastore[this.value_1];
        const v2 = datastore[this.value_2];
        let result = 0

        switch (this.operator) {
            case 'ADD':
                result = v1 + v2;
                break;
            case 'SUBTRACT':
                result = v1 - v2;
                break;
            case 'MULTIPLY':
                result = v1 * v2;
                break;
            case 'DIVIDE':
                result = v1 / v2;
                break;
            default:
                throw Error("Not a valid sum inclusion", this.operator);
        }
        datastore[this.total_Value] = result;
        return datastore;
    }
}

export class Deannualise extends PayrollCommand {
    constructor(value_current_period, pre_Value, periods) {
        super();
        this.value_current_period = value_current_period;
        this.pre_Value = pre_Value;
        this.periods = periods;
    }
    accept(visitor) {
        visitor.visit_Deannualise(this);
    }
    execute(datastore) {
        datastore[this.value_current_period] = datastore[this.pre_Value] / datastore[this.periods];
        return datastore;
    }
}

export class PercentageValueWithCeiling extends PayrollCommand {
    constructor(contribution, value_Apply, table_data) {
        super();
        this.contribution = contribution;
        this.value_Apply = value_Apply;
        this.table_data = table_data;
    }
    accept(visitor) {
        visitor.visit_PercentageValueWithCeiling(this);
    }
    execute(datastore) {
        datastore[this.contribution] = smart_table_lookup(
            datastore[this.value_Apply],
            this.table_data,
            'percent'
        );
        return datastore;
    }
}

export class NettAmount extends PayrollCommand {
    constructor(value_Nett, value_For_Periods, deduction_1, deduction_2) {
        super();
        this.value_Nett = value_Nett;
        this.value_For_Periods = value_For_Periods;
        this.deduction_1 = deduction_1;
        this.deduction_2 = deduction_2;
    }
    accept(visitor) {
        visitor.visit_NettAmount(this);
    }
    execute(datastore) {
        datastore[this.value_Nett] = datastore[this.value_For_Periods] - (datastore[this.deduction_1] + datastore[this.deduction_2]);
    }
}


export class Plan extends PayrollCommand {
    constructor(...plannedsteps) {
        super ();
        this.plannedsteps = plannedsteps;
    }
    accept(visitor) {
        visitor.enter_Plan(this);
        for (let steps of this.plannedsteps) {
            steps.accept(visitor);
        }
        visitor.exit_Plan(this);
        return visitor;
    }
    execute(datastore) {
        this.plannedsteps.forEach(steps => {
            steps.execute(datastore);
        });
        return datastore;
    }
}