import {BaseVisitor} from "./baseVisitor.js";

export class InputDisplay extends BaseVisitor {
    constructor() {
        super()
    }
    visit_uxInput(o, datastore) {

        let destination = document.getElementById(o.destination)

        let h1 = document.createElement("label"); //= title/ heading

        h1.append(o.name);

        let y = document.createElement("input"); //input is the html tag that the create element will create within/ like <input> or <p><p/>
        y.setAttribute("id", o.id);
        y.setAttribute("type", o.type);
        y.setAttribute("placeholder", o.placeholder);

        destination.appendChild(h1);
        destination.appendChild(y);
    }
}

export class ReceiveInput extends BaseVisitor {
    constructor() {
        super()
    }
    visit_uxInput(o, datastore) {
        datastore[o.name] = document.getElementById(o.id).value;
        return datastore;
    }
}

export class OutputDisplay extends BaseVisitor {
    constructor() {
        super()
    }
    visit_uxOutput(o, datastore) {

        const td1 = document.createElement("td"); //columns/ names
        const td2 = document.createElement("td"); //columns/ names
        const tr = document.createElement("tr"); //rows
        const lineBreak = document.createElement('br');

        td1.append(o.name);

        datastore[o.result] = datastore[o.name].toFixed(2);
        
        td2.append(datastore[o.result]);
        
        tr.appendChild(lineBreak);
        tr.appendChild(td1);
        tr.appendChild(td2);

        document.getElementById("outputID").appendChild(tr);
    }
}
// const testElement = document.querySelector('div');
// const lineBreak = document.createElement('br');
// testElement.appendChild(lineBreak);