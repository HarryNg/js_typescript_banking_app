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
        if(this.#transactions.length === 0) {
            return null;
        }
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
        if(this.getBalance() + amount < 0){
            throw new Error('Insufficient funds');
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
            console.log(`\n-- Successfully added "${branch.getName()}" to ${this.getName()} bank`)
            return true;
        }
        console.log(`\n-- Unable to add "${branch.getName()}", Branch already exists`)
        return false;
    }
    addCustomer(branch, customer) {
        const targetBranch = this.findBranchByName(branch.getName());
        if(targetBranch) {
            return targetBranch.addCustomer(customer);
        }
        return false;
    }
    addCustomerTransaction(branch, customerId, amount) {
        const targetedBranch = this.findBranchByName(branch.getName());
        if(targetedBranch) {
            return targetedBranch.addCustomerTransaction(customerId, amount);
        }
        return false;
    }
    findBranchByName(branchName) {
        const branch = this.#branches.find(branch => branch.getName() === branchName);
        if(branch) {
            return branch;
        }
        return null;
    }
    checkBranch(branchName) {
        return this.#branches.find(branch => branch.getName() === branchName) !== undefined;
    }
    listCustomers(branch,includeTransactions=false) {
        const targetBranch = this.findBranchByName(branch.getName());
        let message = "\n============================================================================\n";
        message += `-- Listing customers in ${branch.getName()}: `;
        if(targetBranch) {
            const customers = targetBranch.getCustomers();
            if(customers.length === 0) {
                message += `\n  -- No customers found in ${branch.getName()} branch`;
            }
            customers.forEach(customer => {
                message += `\n   Customer: ${customer.getName()} (ID: ${customer.getId()})`;
                if (includeTransactions) {
                  message+= '\n     Transactions:';
                  const transactions = customer.getTransactions();
                  if (transactions === null) {
                    message+= `\n     No transactions found for customer ${customer.getName()} in branch ${branch.getName()}\n`;
                  }else {
                    transactions.forEach(transaction => {
                        message+= `\n     - Amount: ${transaction.getAmount()}, Date: ${transaction.getDate()} \n`;
                      });
                  }
                }
              });
        }else {
            message+= `\n-- Unable to list customers \n`;
        }
        return message;
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
console.log(`\n-- Current balance: ${customer1.getBalance()}`)
console.log(arizonaBank.listCustomers(westBranch, true))
console.log(arizonaBank.listCustomers(sunBranch,true))