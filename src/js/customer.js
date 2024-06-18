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

}
