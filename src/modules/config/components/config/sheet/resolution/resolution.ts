import { Component } from '@angular/core';
import { ConfigParameters } from '@config/services/config-parameters.service';


@Component({
    selector: 'resolution',
    templateUrl: 'resolution.html'
})
export class Resolution {

    public _resolution: number;

    constructor(private configParameters: ConfigParameters) { }

    ngOnInit() {
        this.configParameters.config.sheet.parameters.resolution.changed$.subscribe(({ prop, value }) => this._resolution = value);
    }



    set resolution(resolution: number) {
        this.configParameters.config.sheet.parameters.resolution = resolution;
    }

    get resolution() {
        return this._resolution;
    }
}
