
import { Component, ElementRef } from '@angular/core';
import { ConfigParameters } from '@config/services/config-parameters.service';


@Component({
    selector: 'margin',
    templateUrl: 'margin.html'
})
export class Margin {

    public _margin: number;

    constructor(private configParameters: ConfigParameters, elementRef: ElementRef) {
        1 === 1;
    }

    ngOnInit() {
        this.configParameters.config.sheet.parameters.sheet.margin.changed$.subscribe(({ prop, value }) => this._margin = value);
    }



    set margin(margin: number /* TS error: it's a string */) {
        this.configParameters.config.sheet.parameters.sheet.margin = parseInt(margin as any, 10);
    }

    get margin() {
        return this._margin;
    }
}
