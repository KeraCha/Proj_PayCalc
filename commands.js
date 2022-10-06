import {smart_table_lookup} from './tables.js';

export class GetUserInput {
  constructor(inputs) {
    this.inputs = inputs;
  }
  execute(datastore) {
    datastore[this.inputs] = parseFloat(document.getElementById(this.inputs).value);
    return datastore;
  }
}

export class Annualize {
  constructor(value_Annual, value_For_Periods, periods) {
    this.value_Annual = value_Annual;
    this.value_For_Periods = value_For_Periods;
    this.periods = periods;
  }
  execute(datastore) {
    datastore[this.value_Annual] = datastore[this.value_For_Periods] * datastore[this.periods];
    return datastore;
  }
}

export class LookupInPercentageTable {
  constructor(percent_Total, table_data, value_Annual) {
    this.percent_Total = percent_Total;
    this.table_data = table_data;
    this.value_Annual = value_Annual;
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

export class LookupValueInTable {
  constructor(value_Threshold, table_data, input_age) {
    this.value_Threshold = value_Threshold;
    this.table_data = table_data;
    this.input_age = input_age;
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
export class LookupSumInTable {
  constructor(sum_Rebate, table_data, input_age) {
    this.sum_Rebate = sum_Rebate;
    this.table_data = table_data;
    this.input_age = input_age;
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

export class LookupSumInclusion {
    constructor(total_Value, operator, value_1, value_2) {
        this.total_Value = total_Value;
        this.operator = operator;
        this.value_1 = value_1;
        this.value_2 = value_2;
    }
    execute(datastore) {
        switch (this.operator) {
            case 'ADD': 
                return datastore[this.total_Value] = datastore[this.value_1] + datastore[this.value_2];
            case 'SUBTRACT': 
                return datastore[this.total_Value] = datastore[this.value_1] - datastore[this.value_2];
             default:
                 throw Error("Not a valid sum inclusion", this.operator);   
        }
        return datastore;
    }
}

export class Deannualise {
    constructor(value_current_period, pre_Value, periods) {
      this.value_current_period = value_current_period;
      this.pre_Value = pre_Value;
      this.periods = periods;
    }
    execute(datastore) {
      datastore[this.value_current_period] = datastore[this.pre_Value] / datastore[this.periods];
      return datastore;
    }
  }

export class PercentageValueWithCeiling {
    constructor (contribution, value_Apply, table_data) {
        this.contribution = contribution;
        this.value_Apply = value_Apply;
        this.table_data = table_data;
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

export class NettAmount {
    constructor (value_Nett, value_For_Periods, deduction_1, deduction_2) {
        this.value_Nett = value_Nett;
        this.value_For_Periods = value_For_Periods; 
        this.deduction_1 = deduction_1;
        this.deduction_2 = deduction_2
    }
    execute(datastore) {
        datastore[this.value_Nett] = datastore[this.value_For_Periods] - (datastore[this.deduction_1] + datastore[this.deduction_2]);
    }
  }