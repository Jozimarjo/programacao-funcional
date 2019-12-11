export class Maybe {

    constructor(value) {
        this._value = value;
    }

    static of(value) {
        return new Maybe(value);
    }

    isNothing() {
        console.log('value: ', this._value)
        return this._value === null || this._value === undefined;
    }

    map(fn) {
        if(this.isNothing()) return Maybe.of(null);
        const value = fn(this._value);
        return Maybe.of(value);
    }

    getOrElse(value) {
        if(this.isNothing()) return value;
        return this._value;
    }
}
