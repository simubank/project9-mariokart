
const fs = require('fs');
var customers = require("./simulants.json");

let customersWhoseAgeIsBetween18and30 = customers.filter(customer => {
    if(customer.age >= 18 && customer.age <= 30 && (customer.habitationStatus === 'sharingrent' || customer.habitationStatus === 'rent')){
        return true
    }
})
// console.log(customersWhoseAgeIsBetween18and30)
fs.writeFile("PurplePascals.json", JSON.stringify(customersWhoseAgeIsBetween18and30), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 

/*
let sharingrentCustomers = customers.filter(customer => {
     if(customer.habitationStatus === 'sharingrent'){
         return true
     }
 })
 // console.log(sharingrentCustomers)

fs.writeFile("sharingrentCustomers.json", JSON.stringify(sharingrentCustomers), function(err) {
     if(err) {
         return console.log(err);
     }

     console.log("The file was saved!");
 }); 
 
let rentCustomers = customers.filter(customer => {
     if(customer.habitationStatus === 'rent'){
         return true
     }
 })
 // console.log(rentCustomers)
fs.writeFile("rentCustomers.json", JSON.stringify(rentCustomers), function(err) {
     if(err) {
         return console.log(err);
     }

     console.log("The file was saved!");
 }); 


