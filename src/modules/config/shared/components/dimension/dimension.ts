import { Component, ElementRef, ViewContainerRef, Host, Optional } from '@angular/core';
import { ConfigParameters } from '@config/services/config-parameters.service';
import { Config } from '@modules/config/shared/directives/config/config.directive';


@Component({
    selector: 'mt-dimension',
    templateUrl: 'dimension.html',
    //   providers: [Config]
})
export class Dimension {
    public _width: number;
    public _height: number;

    constructor(private configParameters: ConfigParameters, @Host() @Optional() private configDirective: Config<any>, private el: ElementRef, private view: ViewContainerRef) { }

    ngOnInit() {
        this.configParameters.config.sheet.parameters.sheet.dimension.changed$.subscribe(({ prop, value }) => {
            this._width = value.width;
            this._height = value.height;
        });
    }



    set width(width: number /* it's string. TS doesn't allow to change type in setter */) {
        this.configParameters.config.sheet.parameters.sheet.dimension.width = parseInt(width as any, 10);
    }

    get width() {
        return this._width;
    }


    set height(height: number) {
        this.configParameters.config.sheet.parameters.sheet.dimension.height = parseInt(height as any, 10);
    }

    get height() {
        return this._height;
    }
}
