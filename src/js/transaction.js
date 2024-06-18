export default class Transaction {
    #amount;
    #date = new Date();

    constructor(amount) {
        if (typeof amount !== 'number') {
            throw new Error('Transaction amount must be a number');
        }
        this.#amount = amount;
    }

    getAmount() {
        return this.#amount;
    }
    getDate() {
        return this.#date;
    }
}