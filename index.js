
import { InputDisplay, OutputDisplay, ReceiveInput } from './interfaceVisitor.js';
// import { datastore } from './commands.js';
//import { AsyncVisitor } from './asyncVisitor.js';
//import { loadPlan } from './jsonLoader.js';

// export async function fetchit(path) {
//   const tabledata = await fetch(path);
//   const blob = await tabledata.json();
//   return blob;
// }

// export async function initialize(plan) {
//   plan.accept(new AsyncVisitor());
//   plan.accept(new InputDisplay());
//   return plan;
// }

// export async function initialize(input) {
//   //const plan = await loadPlan(input);
//   const plan = new AsyncVisitor; 
//   plan.accept(new InputDisplay());
//   return plan;
// }

export function createDatastore(plan) {
  const datastore = {};
  plan.accept(new ReceiveInput(datastore));
  return datastore;
}

export function buildHTML(plan, inputHTMLdiv) {
  plan.accept(new InputDisplay(inputHTMLdiv));
  
}

export function outputHTML(plan, datastore, outputHTMLdiv) {
  plan.accept(new OutputDisplay(datastore, outputHTMLdiv));
}