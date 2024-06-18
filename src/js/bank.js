import Branch from './branch.js';
export default class Bank {
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
