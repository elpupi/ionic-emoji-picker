import { Component } from '@angular/core';
import { ConfigParameters } from '@config/services/config-parameters.service';


@Component({
    selector: 'dimension',
    templateUrl: 'dimension.html'
})
export class Dimension {
    public _width: number;
    public _height: number;

    constructor(private configParameters: ConfigParameters) { }

    ngOnInit() {
        this.configParameters.config.sheet.parameters.sheet.dimension.changed$.subscribe(({ prop, value }) => {
            this._width = value.width;
            this._height = value.height;
        });
    }



    set width(width: number) {
        this.configParameters.config.sheet.parameters.sheet.dimension.width = width;
    }

    get width() {
        return this._width;
    }


    set height(height: number) {
        this.configParameters.config.sheet.parameters.sheet.dimension.height = height;
    }

    get height() {
        return this._height;
    }
}
