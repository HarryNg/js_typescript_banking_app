import Transaction from './transaction';
interface Criteria {
    name?: string;
    id?: string;
}

export default class Customer {

    constructor(private _name : string, private _id : number, private _transactions : Transaction[] = []) {
        if (!_name || typeof _name !== 'string') {
            throw new Error('Customer name must be a non-empty string');
        }
        if (!Number.isInteger(_id) || _id <= 0) {
            throw new Error('Customer ID must be a positive integer');
        }
    }

    getName(): string{
        return this._name;
    }
    getId(): number{
        return this._id;
    }
    getTransactions(): Transaction[]{
        return this._transactions;
    }
    getBalance(): number{
        return this._transactions.reduce((acc, transaction) => acc + transaction.getAmount(),0);
    }

    addTransactions(amount: number): boolean {
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
            this._transactions.push(newTransaction);
            return true;
        }
        return false;
    }
    matchesCriteria(criteria : Criteria): boolean{
        for (let field in criteria) {
            if (criteria.hasOwnProperty(field)) {
                const value = criteria[field as keyof Criteria]!.toLowerCase();
                switch (field) {
                    case 'name':
                        if (!this._name.toLowerCase().includes(value)) return false;
                        break;
                    case 'id':
                        if (!this._id.toString().includes(value)) return false;
                        break;
                    default:
                        break;
                }
            }
        }
        return true;
    }
}
