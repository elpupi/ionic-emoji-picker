import { ReplaySubject } from 'rxjs/ReplaySubject';

export class Parameter<T> {
    private param: T;
    private changed$ = new ReplaySubject<T>(1);

    constructor() { }

    set(param: T) {
        this.setRecursive(param);
    }

    setAndEmit(param: T) {
        this.set(param);
        this.changed$.next(param);
    }

    get() {
        return this.param;
    }

    private setRecursive(param: T) {
        /* if (typeof this.param !== typeof param)
            throw new Error(`this.param ${this.param} and param ${param} are not of same type`); */

        if (typeof param === 'object' && param !== null) {

            // object recursion
            for (const prop of Object.keys(param)) {

                // recursion
                // if (typeof param[prop] === 'object' && param[prop] !== null)
                if (param[prop] instanceof Parameter)
                    this[prop] = this.setRecursive(param[prop]);
                else
                    // normal case
                    this[prop] = param[prop];
            }

        } else {
            this.param = param; // primitives (including undefined and null)
        }


        return this;
    }
}
