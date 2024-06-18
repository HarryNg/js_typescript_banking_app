export default class Transaction {
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