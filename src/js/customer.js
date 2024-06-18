import Transaction from './transaction.js';
export default class Customer {
    #name;
    #id;
    #transactions;

    constructor(name, id) {
        if (!name || typeof name !== 'string') {
            throw new Error('Customer name must be a non-empty string');
        }
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('Customer ID must be a positive integer');
        }
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
    matchesCriteria(criteria) {
        for (let field in criteria) {
            if (criteria.hasOwnProperty(field)) {
                const value = criteria[field].toLowerCase();
                switch (field) {
                    case 'name':
                        if (!this.#name.toLowerCase().includes(value)) return false;
                        break;
                    case 'id':
                        if (!this.#id.toString().includes(value)) return false;
                        break;
                    default:
                        break;
                }
            }
        }
        return true;
    }
}
