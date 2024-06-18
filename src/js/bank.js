import Branch from './branch.js';
import Customer from './customer.js';

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
        if (!(branch instanceof Branch)) {
            throw new Error('Invalid branch object');
        }
        if(!this.#branches.includes(branch)) {
            this.#branches.push(branch);
            console.log(`\n-- Successfully added "${branch.getName()}" to ${this.getName()} bank`)
            return true;
        }
        console.log(`\n-- Unable to add "${branch.getName()}", Branch already exists`)
        return false;
    }
    addCustomer(branch, customer) {
        if (!(branch instanceof Branch) || !(customer instanceof Customer)) {
            throw new Error('Invalid branch or customer object');
        }
        const targetBranch = this.findBranchByName(branch.getName());
        if(targetBranch) {
            return targetBranch.addCustomer(customer);
        }
        return false;
    }
    addCustomerTransaction(branch, customerId, amount) {
        if (!(branch instanceof Branch) || !Number.isInteger(customerId) || typeof amount !== 'number') {
            throw new Error('Invalid input');
        }
        const targetedBranch = this.findBranchByName(branch.getName());
        if(targetedBranch) {
            return targetedBranch.addCustomerTransaction(customerId, amount);
        }
        return false;
    }
    findBranchByName(branchName) {
        if (!branchName || typeof branchName !== 'string') {
            throw new Error('Branch name must be a non-empty string');
        }
        const branch = this.#branches.find(branch => branch.getName() === branchName);
        if(branch) {
            return branch;
        }
        return null;
    }
    checkBranch(branchName) {
        if (!branchName || typeof branchName !== 'string') {
            throw new Error('Branch name must be a non-empty string');
        }
        return this.#branches.some(branch => branch.getName() === branchName);
    }
    listCustomers(branch,includeTransactions=false) {
        if (!(branch instanceof Branch)) {
            throw new Error('Invalid branch object');
        }
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
    searchCustomersByCriteria(criteria) {
        if (typeof criteria !== 'object' || criteria === null) {
            throw new Error('Search criteria must be an object');
        }
        let results = [];
        this.#branches.forEach(branch => {
            results = results.concat(branch.searchCustomersByCriteria(criteria));
        });
        return results;
    }

}
