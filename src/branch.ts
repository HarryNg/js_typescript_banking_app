import Customer from './customer';
export default class Branch {

    constructor(private _branchName: string, private _customers: Customer[] = []) {
        if (!_branchName || typeof _branchName !== 'string') {
            throw new Error('Branch name must be a non-empty string');
        }
    }
    getName(): string {
        return this._branchName;
    }
    getCustomers(): Customer[]{
        return this._customers;
    }

    addCustomer(customer: Customer): boolean {
        if (!(customer instanceof Customer)) {
            throw new Error('Invalid customer object');
        }
        if(!this._customers.find(c => c.getId() === customer.getId())){
            this._customers.push(customer);
            return true;
        }
        return false;
    }
    addCustomerTransaction(customerId: number, amount: number): boolean {
        const targetedCustomer = this._customers.find(customer => customer.getId() === customerId);
        if(targetedCustomer) {
            return targetedCustomer.addTransactions(amount);
        }
        return false;
    }
    searchCustomersByCriteria(criteria: Record<string, string>): Customer[]{
        return this._customers.filter(customer => customer.matchesCriteria(criteria));
    }
}