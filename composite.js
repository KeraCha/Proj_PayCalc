import { BaseCommand } from "./baseCommand.js";

export class Plan extends BaseCommand {
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