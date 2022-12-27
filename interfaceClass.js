//export const datastore = {};

export class UserInterface {
    constructor() {
    }
    accept(_visitor) {
    }
    execute() {
        throw Error("Must be implemented in derived class");
    }
}

export class uiInput extends UserInterface {
    constructor(name, id, type, placeholder, destination) {
        super(),
        this.name = name,
        this.id = id,
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

export class uiOutput extends UserInterface {
    constructor(name, id, result) {
        super(),
        this.name = name, 
        this.id = id,
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
