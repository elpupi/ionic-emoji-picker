import { Injectable } from '@angular/core';

import { ProxyObserver, ProxyTypeObserver, Proxy } from '@proxy';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class ModelFactory {

    constructor() { }

    create<T>(proxyModel: ProxyTypeObserver<T>) {
        return new Model(proxyModel);
    }
}

export class Model<T> {
    public _model: T;


    constructor(private parameter: ProxyTypeObserver<T>) {
        parameter.changed$.subscribe(({ prop, value }) => this._model = value);
    }


    modelChange(model: T) {
        this.parameter.$(model);
        return this;
    }

    get model() {
        return this._model;
    }

    map<U>(fromTo: (value: T) => U, toFrom: (value: U) => T) {

    }

}
