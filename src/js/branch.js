import Customer from './customer.js';
export default class Branch {
    #branchName;
    #customers;

    constructor(branchName) {
        if (!branchName || typeof branchName !== 'string') {
            throw new Error('Branch name must be a non-empty string');
        }
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
        if (!(customer instanceof Customer)) {
            throw new Error('Invalid customer object');
        }
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
    searchCustomersByCriteria(criteria) {
        return this.#customers.filter(customer => customer.matchesCriteria(criteria));
    }
}