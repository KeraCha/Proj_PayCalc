export class BaseCommand {
    constructor() {
    }
    accept(_visitor) {
    }
    execute() {
        throw Error("Must be implemented in derived class");
    }
    // asyncInit() {
    //     return new Promise(async (resolve) => {
    //         resolve(this);   //references current context of scope within which its being called
    //     })
    // }
}