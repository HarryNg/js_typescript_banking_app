class Transaction {
    #amount;
    #date = new Date();

    constructor(amount) {
        this.#amount = amount;
    }

    getAmount() {
        return this.#amount;
    }
    getDate() {
        return this.#date;
    }
}

class Customer {
    #name;
    #id;
    #transactions;

    constructor(name, id) {
        this.#name = name;
        this.#id = id;
        this.#transactions = [];
    }

    getName() {
        return this.#name;
    }
    getId() {
        return this.#id;
    }
    getTransactions() {
        return this.#transactions;
    }
    getBalance() {
        return this.#transactions.reduce((acc, transaction) => acc + transaction.getAmount(),0);
    }

    addTransactions(amount) {
        if(amount === undefined || amount === null) {
            throw new Error('amount required');
        }
        if(typeof amount !== 'number') {
            throw new Error('amount must be a number');
        }
        if(amount === 0) {
            throw new Error('amount must be greater than 0');
        }
        if(this.getBalance() + amount > 0) {
            const newTransaction = new Transaction(amount);
            this.#transactions.push(newTransaction);
            return true;
        }
        return false;
            
    }

}

class Branch {
    #branchName;
    #customers;

    constructor(branchName) {
        this.#branchName = branchName;
        this.#customers = [];
    }

    getName() {
        return this.#branchName;
    }
    getCustomers() {
        return this.#customers;
    }

    addCustomer(customer) {
        if(!this.#customers.find(c => c.getId() === customer.getId())){
            this.#customers.push(customer);
            return true;
        }
        return false;
    }
    addCustomerTransaction(customerId, amount) {
        const targetedCustomer = this.#customers.find(customer => customer.getId() === customerId);
        if(targetedCustomer) {
            return targetedCustomer.addTransactions(amount);
        }
        return false;
    }
}

class Bank {
    #name;
    #branches;

    constructor(name) {
        this.#name = name;
        this.#branches = [];
    }

    getName() {
        return this.#name;
    }
    getBranches() {
        return this.#branches;
    }

    addBranch(branch) {
        if(!this.#branches.includes(branch)) {
            this.#branches.push(branch);
            return true;
        }
        return false;
    }
    addCustomer(branchName, customer) {
        const branch = this.#branches.find(branch => branch.getName() === branchName.getName());
        if(branch) {
            return branch.addCustomer(customer);
        }
        return false;
    }
    addCustomerTransaction(branchName, customerId, amount) {
        const targetedBranch = this.#branches.find(branch => branch.getName() === branchName.getName());
        if(targetedBranch) {
            return targetedBranch.addCustomerTransaction(customerId, amount);
        }
        return false;
    }
    findBranchByName(branchName) {
        return this.#branches.find(branch => branch.getName() === branchName) || null;
    }
    checkBranch(branchName) {
        return this.#branches.find(branch => branch.getName() === branchName) !== undefined;
    }
    listCustomers(branchName,includeTransactions=false) {
        const branch = this.findBranchByName(branchName.getName());
        const customers = branch.getCustomers();
        if(branch) {
            branch.getCustomers().forEach(customer => {
                console.log(`\n Customer: ${customer.getName()} (ID: ${customer.getId()})`);
                if (includeTransactions) {
                  console.log('Transactions:');
                  customer.getTransactions().forEach(transaction => {
                    console.log(`  - Amount: ${transaction.getAmount()}, Date: ${transaction.getDate()}`);
                  });
                }
              });
            
            return customers;
        }
        return [];
    }
}

const arizonaBank = new Bank("Arizona")
const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")
const customer1 = new Customer("John", 1)
const customer2 = new Customer("Anna", 2)
const customer3 = new Customer("John", 3)

arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch)

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
console.log(customer1.getBalance())
console.log(arizonaBank.listCustomers(westBranch, true))
console.log(arizonaBank.listCustomers(sunBranch,true))