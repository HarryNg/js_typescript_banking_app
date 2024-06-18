import Branch from './branch';
import Customer from './customer';

export default class Bank {

    constructor(private _name: string, private _branches: Branch[] = []) {
        if (!_name || typeof _name !== 'string') {
            throw new Error('Bank name must be a non-empty string');
        }
    }

    getName(): string {
        return this._name;
    }
    getBranches(): Branch[]{
        return this._branches;
    }

    addBranch(branch: Branch): boolean{
        if (!(branch instanceof Branch)) {
            throw new Error('Invalid branch object');
        }
        if(!this._branches.includes(branch)) {
            this._branches.push(branch);
            console.log(`\n-- Successfully added "${branch.getName()}" to ${this.getName()} bank`)
            return true;
        }
        console.log(`\n-- Unable to add "${branch.getName()}", Branch already exists`)
        return false;
    }
    addCustomer(branch: Branch, customer: Customer): boolean {
        if (!(branch instanceof Branch) || !(customer instanceof Customer)) {
            throw new Error('Invalid branch or customer object');
        }
        const targetBranch = this.findBranchByName(branch.getName());
        if(targetBranch) {
            return targetBranch.addCustomer(customer);
        }
        return false;
    }
    addCustomerTransaction(branch:Branch, customerId: number, amount: number) : boolean{
        if (!(branch instanceof Branch) || !Number.isInteger(customerId) || typeof amount !== 'number') {
            throw new Error('Invalid input');
        }
        const targetedBranch = this.findBranchByName(branch.getName());
        if(targetedBranch) {
            return targetedBranch.addCustomerTransaction(customerId, amount);
        }
        return false;
    }
    findBranchByName(branchName: string): Branch | null {
        if (!branchName || typeof branchName !== 'string') {
            throw new Error('Branch name must be a non-empty string');
        }
        const branch = this._branches.find(branch => branch.getName() === branchName);
        if(branch) {
            return branch;
        }
        return null;
    }
    checkBranch(branchName: string): boolean {
        if (!branchName || typeof branchName !== 'string') {
            throw new Error('Branch name must be a non-empty string');
        }
        return this._branches.some(branch => branch.getName() === branchName);
    }
    listCustomers(branch: Branch,includeTransactions: boolean =false): string{
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
    searchCustomersByCriteria(criteria: Record<string, string>): Customer[]{
        if (typeof criteria !== 'object' || criteria === null) {
            throw new Error('Search criteria must be an object');
        }
        let results: Customer[] = [];
        this._branches.forEach(branch => {
            results = results.concat(branch.searchCustomersByCriteria(criteria));
        });
        return results;
    }

}
