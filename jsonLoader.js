// export async function loadPlan(plan) {
//     let promises = [];

//     plan.plannedsteps.forEach(element => {
//         const promiseObj = element.asyncInit();
//         promises.push(promiseObj);
//     });
//     await Promise.all(promises);
//     return plan;
// }

// // export async function fetchit(path) {
// //     const tabledata = await fetch(path);
// //     const blob = await tabledata.json();
// //     //console.log(blob);    
// //     //console.log(JSON.stringify(tabledata));
// //     return blob;
// // }

// //const myRequest = await fetchit();
// //console.log(myRequest);
// //console.log(JSON.stringify(myRequest));
