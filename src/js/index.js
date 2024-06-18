import Bank from "./bank.js"
import Branch from "./branch.js"
import Customer from "./customer.js"

const arizonaBank = new Bank("Arizona")
const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")
const customer1 = new Customer("John", 1)
const customer2 = new Customer("Anna", 2)
const customer3 = new Customer("John", 3)

arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch)

console.log("\n-- Branch West Branch exists: " + arizonaBank.checkBranch(sunBranch.getName()) );
console.log("\n-- Branch Sun Branch exists: " +  arizonaBank.checkBranch(westBranch.getName()) );

arizonaBank.findBranchByName("bank")
arizonaBank.findBranchByName("sun")


arizonaBank.addCustomer(westBranch, customer1)
arizonaBank.addCustomer(westBranch, customer3)
arizonaBank.addCustomer(sunBranch, customer1)
arizonaBank.addCustomer(sunBranch, customer2)

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000)
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000)
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000)

customer1.addTransactions(-1000)
console.log(`\n-- Current balance: ${customer1.getBalance()}`)
console.log(arizonaBank.listCustomers(westBranch, true))
console.log(arizonaBank.listCustomers(sunBranch,true))

// Search for customers by name and/or ID

const searchByName = arizonaBank.searchCustomersByCriteria({name: "John"});
console.log("\n-- Search results for 'John':", searchByName.map(customer => `${customer.getName()} (ID: ${customer.getId()})`));

const searchByNameID = arizonaBank.searchCustomersByCriteria({name: 'John', id: '3'});
console.log("\n-- Search results for 'John with id: 3':", searchByNameID.map(customer => `${customer.getName()} (ID: ${customer.getId()})`));

const searchByID = arizonaBank.searchCustomersByCriteria({id: '2'});
console.log("\n-- Search results for 'id: 2':", searchByID.map(customer => `${customer.getName()} (ID: ${customer.getId()})`));