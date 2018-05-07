import { Injectable, EventEmitter } from '@angular/core';

// tslint:disable-next-line:import-name
import Map from 'core-js/library/fn/map';


@Injectable()
export class QuestionMessage {
    private componentMap = new Map();

    constructor() { }

    register(component: any) {
        this.componentMap.set(component, new EventEmitter());
    }

    push(component: any, selected: any) {
        this.componentMap.get(component).next(selected);
    }
}
