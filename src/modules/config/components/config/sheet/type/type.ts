import { Component } from '@angular/core';
import { ConfigParameters } from '@config/services/config-parameters.service';


@Component({
    selector: 'type',
    templateUrl: 'type.html'
})
export class Type {
    _type: 'raster' | 'svg';
    public types = ['raster', 'svg'];

    constructor(private configParameters: ConfigParameters) { }


    ngOnInit() {
        this.configParameters.config.sheet.parameters.sheet.type.changed$.subscribe(({ prop, value }) => this._type = value);
    }



    set type(type: 'raster' | 'svg') {
        this.configParameters.config.sheet.parameters.sheet.type = type as any;
    }

    get type() {
        return this._type;
    }

}
