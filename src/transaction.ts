export default class Transaction {
    private _date = new Date();

    constructor(private _amount : number) {
        if (typeof _amount !== 'number') {
            throw new Error('Transaction amount must be a number');
        }
    }

    getAmount() {
        return this._amount;
    }
    getDate() {
        return this._date;
    }
}