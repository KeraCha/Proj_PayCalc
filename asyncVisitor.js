import { BaseVisitor } from './baseVisitor.js';

//visitor to await the loading of the json tables before plan execution
export class AsyncVisitor extends BaseVisitor {
    constructor() {
        super();
        this.commands = [];
    }
    // enter_Plan(plan) {
    //     plan.plannedsteps.forEach(async element => {
    //         await element.asyncInit();
    //     });
    // }

    visit_LoadTable(visitor) {
        this.commands.push(visitor);
    }

    //handles JSON file, retrieving data within each JSON file for provided path
    async fetchJSON(path) {
        const random = await fetch(path);
        return await random.json();
        // const blob = await tabledata.json();
        // return blob;
    }

    //each obj (json file data) passed into array above, and for each here, truthy fetch data
    async asyncInit() {
        for(let obj of this.commands) {
            if (obj.source) {
                // return new Promise((resolve) => {
                //     (async() => {   //anonymous function
                //         obj.tableData = await this.fetchJSON(obj.source);
                //         resolve(this);
                //     })();   //executes anonymous function
                // } );
                const temp = await this.fetchJSON(obj.source);
                obj.tableData = temp;
            };
        }
        return null;
    }
}

