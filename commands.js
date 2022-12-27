import { smart_table_lookup, add } from './tables.js';
import { BaseCommand } from "./baseCommand.js";
//import { fetchit } from './jsonLoader.js';

//export const datastore = {};

export class DefineInput extends BaseCommand {
    constructor(name, type, placeholder, destination) {
        super(),
        this.name = name,
        this.type = type,
        this.placeholder = placeholder,
        this.destination = destination
    }
    accept(visitor) {
        visitor.visit_DefineInput(this);
    }
    execute(datastore) {
        return datastore;
    }
}

export class DefineOutput extends BaseCommand {
    constructor(name, result) {
        super(),
        this.name = name,
        this.result = result
    }
    accept(visitor) {
        visitor.visit_DefineOutput(this);
        return visitor;
    }
    execute(datastore) {
        return datastore;
    }
}

//load the json tables with fetchit() from assets folder
export class LoadTable extends BaseCommand {
    constructor(name, source) {
        super(),
        this.name = name, 
        this.source = source,
        this.tableData = null
    }
    // async asyncInit() {
    //     if (this.source) {
    //         return new Promise((resolve) => {
    //             (async() => {   //anonymous function
    //                 this.tableData = await fetchit(this.source);
    //                 resolve(this);
    //             })();   //executes anonymous function
    //         } );
    //     };
    // }
    accept(visitor) {
        visitor.visit_LoadTable(this);
        return visitor;
    }
    execute(datastore) {
        datastore[this.name] = this.tableData;
        return datastore;
    }
}

export class Annualize extends BaseCommand {
    constructor(result, amount, period) {
        super();
        this.result = result;
        this.amount = amount;
        this.period = period;
    }
    accept(visitor) {
        visitor.visit_Annualize(this);
    }
    execute(datastore) {
        datastore[this.result] = datastore[this.amount] * datastore[this.period];
        return datastore;
    }
}

//Used to find bracket
export class LookupPercentageTable extends BaseCommand {
    constructor(result, table, amount) {
        super();
        this.amount = amount;
        this.table = table;
        this.result = result;
    }
    accept(visitor) {
        visitor.visit_PercentageTable(this);
    }
    execute(datastore) {
        datastore[this.result] = smart_table_lookup(
            datastore[this.amount],
            datastore[this.table],
            'percent'
        );
        return datastore;
    }
}

//Used to find threshold
export class LookupValueTable extends BaseCommand {
    constructor(result, table, amount) {
        super();
        this.result = result;
        this.table = table;
        this.amount = amount;
    }
    accept(visitor) {
        visitor.visit_ValueTable(this);
    }
    execute(datastore) {
        datastore[this.result] = smart_table_lookup(
            datastore[this.amount],
            datastore[this.table],
            'value'
        );
        return datastore;
    }
}

//Used to find rebate
export class LookupSumTable extends BaseCommand {
    constructor(result, table, amount) {
        super();
        this.result = result;
        this.table = table;
        this.amount = amount;
    }
    accept(visitor) {
        visitor.visit_SumTable(this);
    }
    execute(datastore) {
        datastore[this.result] = smart_table_lookup(
            datastore[this.amount],
            datastore[this.table],
            'sum'
        );
        return datastore;
    }
}

export class Calculate extends BaseCommand {
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

export class Deannualize extends BaseCommand {
    constructor(result, amount, periods) {
        super();
        this.result = result;
        this.amount = amount;
        this.periods = periods;
    }
    accept(visitor) {
        visitor.visit_Deannualize(this);
    }
    execute(datastore) {
        datastore[this.result] = datastore[this.amount] / datastore[this.periods];
        return datastore;
    }
}

export class CalculateDeductions extends BaseCommand {
    constructor(result, ...deductions) {
      super();
      this.result = result;
      this.deductions = deductions;
    }
    accept(visitor) {
      visitor.visit_Deductions(this);
    }
    execute(datastore) {
      let deductSum = [];
      for (const item of this.deductions) {
        deductSum.push(datastore[item]);
      }
      datastore[this.result] = add(deductSum);
    }
  }

export class CalculateNett extends BaseCommand {
    constructor(result, amount, deductions) {
        super();
        this.result = result;
        this.amount = amount;
        this.deductions = deductions;
    }
    accept(visitor) {
        visitor.visit_Nett(this);
    }
    execute(datastore) {
        datastore[this.result] = datastore[this.amount] - (datastore[this.deductions]);
    }
}
