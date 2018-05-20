import { Directive, Input } from '@angular/core';
import { ProxyTypeObserver } from '@proxy';



@Directive({ selector: '[mt-config]' })
export class Config<T> {
    @Input('mt-config') config: number;// ProxyTypeObserver<T>;
    @Input('caca') caca = 2;


    constructor() { }

}
