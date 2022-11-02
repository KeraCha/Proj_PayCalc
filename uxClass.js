export const datastore = {};

export class UserInterface {
    constructor() {
    }
    accept(_visitor) {
    }
    execute(datastore) {
        throw Error("Must be implemented in derived class");
    }
}

export class uxInput extends UserInterface {
    constructor(name, id, type, placeholder, destination) {
        super(),
        this.name = name,
        this.id = id,
        this.type = type,
        this.placeholder = placeholder,
        this.destination = destination
    }
    accept(visitor) {
        visitor.visit_uxInput(this, datastore);
    }
    execute(datastore) {
        return datastore;
    }
}

// OLD
// export class GetUserInput extends PayrollCommand {
//     constructor(keyName) {
//         super();
//         this.keyName = keyName;
//     }
//     execute(datastore) {
//         datastore[this.keyName] = parseFloat(document.getElementById(this.keyName).value);
//         return datastore;
//     }
// }

export class uxOutput extends UserInterface {
    constructor(name, id, result) {
        super(),
        this.name = name, 
        this.id = id,
        this.result = result
    }
    accept(visitor) {
        visitor.visit_uxOutput(this, datastore);
        return visitor;
    }
    execute(datastore) {
        return datastore;
    }
}

//OLD
// export class ValuesDefinedForUI extends PayrollCommand {
//     constructor() {
//         super();
//         this.keyNames = this.keyNames;
//     }
//     accept(visitor) {
//         visitor.visit_ValuesDefinedForUI(this);
//     }
//     execute(datastore) {
//         document.getElementById("paye-result").innerHTML = datastore.DeannualisedValue.toFixed(2);
//         document.getElementById('uif-result').innerHTML = datastore.ContributionValue.toFixed(2);
//         document.getElementById('nettpay_result').innerHTML = datastore.NettValue.toFixed(2);
        
//         //datastore[this.keyNames] = parseFloat(document.getElementById(this.keyName).value);
//         //return datastore;
//     }
// }