import { BaseVisitor } from "./baseVisitor.js";

export class InputDisplay extends BaseVisitor {
    constructor(destination) {
        super();
        this.destination = destination;
    }

    visit_DefineInput(o) {
        let destination = document.getElementById(this.destination)

        let h1 = document.createElement("label"); //= title/ heading

        h1.append(o.placeholder);

        let y = document.createElement("input"); //input is the html tag that the create element will create within/ like <input> or <p><p/>
        y.setAttribute("id", o.name);
        y.setAttribute("type", o.type);
        y.setAttribute("placeholder", o.placeholder);

        destination.appendChild(h1);
        destination.appendChild(y);
        
    }
}

export class ReceiveInput extends BaseVisitor {
    constructor(datastore) {
        super();
        this.datastore = datastore;
    }
    visit_DefineInput(o) {
        this.datastore[o.name] = document.getElementById(o.name).value;
    }
}

export class OutputDisplay extends BaseVisitor {
    constructor(datastore, destination) {
        super();
        this.datastore = datastore;
        this.destination = destination;
    }
    visit_DefineOutput(o) {

        const currencyFormat = (value) => {
            const formatter = new Intl.NumberFormat("en-za", { currency: "ZAR" });
            return formatter.format(value);
        };

        const td1 = document.createElement("td"); //columns/ names
        const td2 = document.createElement("td"); //columns/ names
        const tr = document.createElement("tr"); //rows

        td1.append(o.result);

        td2.append(currencyFormat(this.datastore[o.name].toFixed(2)));

        tr.appendChild(td1);
        tr.appendChild(td2);

        document.getElementById(this.destination).appendChild(tr);
    }
}